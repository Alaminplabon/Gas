/* driverEarning.service.ts */
import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { IDriverErning } from './driverErning.interface';
import { DriverEarning } from './driverErning.models';

// Create a new driver earning record
const createDriverEarning = async (payload: IDriverErning) => {
  const result = await DriverEarning.create(payload);
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to create driver earning record',
    );
  }
  return result;
};

// Get all driver earnings with query options
const getAllDriverEarnings = async (query: Record<string, any>) => {
  const qb = new QueryBuilder(DriverEarning.find(), query)
    .search(['userId'])
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await qb.modelQuery;
  const meta = await qb.countTotal();

  return { data, meta };
};

// Get a single driver earning by ID
const getDriverEarningById = async (id: string) => {
  const result = await DriverEarning.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Driver earning record not found');
  }
  return result;
};

// Update an existing driver earning
const updateDriverEarning = async (
  id: string,
  payload: Partial<IDriverErning>,
) => {
  const result = await DriverEarning.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to update driver earning record',
    );
  }
  return result;
};

// Soft delete a driver earning record
const deleteDriverEarning = async (id: string) => {
  const result = await DriverEarning.findByIdAndUpdate(
    id,
    { $set: { isDeleted: true } },
    { new: true },
  );
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to delete driver earning record',
    );
  }
  return result;
};

export const driverEarningService = {
  createDriverEarning,
  getAllDriverEarnings,
  getDriverEarningById,
  updateDriverEarning,
  deleteDriverEarning,
};
