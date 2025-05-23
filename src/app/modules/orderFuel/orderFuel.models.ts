import { Schema, model } from 'mongoose';
import { IOrderFuel } from './orderFuel.interface';

const orderFuelSchema: Schema<IOrderFuel> = new Schema(
  {
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
      },
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
    amount: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
    },
    presetAmount: {
      type: Boolean,
      default: false,
    },
    customAmount: {
      type: Boolean,
      default: false,
    },
    tip: {
      type: Number,
      required: true,
    },
    orderType: {
      type: String,
      enum: ['Fuel', 'Battery'],
      // required: true,
    },
    orderStatus: {
      type: String,
      enum: ['active', 'Pending', 'InProgress', 'Delivered', 'Cancelled'],
      default: 'active',
      // required: true,
    },
    cancelReason: {
      type: String,
    },
    fuelType: {
      type: String
      // required: true,
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: 'Payment',
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    finalAmountOfPayment: {
      type: Number,
    },
    zipCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const orderFuel = model<IOrderFuel>('orderFuel', orderFuelSchema);
