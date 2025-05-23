// src/modules/coupon/coupon.service.ts
import { Types } from 'mongoose';
import { ICoupon } from './coupon.interface';
import { CouponDocument, CouponModel } from './coupon.models';

const createCoupon = async (payload: ICoupon): Promise<CouponDocument> => {
  return CouponModel.create(payload);
};

const getAllCoupons = async (): Promise<CouponDocument[]> => {
  return CouponModel.find().sort({ createdAt: -1 });
};

const getCouponById = async (id: string): Promise<CouponDocument | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return CouponModel.findById(id);
};

const updateCoupon = async (
  id: string,
  payload: Partial<ICoupon>,
): Promise<CouponDocument | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return CouponModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteCoupon = async (id: string): Promise<CouponDocument | null> => {
  if (!Types.ObjectId.isValid(id)) return null;
  return CouponModel.findByIdAndDelete(id);
};

export const couponService = {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
};
