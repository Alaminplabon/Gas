import { Model, ObjectId } from 'mongoose';
import { IPackage } from '../packages/packages.interface';

export interface ISubscriptions {
  user: ObjectId;
  package: ObjectId | IPackage;
  durationType: "monthly" | "yearly"
  isPaid: boolean;
  trnId: string;
  amount: number;
  expiredAt: Date;
  isExpired: boolean;
  isDeleted: boolean;
  
}

export type ISubscriptionsModel = Model<
  ISubscriptions,
  Record<string, unknown>
>;
