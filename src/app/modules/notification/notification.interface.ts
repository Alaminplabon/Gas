import { ObjectId } from 'mongodb';
export enum modeType {
  RefundRequest = 'refundRequest',
  ShopWiseOrder = 'ShopWiseOrder',
  Order = 'Order',
}
export interface TNotification {
  receiver: ObjectId;
  message: string;
  description?: string;
  refference: ObjectId;
  model_type: modeType;
  date?: Date;
  read: boolean;
  isDeleted: boolean;
}
