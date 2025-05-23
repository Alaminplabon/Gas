// src/modules/coupon/coupon.model.ts
import { Schema, model, Document } from 'mongoose';
import { ICoupon } from './coupon.interface';

export interface CouponDocument extends ICoupon, Document {}

const couponSchema = new Schema<CouponDocument>(
  {
    applicableOn: { type: String, required: true, trim: true },
    couponName: { type: String, required: true, trim: true },
    expiryDate: { type: String, required: true }, // store as ISO string
    couponCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    discount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export const CouponModel = model<CouponDocument>('Coupon', couponSchema);
