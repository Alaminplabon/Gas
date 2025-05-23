// src/modules/services/services.model.ts

import { Schema, model } from 'mongoose';
import { IServices } from './services.interface';

const servicesSchema = new Schema<IServices>(
  {
    serviceName: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Services = model<IServices>('Services', servicesSchema);
