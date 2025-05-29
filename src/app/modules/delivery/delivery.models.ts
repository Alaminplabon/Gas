import { Schema, model } from 'mongoose';
import { Idelivery } from './delivery.interface';

const deliverySchema: Schema<Idelivery> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'orderFuel',
    },
    status: {
      type: String,
      enum: ['accept', 'ontheway', 'delivered'],
      required: true,
      default: 'accept',
    },
    proofImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Delivery = model<Idelivery>('Delivery', deliverySchema);
