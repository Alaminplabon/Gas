// src/modules/fuelInfo/fuelInfo.model.ts
import { Schema, model, Document } from 'mongoose';
import { IFuelInfo } from './fuelInfo.interface';

export interface FuelInfoDocument extends IFuelInfo, Document {}

const fuelInfoSchema = new Schema<FuelInfoDocument>(
  {
    fuelName: { type: String, required: true, trim: true },
    fuelPrice: { type: Number, required: true, min: 0 },
    zipCode: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

export const FuelInfoModel = model<FuelInfoDocument>(
  'FuelInfo',
  fuelInfoSchema,
);
