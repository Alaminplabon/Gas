// src/modules/delivery/delivery.service.ts
import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { Idelivery } from './delivery.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { Delivery } from './delivery.models';
import { orderFuel } from '../orderFuel/orderFuel.models';
import mongoose, { Mongoose } from 'mongoose';
import { DriverEarning } from '../driverErning/driverErning.models';

// const createdelivery = async (payload: Idelivery) => {
//   const result = await Delivery.create(payload);
//   if (!result) {
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       'Failed to create delivery record',
//     );
//   }
//   return result;
// };

const createdelivery = async (payload: Idelivery) => {
  const result = await Delivery.create(payload);
  const orderId = payload.orderId;
  const updatedOrder = await orderFuel.findByIdAndUpdate(
    orderId,
    { orderStatus: 'InProgress' },
    { new: true, runValidators: true },
  );
  if (!updatedOrder) {
    // optionally roll back the delivery or just warn
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Delivery created but failed to update order status',
    );
  }

  // 4) return the delivery record
  return result;
};

const getAlldelivery = async (query: Record<string, any>) => {
  const qb = new QueryBuilder(
    Delivery.find().populate(['userId', 'orderId']),
    query,
  )
    .search(['status'])
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await qb.modelQuery;
  const meta = await qb.countTotal();
  return { data, meta };
};

const getdeliveryById = async (id: string) => {
  const result = await Delivery.findById(id).populate(['userId', 'orderId']);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Delivery record not found');
  }
  return result;
};

// const updatedelivery = async (id: string, payload: Partial<Idelivery>) => {
//   if (payload.status === 'delivered') {
//     const updatedOrder = await orderFuel.findByIdAndUpdate(
//       payload.orderId,
//       { orderStatus: 'delivered' },
//       { new: true, runValidators: true },
//     );
//     const result = await Delivery.findByIdAndUpdate(id, payload, {
//       new: true,
//       runValidators: true,
//     });
//     if (!result) {
//       throw new AppError(
//         httpStatus.BAD_REQUEST,
//         'Failed to update delivery record',
//       );
//     }
//     return result;
//   }
// };

const updatedelivery = async (id: string, payload: Partial<Idelivery>) => {
  if (payload.status === 'delivered') {
    // 1) Mark the order delivered
    const order = await Delivery.findById(id)
    console.log('payload.orderId', order);
    

    const updatedOrder = await orderFuel.findByIdAndUpdate(
      order?.orderId,
      { orderStatus: 'Delivered' },
      { new: true, runValidators: true },
    );
    if (!updatedOrder) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Order ${payload.orderId} not found`,
      );
    }

    // 2) Update the Delivery record
    const deliveryRecord = await Delivery.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    if (!deliveryRecord) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to update delivery record',
      );
    }

    // 3) Pull amounts out of the order
    const deliveryAmount = updatedOrder.deliveryFee ?? 0;
    const tipAmount = updatedOrder.tip ?? 0;

    // 4) Identify the driver
    const driverId = deliveryRecord.userId;
    if (!driverId) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Delivery record missing driverId',
      );
    }

    // 5) Atomically increment earnings AND push this delivery’s ID
    await DriverEarning.findOneAndUpdate(
      { userId: driverId },
      {
        $inc: {
          deliveryEarn: deliveryAmount,
          tipEarn: tipAmount,
          totalEarnings: deliveryAmount + tipAmount,
        },
        $push: {
          deliveryIds: deliveryRecord._id,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    return deliveryRecord;
  }

  // For other statuses, just update the delivery document
  const result = await Delivery.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to update delivery record',
    );
  }
  return result;
};

const deletedelivery = async (id: string) => {
  const result = await Delivery.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to delete delivery record',
    );
  }
  return result;
};

export const deliveryService = {
  createdelivery,
  getAlldelivery,
  getdeliveryById,
  updatedelivery,
  deletedelivery,
};
