import { ObjectId } from 'mongoose';

export interface IOrderFuel {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [x: string]: any;
  location: string;
  vehicleId: ObjectId;
  userId: ObjectId;
  fuelType: string;
  amount: number;
  orderType: 'Fuel' | 'Battery';
  orderStatus: 'Pending' | 'Delivered' | 'Cancelled';
  deliveryFee: number;
  tip: number;
  cancelReason: string;
}
