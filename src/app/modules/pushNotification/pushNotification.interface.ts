import { ObjectId } from 'mongoose';

export interface IpushNotification {
  title: string;
  message: string;
  targetAudience: string;
}
