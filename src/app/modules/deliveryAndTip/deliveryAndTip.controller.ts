// src/modules/deliveryAndTip/deliveryAndTip.controller.ts
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { deliveryAndTipService } from './deliveryAndTip.service';

const createDeliveryAndTip = catchAsync(async (req: Request, res: Response) => {
  const data = await deliveryAndTipService.createDeliveryAndTip(req.body);
  res.status(201).json({ success: true, data });
});

const getAllDeliveryAndTip = catchAsync(
  async (_req: Request, res: Response) => {
    const data = await deliveryAndTipService.getAllDeliveryAndTip();
    res.status(200).json({ success: true, count: data.length, data });
  },
);

const getDeliveryAndTipById = catchAsync(
  async (req: Request, res: Response) => {
    const data = await deliveryAndTipService.getDeliveryAndTipById(
      req.params.id,
    );
    if (!data)
      return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data });
  },
);

const updateDeliveryAndTip = catchAsync(async (req: Request, res: Response) => {
  const data = await deliveryAndTipService.updateDeliveryAndTip(
    req.params.id,
    req.body,
  );
  if (!data)
    return res
      .status(404)
      .json({ success: false, message: 'Update failed or not found' });
  res.status(200).json({ success: true, data });
});

const deleteDeliveryAndTip = catchAsync(async (req: Request, res: Response) => {
  const data = await deliveryAndTipService.deleteDeliveryAndTip(req.params.id);
  if (!data)
    return res.status(404).json({ success: false, message: 'Not found' });
  res.status(204).send();
});

export const deliveryAndTipController = {
  createDeliveryAndTip,
  getAllDeliveryAndTip,
  getDeliveryAndTipById,
  updateDeliveryAndTip,
  deleteDeliveryAndTip,
};
