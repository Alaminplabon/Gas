import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { cityExpansionService } from './cityExpansion.service';

const createCityExpansion = catchAsync(async (req: Request, res: Response) => {
  const result = await cityExpansionService.createCityExpansion(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'City expansion created successfully',
    data: result,
  });
});

const getAllCityExpansions = catchAsync(async (req: Request, res: Response) => {
  const result = await cityExpansionService.getAllCityExpansions(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'City expansions retrieved successfully',
    data: result,
  });
});

const getCityExpansionById = catchAsync(async (req: Request, res: Response) => {
  const result = await cityExpansionService.getCityExpansionById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'City expansion retrieved successfully',
    data: result,
  });
});

const updateCityExpansion = catchAsync(async (req: Request, res: Response) => {
  const result = await cityExpansionService.updateCityExpansion(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'City expansion updated successfully',
    data: result,
  });
});

const deleteCityExpansion = catchAsync(async (req: Request, res: Response) => {
  const result = await cityExpansionService.deleteCityExpansion(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'City expansion deleted successfully',
    data: result,
  });
});

export const cityExpansionController = {
  createCityExpansion,
  getAllCityExpansions,
  getCityExpansionById,
  updateCityExpansion,
  deleteCityExpansion,
};
