// src/modules/deliveryAndTip/deliveryAndTip.model.ts
import { Schema, model, Document } from 'mongoose';
import { IDeliveryAndTip } from './deliveryAndTip.interface';

export interface DeliveryAndTipDocument extends IDeliveryAndTip, Document {}

const deliveryAndTipSchema = new Schema<DeliveryAndTipDocument>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    zipCode: { type: [String], required: true },
  },
  { timestamps: true },
);

export const DeliveryAndTipModel = model<DeliveryAndTipDocument>(
  'DeliveryAndTip',
  deliveryAndTipSchema,
);
