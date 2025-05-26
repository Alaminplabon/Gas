/* driverEarning.service.ts */
import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { IDriverErning } from './driverErning.interface';
import { DriverEarning } from './driverErning.models';
import mongoose from 'mongoose';




type Filter = 'week' | 'month' | 'all';

function calcStartDate(filter: Filter): Date | undefined {
  if (filter === 'week') {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday...
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const start = new Date(now.setDate(diff));
    start.setHours(0, 0, 0, 0);
    return start;
  }
  if (filter === 'month') {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    start.setHours(0, 0, 0, 0);
    return start;
  }
  return undefined;
}


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


const getDriverEarningsSummary = async (
  userId: string,
  filter: Filter = 'all',
) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid userId');
  }
  const uid = new mongoose.Types.ObjectId(userId);

  // today range
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  // sum today
  const [todayRes] = await DriverEarning.aggregate([
    {
      $match: {
        userId: uid,
        createdAt: { $gte: startOfToday, $lte: endOfToday },
      },
    },
    { $group: { _id: null, sum: { $sum: '$totalEarnings' } } },
  ]);

  // sum total by filter
  const match: any = { userId: uid };
  const startDate = calcStartDate(filter);
  if (startDate) match.createdAt = { $gte: startDate };

  const [totalRes] = await DriverEarning.aggregate([
    { $match: match },
    { $group: { _id: null, sum: { $sum: '$totalEarnings' } } },
  ]);

  return {
    todayEarnings: todayRes?.sum || 0,
    totalEarnings: totalRes?.sum || 0,
  };
};

const getAllDriverEarningsSummary = async (filter: Filter = 'all') => {
  const match: any = {};
  const startDate = calcStartDate(filter);
  if (startDate) {
    match.createdAt = { $gte: startDate };
  }
  return DriverEarning.find(match).populate('userId');
};

export const driverEarningService = {
  createDriverEarning,
  getAllDriverEarnings,
  getDriverEarningById,
  updateDriverEarning,
  deleteDriverEarning,
  getDriverEarningsSummary,
  getAllDriverEarningsSummary,
};
