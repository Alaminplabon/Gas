import { ObjectId } from 'mongoose';

export interface IOrderFuel {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [x: string]: any;
  location: { coordinates: [number, number]; type: string };
  vehicleId: ObjectId;
  userId: ObjectId;
  presetAmount: boolean;
  customAmount: boolean;
  amount: number;
  price: number;
  fuelType: string;
  orderType: 'Fuel' | 'Battery';
  orderStatus: 'active' | 'Pending' | 'Delivered' | 'Cancelled';
  deliveryFee: number;
  tip: number;
  cancelReason: string;
  paymentId: ObjectId;
  isPaid: boolean;
  finalAmountOfPayment: number;
  zipCode: string;
}
