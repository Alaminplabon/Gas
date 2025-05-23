import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { businessOurServices } from './businessOur.services';
import httpStatus from 'http-status';

const updateBusinessOur = catchAsync(async (req: Request, res: Response) => {
  const userType = req.body.userType;
  if (userType !== 'subscriber' && userType !== 'nonSubscriber')
    return res.status(400).json({ message: 'Invalid user type' });
  const payload = req.body;
  const result = await businessOurServices.updateBusinessOur(userType, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Business Our updated successfully',
    data: result,
  });
});

const getBusinessHours = catchAsync(async (req: Request, res: Response) => {
  const result = await businessOurServices.getBusinessHours();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Business Ours retrieved successfully',
    data: result,
  });
});

const getSingleBusinessHour = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await businessOurServices.getSingleBusinessHour(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Business Our retrieved successfully',
      data: result,
    });
  },
);

export const businessOurControllers = {
  updateBusinessOur,
  getBusinessHours,
  getSingleBusinessHour,
};
