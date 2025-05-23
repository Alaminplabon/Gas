import { ObjectId } from 'mongoose';

export interface IQuestion {
  text: string;
  answerType: string;
  comment: string;
  orderId: ObjectId;
  driverId?: ObjectId;
}
