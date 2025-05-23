import { ObjectId } from 'mongoose';
export interface IDeliveryAndTip {
  name: string;
  price: number;
  zipCode: string[];
}
