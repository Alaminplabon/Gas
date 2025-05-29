import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';

const createanswer = catchAsync(async (req: Request, res: Response) => {});
const getAllanswer = catchAsync(async (req: Request, res: Response) => {});
const getanswerById = catchAsync(async (req: Request, res: Response) => {});
const updateanswer = catchAsync(async (req: Request, res: Response) => {});
const deleteanswer = catchAsync(async (req: Request, res: Response) => {});

export const answerController = {
  createanswer,
  getAllanswer,
  getanswerById,
  updateanswer,
  deleteanswer,
};