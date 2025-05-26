/* driverEarning.controller.ts */
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { driverEarningService } from './driverErning.service';
import httpStatus from 'http-status';

// Create a new driver earning record
const createDriverEarning = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  req.body.userId = userId;
  const result = await driverEarningService.createDriverEarning(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Driver earning record created successfully',
    data: result,
  });
});

// Get all driver earnings
const getAllDriverEarnings = catchAsync(async (req: Request, res: Response) => {
  const result = await driverEarningService.getAllDriverEarnings(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Driver earnings retrieved successfully',
    data: result,
  });
});

// Get driver earning by ID
const getDriverEarningById = catchAsync(async (req: Request, res: Response) => {
  const result = await driverEarningService.getDriverEarningById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Driver earning retrieved successfully',
    data: result,
  });
});

// Update driver earning
const updateDriverEarning = catchAsync(async (req: Request, res: Response) => {
  const result = await driverEarningService.updateDriverEarning(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Driver earning updated successfully',
    data: result,
  });
});

// Delete driver earning (soft delete)
const deleteDriverEarning = catchAsync(async (req: Request, res: Response) => {
  const result = await driverEarningService.deleteDriverEarning(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Driver earning deleted successfully',
    data: result,
  });
});

const getEarningsSummary = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const filter = (req.query.filter as 'week' | 'month' | 'all') || 'all';

  const data = userId
    ? await driverEarningService.getDriverEarningsSummary(userId, filter)
    : await driverEarningService.getAllDriverEarningsSummary(filter);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Earning summary fetched successfully',
    data,
  });
});

export const driverEarningController = {
  createDriverEarning,
  getAllDriverEarnings,
  getDriverEarningById,
  updateDriverEarning,
  deleteDriverEarning,
  getEarningsSummary,
};
