// src/modules/question/question.controller.ts

import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { questionService } from './question.service';

const createquestion = catchAsync(async (req: Request, res: Response) => {
  const result = await questionService.createquestion(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Question created successfully',
    data: result,
  });
});

const getAllquestion = catchAsync(async (req: Request, res: Response) => {
  const result = await questionService.getAllquestion(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Questions retrieved successfully',
    data: result,
  });
});

const getquestionById = catchAsync(async (req: Request, res: Response) => {
  const result = await questionService.getquestionById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Question retrieved successfully',
    data: result,
  });
});

const updatequestion = catchAsync(async (req: Request, res: Response) => {
  const result = await questionService.updatequestion(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Question updated successfully',
    data: result,
  });
});

const deletequestion = catchAsync(async (req: Request, res: Response) => {
  const result = await questionService.deletequestion(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Question deleted successfully',
    data: result,
  });
});

export const questionController = {
  createquestion,
  getAllquestion,
  getquestionById,
  updatequestion,
  deletequestion,
};
