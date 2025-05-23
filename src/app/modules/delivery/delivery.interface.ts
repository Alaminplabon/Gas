import { ObjectId } from 'mongoose';

export interface Idelivery {
  userId: ObjectId;
  orderId: ObjectId;
  status: 'accept' | 'ontheway' | 'delivered';
  proofImage: string;
}
