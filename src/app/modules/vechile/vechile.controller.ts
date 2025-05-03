import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { vechileService } from './vechile.service';

const createvechile = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  req.body.userId = userId;
  const result = await vechileService.createvechile(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Vehicle created successfully',
    data: result,
  });
});

const getAllvechile = catchAsync(async (req: Request, res: Response) => {
  const result = await vechileService.getAllvechile(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Vehicles retrieved successfully',
    data: result,
  });
});

const getvechileById = catchAsync(async (req: Request, res: Response) => {
  const result = await vechileService.getvechileById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Vehicle retrieved successfully',
    data: result,
  });
});

const updatevechile = catchAsync(async (req: Request, res: Response) => {
  const result = await vechileService.updatevechile(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Vehicle updated successfully',
    data: result,
  });
});

const deletevechile = catchAsync(async (req: Request, res: Response) => {
  const result = await vechileService.deletevechile(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Vehicle deleted successfully',
    data: result,
  });
});

const getMyVechiles = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  const result = await vechileService.getMyVechiles(userId, req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Your vehicles retrieved successfully',
    data: result,
  });
});

export const vechileController = {
  createvechile,
  getAllvechile,
  getvechileById,
  updatevechile,
  deletevechile,
  getMyVechiles,
};
