// src/modules/pushNotification/pushNotification.controller.ts
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { pushNotificationService } from './pushNotification.service';

const createPushNotification = catchAsync(
  async (req: Request, res: Response) => {
    const result = await pushNotificationService.createPushNotification(
      req.body,
    );
    res.status(201).json({ success: true, data: result });
  },
);

const getAllPushNotifications = catchAsync(
  async (_req: Request, res: Response) => {
    const result = await pushNotificationService.getAllPushNotifications();
    res.status(200).json({ success: true, data: result });
  },
);

const getPushNotificationById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await pushNotificationService.getPushNotificationById(
      req.params.id,
    );
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Push notification not found' });
    }
    res.status(200).json({ success: true, data: result });
  },
);

const updatePushNotification = catchAsync(
  async (req: Request, res: Response) => {
    const result = await pushNotificationService.updatePushNotification(
      req.params.id,
      req.body,
    );
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Push notification not found or update failed',
      });
    }
    res.status(200).json({ success: true, data: result });
  },
);

const deletePushNotification = catchAsync(
  async (req: Request, res: Response) => {
    const result = await pushNotificationService.deletePushNotification(
      req.params.id,
    );
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Push notification not found' });
    }
    res.status(204).send();
  },
);

export const pushNotificationController = {
  createPushNotification,
  getAllPushNotifications,
  getPushNotificationById,
  updatePushNotification,
  deletePushNotification,
};
