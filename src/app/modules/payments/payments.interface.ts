import { Model, ObjectId } from 'mongoose';
import { IUser } from '../user/user.interface';
import { ISubscriptions } from '../subscription/subscription.interface';

export interface IPayment {
  _id?: ObjectId;
  user: ObjectId | IUser;
  subscription: ObjectId | ISubscriptions;
  amount: number;
  tranId: string;
  isPaid: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  orderFuel?: ObjectId;
}

export type ISubscriptionsModel = Model<IPayment, Record<string, unknown>>;
