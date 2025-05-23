import { ObjectId } from 'mongoose';

export interface IServices {
  serviceName: string;
  price: number;
  status: boolean;
}
