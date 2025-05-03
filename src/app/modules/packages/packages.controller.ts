import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { packagesService } from './packages.service';
import sendResponse from '../../utils/sendResponse';

const createPackages = catchAsync(async (req: Request, res: Response) => {
  const result = await packagesService.createPackages(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Packages created successfully',
    data: result,
  });
});
const getAllPackages = catchAsync(async (req: Request, res: Response) => {
  const result = await packagesService.getAllPackages(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All packages fetched successfully',
    data: result,
  });
});

const getPackagesById = catchAsync(async (req: Request, res: Response) => {
  const result = await packagesService.getPackagesById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Packages fetched successfully',
    data: result,
  });
});

const updatePackages = catchAsync(async (req: Request, res: Response) => {
  const result = await packagesService.updatePackages(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Packages updated successfully',
    data: result,
  });
});

const deletePackages = catchAsync(async (req: Request, res: Response) => {
  const result = await packagesService.deletePackages(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Packages deleted successfully',
    data: result,
  });
});

export const packagesController = {
  createPackages,
  getAllPackages,
  getPackagesById,
  updatePackages,
  deletePackages,
};
