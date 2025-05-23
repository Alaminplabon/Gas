// src/modules/services/services.controller.ts

import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { servicesService } from './services.service';

const createservice = catchAsync(async (req: Request, res: Response) => {
  const result = await servicesService.createservice(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});

const getAllservices = catchAsync(async (req: Request, res: Response) => {
  const result = await servicesService.getAllservices(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Services retrieved successfully',
    data: result,
  });
});

const getserviceById = catchAsync(async (req: Request, res: Response) => {
  const result = await servicesService.getserviceById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service retrieved successfully',
    data: result,
  });
});

const updateservice = catchAsync(async (req: Request, res: Response) => {
  const result = await servicesService.updateservice(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});

const deleteservice = catchAsync(async (req: Request, res: Response) => {
  const result = await servicesService.deleteservice(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service deleted successfully',
    data: result,
  });
});

export const servicesController = {
  createservice,
  getAllservices,
  getserviceById,
  updateservice,
  deleteservice,
};
