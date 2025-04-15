import { ObjectId } from 'mongoose';

export interface IReview {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [x: string]: any;
  driverId: ObjectId;
  userId: ObjectId;
  rating: number;
  review: string;
}
