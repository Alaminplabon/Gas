// driverEarning.model.ts
import { Schema, model } from 'mongoose';
import { IDriverErning } from './driverErning.interface';

const driverEarningSchema = new Schema<IDriverErning>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    delevaryEarn: {
      type: Number,
      required: true,
      default: 0,
    },
    tipEarn: {
      type: Number,
      required: true,
      default: 0,
    },
    totalEarnings: {
      type: Number,
      required: true,
      default: 0,
    },
    delevaryId: {
      type: Schema.Types.ObjectId,
      ref: 'Delivery',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const DriverEarning = model<IDriverErning>(
  'DriverEarning',
  driverEarningSchema,
);
