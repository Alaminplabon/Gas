// src/modules/pushNotification/pushNotification.model.ts
import { Schema, model, Document } from 'mongoose';
import { IpushNotification } from './pushNotification.interface';

export interface PushNotificationDocument extends IpushNotification, Document {}

const pushNotificationSchema = new Schema<PushNotificationDocument>(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    targetAudience: { type: String, required: true },
  },
  { timestamps: true },
);

export const PushNotificationModel = model<PushNotificationDocument>(
  'PushNotification',
  pushNotificationSchema,
);
