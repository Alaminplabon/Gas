import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { termsService } from './terms.service';
import Terms from './terms.models';
import { Iterms } from './terms.interface';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// Create Terms
const createterms = catchAsync(async (req: Request, res: Response) => {
  const { description } = req.body;
  const newTerms = await termsService.createterms(description);
  res.status(201).json({
    status: 'success',
    data: newTerms,
  });
});

// Get All Terms
const getAllterms = catchAsync(async (req: Request, res: Response) => {
  const termsList = await termsService.getAllterms();
  res.status(200).json({
    status: 'success',
    data: termsList,
  });
});

// Get Terms by ID
const gettermsById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const terms = await termsService.gettermsById(id);
  if (!terms) {
    return res.status(404).json({
      status: 'fail',
      message: 'Terms not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: terms,
  });
});

// Update Terms
const updateterms = catchAsync(async (req: Request, res: Response) => {
  const terms = await Terms.findOne({});
  const updatedTerms: Iterms | null = await Terms.findByIdAndUpdate(
    terms?._id,
    {
      description: req.body.description,
    },
    { new: true },
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated successfully',
    data: updatedTerms,
  });
});

// Delete Terms
const deleteterms = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedTerms = await termsService.deleteterms(id);
  if (!deletedTerms) {
    return res.status(404).json({
      status: 'fail',
      message: 'Terms not found',
    });
  }
  res.status(204).json({
    status: 'success',
    message: 'Terms record deleted successfully',
  });
});

export const termsController = {
  createterms,
  getAllterms,
  gettermsById,
  updateterms,
  deleteterms,
};
