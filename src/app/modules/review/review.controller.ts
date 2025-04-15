import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { reviewService } from './review.service';

const createreview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.createreview(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

const getAllreview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.getAllreview(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Reviews retrieved successfully',
    data: result,
  });
});

const getreviewById = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.getreviewById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Review retrieved successfully',
    data: result,
  });
});

const updatereview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.updatereview(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Review updated successfully',
    data: result,
  });
});

const deletereview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.deletereview(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Review deleted successfully',
    data: result,
  });
});

export const reviewController = {
  createreview,
  getAllreview,
  getreviewById,
  updatereview,
  deletereview,
};
