import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { IReview } from './review.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { Review } from './review.models';

// Create a new review
const createreview = async (payload: IReview) => {
  const result = await Review.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create review');
  }
  return result;
};

// Get all reviews with pagination, filter, search, and population
const getAllreview = async (query: Record<string, any>) => {
  const queryBuilder = new QueryBuilder(
    Review.find().populate('driverId'),
    query,
  )
    .search(['review']) // allows searching text inside the review
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await queryBuilder.modelQuery;
  const meta = await queryBuilder.countTotal();
  return { data, meta };
};

// Get review by ID
const getreviewById = async (id: string) => {
  const result = await Review.findById(id).populate(['driverId', 'userId']);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found');
  }
  return result;
};

const getreviewByDriverId = async (id: string) => {
  const result = await Review.find({ driverId: id }).populate(['userId']);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Review not found');
  }
  return result;
};

// Update review
const updatereview = async (id: string, payload: Partial<IReview>) => {
  const result = await Review.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update review');
  }
  return result;
};

// Delete review
const deletereview = async (id: string) => {
  const result = await Review.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete review');
  }
  return result;
};

export const reviewService = {
  createreview,
  getAllreview,
  getreviewById,
  updatereview,
  deletereview,
  getreviewByDriverId,
};
