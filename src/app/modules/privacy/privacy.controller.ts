import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import Privacy from './privacy.models';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { IPrivacy } from './privacy.interface';

// Create Privacy
const createprivacy = catchAsync(async (req: Request, res: Response) => {
  const { description } = req.body;
  const newPrivacy = await Privacy.create({ description });
  res.status(201).json({
    status: 'success',
    data: newPrivacy,
  });
});

// Get All Privacy
const getAllprivacy = catchAsync(async (req: Request, res: Response) => {
  const privacyList = await Privacy.find();
  res.status(200).json({
    status: 'success',
    data: privacyList,
  });
});

// Get Privacy by ID
const getprivacyById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const privacy = await Privacy.findById(id);
  if (!privacy) {
    return res.status(404).json({
      status: 'fail',
      message: 'Privacy not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: privacy,
  });
});

// Update Privacy
const updateprivacy = catchAsync(async (req: Request, res: Response) => {
  const privacy = await Privacy.findOne({});
  const updatedPrivacy: IPrivacy | null = await Privacy.findByIdAndUpdate(
    privacy?._id,
    {
      description: req.body.description,
    },
    { new: true },
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated successfully',
    data: updatedPrivacy,
  });
});

// Delete Privacy
const deleteprivacy = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedPrivacy = await Privacy.findByIdAndDelete(id);
  if (!deletedPrivacy) {
    return res.status(404).json({
      status: 'fail',
      message: 'Privacy not found',
    });
  }
  res.status(204).json({
    status: 'success',
    message: 'Privacy record deleted successfully',
  });
});

export const privacyController = {
  createprivacy,
  getAllprivacy,
  getprivacyById,
  updateprivacy,
  deleteprivacy,
};
