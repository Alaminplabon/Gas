import { ObjectId } from 'mongoose';

export interface IDriverErning {
  userId: ObjectId;
  delevaryEarn: number;
  tipEarn: number;
  totalEarnings: number;
  delevaryId: ObjectId;
}
