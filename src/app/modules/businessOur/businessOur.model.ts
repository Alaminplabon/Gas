import { model, Schema } from 'mongoose';
import { TBusinessOur } from './businessOur.interface';

const BusinessHourSchema: Schema = new Schema<TBusinessOur>(
  {
    userType: {
      type: String,
      enum: ['subscriber', 'nonSubscriber'],
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const BusinessHour = model<TBusinessOur>(
  'BusinessHour',
  BusinessHourSchema,
);
