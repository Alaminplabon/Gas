// src/modules/pushNotification/pushNotification.service.ts
import { Types } from 'mongoose';
import { IpushNotification } from './pushNotification.interface';
import {
  PushNotificationDocument,
  PushNotificationModel,
} from './pushNotification.models';

const createPushNotification = async (
  payload: IpushNotification,
): Promise<PushNotificationDocument> => {
  return PushNotificationModel.create(payload);
};

const getAllPushNotifications = async (): Promise<
  PushNotificationDocument[]
> => {
  return PushNotificationModel.find().sort({ createdAt: -1 });
};

const getPushNotificationById = async (
  id: string,
): Promise<PushNotificationDocument | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return PushNotificationModel.findById(id);
};

const updatePushNotification = async (
  id: string,
  payload: Partial<IpushNotification>,
): Promise<PushNotificationDocument | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return PushNotificationModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deletePushNotification = async (
  id: string,
): Promise<PushNotificationDocument | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return PushNotificationModel.findByIdAndDelete(id);
};

export const pushNotificationService = {
  createPushNotification,
  getAllPushNotifications,
  getPushNotificationById,
  updatePushNotification,
  deletePushNotification,
};
