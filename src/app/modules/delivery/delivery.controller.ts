// src/modules/delivery/delivery.controller.ts
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { deliveryService } from './delivery.service';
import { uploadToS3 } from '../../utils/s3';

const createdelivery = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  req.body.userId = userId;
  const result = await deliveryService.createdelivery(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Delivery record created successfully',
    data: result,
  });
});

const getAlldelivery = catchAsync(async (req: Request, res: Response) => {
  const result = await deliveryService.getAlldelivery(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Deliveries retrieved successfully',
    data: result,
  });
});

const getdeliveryById = catchAsync(async (req: Request, res: Response) => {
  const result = await deliveryService.getdeliveryById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Delivery retrieved successfully',
    data: result,
  });
});

const updatedelivery = catchAsync(async (req: Request, res: Response) => {
  if (req?.file) {
    req.body.proofImage = await uploadToS3({
      file: req.file,
      fileName: `images/user/profile/${Math.floor(100000 + Math.random() * 900000)}`,
    });
  }
  const result = await deliveryService.updatedelivery(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Delivery updated successfully',
    data: result,
  });
});

const deletedelivery = catchAsync(async (req: Request, res: Response) => {
  const result = await deliveryService.deletedelivery(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Delivery deleted successfully',
    data: result,
  });
});

export const deliveryController = {
  createdelivery,
  getAlldelivery,
  getdeliveryById,
  updatedelivery,
  deletedelivery,
};
