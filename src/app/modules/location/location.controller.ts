import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { locationService } from './location.service';
import sendResponse from '../../utils/sendResponse';

const createlocation = catchAsync(async (req: Request, res: Response) => {
  const result = await locationService.createlocation(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Location created successfully',
    data: result,
  });
});
const getAlllocation = catchAsync(async (req: Request, res: Response) => {});
const getlocationById = catchAsync(async (req: Request, res: Response) => {});
const updatelocation = catchAsync(async (req: Request, res: Response) => {});
const deletelocation = catchAsync(async (req: Request, res: Response) => {});

export const locationController = {
  createlocation,
  getAlllocation,
  getlocationById,
  updatelocation,
  deletelocation,
};
