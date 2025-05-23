import { Schema, model } from 'mongoose';
import { ICityExpansion } from './cityExpansion.interface';

const cityExpansionSchema = new Schema<ICityExpansion>(
  {
    cityName: { type: String, required: true },
    centralZipCode: { type: String, required: true },
    radius: { type: String, required: true },
    coveredZipCodes: { type: [String], required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true },
);

export const CityExpansion = model<ICityExpansion>(
  'CityExpansion',
  cityExpansionSchema,
);
