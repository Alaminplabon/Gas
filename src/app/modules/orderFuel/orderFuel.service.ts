import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { IOrderFuel } from './orderFuel.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { orderFuel } from './orderFuel.models';

// Create
const createorderFuel = async (payload: IOrderFuel) => {
  const result = await orderFuel.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create order');
  }
  return result;
};

// Get All
const getAllorderFuel = async (query: Record<string, any>) => {
  const queryBuilder = new QueryBuilder(
    orderFuel.find().populate(['userId']),
    query,
  )
    .search(['location', 'fuelType'])
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await queryBuilder.modelQuery;
  const meta = await queryBuilder.countTotal();
  return { data, meta };
};

// Get By ID
const getorderFuelById = async (id: string) => {
  const result = await orderFuel.findById(id).populate(['userId']);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return result;
};

// Update
const updateorderFuel = async (id: string, payload: Partial<IOrderFuel>) => {
  const result = await orderFuel.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Order update failed');
  }
  return result;
};

// Delete (Soft delete or hard delete as needed)
const deleteorderFuel = async (id: string) => {
  const result = await orderFuel.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Order delete failed');
  }
  return result;
};

export const orderFuelService = {
  createorderFuel,
  getAllorderFuel,
  getorderFuelById,
  updateorderFuel,
  deleteorderFuel,
};
