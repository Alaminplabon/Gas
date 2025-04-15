import { Schema, model } from 'mongoose';
import { IOrderFuel } from './orderFuel.interface';

const orderFuelSchema: Schema<IOrderFuel> = new Schema(
  {
    location: {
      type: String,
      required: true,
    },
    vehicleId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Vehicle', // Replace with actual model name
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Replace with actual user model if needed
    },
    fuelType: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    tip: {
      type: Number,
      required: true,
    },
    orderType: {
      type: String,
      enum: ['Fuel', 'Battery'],
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Delivered', 'Cancelled'],
      required: true,
    },
    cancelReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const orderFuel = model<IOrderFuel>('orderFuel', orderFuelSchema);
