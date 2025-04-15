import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import { IVehicle } from './vechile.interface';
import { Vehicle } from './vechile.models';

// Create a new vehicle
const createvechile = async (payload: IVehicle) => {
  const result = await Vehicle.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create vehicle');
  }
  return result;
};

// Get all vehicles with filters, pagination, sorting
const getAllvechile = async (query: Record<string, any>) => {
  const queryBuilder = new QueryBuilder(
    Vehicle.find().populate('userId'),
    query,
  )
    .search(['make', 'model'])
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await queryBuilder.modelQuery;
  const meta = await queryBuilder.countTotal();
  return { data, meta };
};

// Get vehicle by ID
const getvechileById = async (id: string) => {
  const result = await Vehicle.findById(id).populate('userId');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Vehicle not found');
  }
  return result;
};

// Update vehicle
const updatevechile = async (id: string, payload: Partial<IVehicle>) => {
  const result = await Vehicle.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update vehicle');
  }
  return result;
};

// Delete vehicle
const deletevechile = async (id: string) => {
  const result = await Vehicle.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete vehicle');
  }
  return result;
};

export const vechileService = {
  createvechile,
  getAllvechile,
  getvechileById,
  updatevechile,
  deletevechile,
};
