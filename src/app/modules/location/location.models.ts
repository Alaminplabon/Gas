import { Schema, model } from 'mongoose';
import { ILocation } from './location.interface';

const LocationSchema: Schema<ILocation> = new Schema(
  {
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

LocationSchema.index({ location: '2dsphere' });

export const Location = model<ILocation>('Location', LocationSchema);
