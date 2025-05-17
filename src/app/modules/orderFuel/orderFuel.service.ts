import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { IOrderFuel } from './orderFuel.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { orderFuel } from './orderFuel.models';
import { Location } from '../location/location.models';

const MILES_TO_METERS = 1609.34;

const createorderFuel = async (payload: IOrderFuel) => {
  let price = 0;

  // Calculate price based on fuelType
  switch (payload.fuelType) {
    case 'Diesel':
      price = payload.amount * 10;
      break;
    case 'Petrol':
      price = payload.amount * 100;
      break;
    case 'Electric':
      price = payload.amount * 1000;
      break;
    default:
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid fuel type');
  }

  // Check if within 10 miles of any registered location
  const nearbyLocation = await Location.findOne({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: payload.location.coordinates,
        },
        $maxDistance: 10 * MILES_TO_METERS, // 10 miles in meters
      },
    },
  });

  if (!nearbyLocation) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Service not available at this location. You must be within 10 miles of a service point.',
    );
  }

  const finalAmountOfPayment = price + payload.deliveryFee + payload.tip;

  // Proceed to create the order
  const result = await orderFuel.create({
    ...payload,
    price,
    finalAmountOfPayment,
  });

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create order');
  }

  return result;
};

// Get All
const getAllorderFuel = async (query: Record<string, any>) => {
  const queryBuilder = new QueryBuilder(
    orderFuel
      .find({ isPaid: true, orderStatus: 'pending' })
      .populate(['userId']),
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

const getInProgressorderFuel = async (query: Record<string, any>) => {
  const queryBuilder = new QueryBuilder(
    orderFuel
      .find({ isPaid: true, orderStatus: 'inProgress' })
      .populate(['userId']),
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

const getDeliveredorderFuel = async (query: Record<string, any>) => {
  const queryBuilder = new QueryBuilder(
    orderFuel
      .find({ isPaid: true, orderStatus: 'Delivered' })
      .populate(['userId']),
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
  getDeliveredorderFuel,
  getInProgressorderFuel,
};
