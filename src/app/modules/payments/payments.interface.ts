import { Model, ObjectId } from 'mongoose';
import { IUser } from '../user/user.interface';
import { ISubscriptions } from '../subscription/subscription.interface';
import { IOrderFuel } from '../orderFuel/orderFuel.interface';

export interface IPayment {
  _id?: ObjectId;
  user: ObjectId | IUser;
  subscription: ObjectId | ISubscriptions;
  orderFuelId: ObjectId | IOrderFuel;
  amount: number;
  tranId: string;
  paymentIntentId: string;
  isPaid: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ISubscriptionsModel = Model<IPayment, Record<string, unknown>>;
