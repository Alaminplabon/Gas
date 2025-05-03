import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import Package from '../packages/packages.models';
import { ISubscriptions } from './subscription.interface';
import Subscription from './subscription.models';
import { Types } from 'mongoose';
import { User } from '../user/user.models';
import { USER_ROLE } from '../user/user.constants';

const createSubscription = async (payload: ISubscriptions) => {
  const isExist = await Subscription.findOne({
    user: payload.user,
    package: payload.package,
    isPaid: false,
  });

  if (isExist) {
    return isExist;
  }

  const packages = await Package.findById(payload.package);
  const user = await User.findById(payload.user);

  if (!packages) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Package not found');
  }
  if (user?.role !== USER_ROLE.administrator) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not administrator , you can not subscribe to package',
    );
  }

  if (payload.durationType == 'monthly') {
    payload.amount = packages.monthlyPrice;
    payload.durationType = payload.durationType;
  } else if (payload.durationType === 'yearly') {
    payload.amount = packages.yearlyPrice;
    payload.durationType = payload.durationType;
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid duration type');
  }
  const result = await Subscription.create(payload);
  if (!result) {
    throw new Error('Failed to create subscription');
  }

  return result;
};

const getAllSubscription = async (query: Record<string, any>) => {
  const subscriptionsModel = new QueryBuilder(
    Subscription.find().populate(['package', 'user']),
    query,
  )
    .search([])
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await subscriptionsModel.modelQuery;
  const meta = await subscriptionsModel.countTotal();
  return {
    data,
    meta,
  };
};

const getSubscriptionById = async (id: string) => {
  const result = await Subscription.findById(id).populate(['package', 'user']);
  // if (!result) {
  //   throw new Error('Subscription not found');
  // }
  return result;
};

const getSubscriptionByUserId = async (id: string) => {
  const result = await Subscription.findOne({
    user: new Types.ObjectId(id),
  }).populate(['package', 'user']);

  return result;
};

const updateSubscription = async (
  id: string,
  payload: Partial<ISubscriptions>,
) => {
  const result = await Subscription.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!result) {
    throw new Error('Failed to update subscription');
  }
  return result;
};

const deleteSubscription = async (id: string) => {
  const result = await Subscription.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result) {
    throw new Error('Failed to delete subscription');
  }
  return result;
};

export const subscriptionService = {
  createSubscription,
  getAllSubscription,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  getSubscriptionByUserId,
};
