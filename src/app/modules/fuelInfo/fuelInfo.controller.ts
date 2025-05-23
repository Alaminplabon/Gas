// src/modules/fuelInfo/fuelInfo.controller.ts
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { fuelInfoService } from './fuelInfo.service';

const createfuelInfo = catchAsync(async (req: Request, res: Response) => {
  const data = await fuelInfoService.createfuelInfo(req.body);
  res.status(201).json({ status: 'success', data });
});

const getAllfuelInfo = catchAsync(async (req: Request, res: Response) => {
  const data = await fuelInfoService.getAllfuelInfo();
  res.status(200).json({ status: 'success', results: data.length, data });
});

const getfuelInfoById = catchAsync(async (req: Request, res: Response) => {
  const data = await fuelInfoService.getfuelInfoById(req.params.id);
  if (!data) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'FuelInfo not found' });
  }
  res.status(200).json({ status: 'success', data });
});

const updatefuelInfo = catchAsync(async (req: Request, res: Response) => {
  const data = await fuelInfoService.updatefuelInfo(req.params.id, req.body);
  if (!data) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'FuelInfo not found or invalid data' });
  }
  res.status(200).json({ status: 'success', data });
});

const deletefuelInfo = catchAsync(async (req: Request, res: Response) => {
  const data = await fuelInfoService.deletefuelInfo(req.params.id);
  if (!data) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'FuelInfo not found' });
  }
  res.status(204).send();
});

export const fuelInfoController = {
  createfuelInfo,
  getAllfuelInfo,
  getfuelInfoById,
  updatefuelInfo,
  deletefuelInfo,
};
