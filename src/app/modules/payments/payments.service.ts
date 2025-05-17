import Stripe from 'stripe';
import config from '../../config';
import { IPayment } from './payments.interface';
import { ISubscriptions } from '../subscription/subscription.interface';
import Subscription from '../subscription/subscription.models';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import Payment from './payments.models';
import { User } from '../user/user.models';
import { createCheckoutSession } from './payments.utils';
import { now, startSession } from 'mongoose';
import { IPackage } from '../packages/packages.interface';
import { notificationServices } from '../notification/notification.service';
import { modeType } from '../notification/notification.interface';
import { USER_ROLE } from '../user/user.constants';
import generateRandomString from '../../utils/generateRandomString';
import moment from 'moment';
import { IUser } from '../user/user.interface';
import { Notification } from '../notification/notification.model';
import { subscribe } from 'diagnostics_channel';
import Package from '../packages/packages.models';
import QueryBuilder from '../../builder/QueryBuilder';
import { orderFuel } from '../orderFuel/orderFuel.models';

const stripe = new Stripe(config.stripe?.stripe_api_secret as string, {
  apiVersion: '2024-06-20',
  typescript: true,
});

// const checkout = async (payload: IPayment) => {
//   const tranId = generateRandomString(10);
//   let paymentData: IPayment;
//   const subscription: ISubscriptions | null = await Subscription.findById(
//     payload?.subscription,
//   ).populate('package');

//   if (!subscription) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Subscription Not Found!');
//   }

//   // Check for existing unpaid payment for the subscription
//   const isExistPayment: IPayment | null = await Payment.findOne({
//     subscription: payload?.subscription,
//     isPaid: false,
//     user: payload?.user,
//   });

//   const user = await User.findById(payload?.user);
//   let amount = subscription?.amount;
//   if (isExistPayment) {
//     const payment = await Payment.findByIdAndUpdate(
//       isExistPayment?._id,
//       { tranId },
//       { new: true },
//     );

//     paymentData = payment as IPayment;
//     paymentData.amount = amount;
//     // Add VAT for users with vat_type = "Romania"
//   } else {
//     payload.tranId = tranId;
//     payload.amount = amount;
//     const createdPayment = await Payment.create(payload);
//     if (!createdPayment) {
//       throw new AppError(
//         httpStatus.INTERNAL_SERVER_ERROR,
//         'Failed to create payment',
//       );
//     }
//     paymentData = createdPayment;
//   }
//   // if (!paymentData)
//   //   throw new AppError(httpStatus.BAD_REQUEST, 'payment not found');
//   console.log('paymentData', paymentData);
//   const checkoutSession = await createCheckoutSession({
//     // customerId: customer.id,
//     product: {
//       amount: paymentData?.amount,
//       //@ts-ignore
//       name: subscription?.package?.title,
//       quantity: 1,
//     },

//     //@ts-ignore
//     paymentId: paymentData?._id,
//   });

//   return checkoutSession?.url;
// };

const checkout = async (payload: IPayment) => {
  const tranId = generateRandomString(10);
  let paymentData: IPayment;

  const order = await orderFuel.findById(payload?.orderFuelId);
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found!');
  }

  const user = await User.findById(payload?.user);
  const amount = order.finalAmountOfPayment;

  // Check for existing unpaid payment for the order
  const existingPayment: IPayment | null = await Payment.findOne({
    orderFuelId: order._id,
    isPaid: false,
    user: payload?.user,
  });

  if (existingPayment) {
    const updatedPayment = await Payment.findByIdAndUpdate(
      existingPayment._id,
      { tranId, amount },
      { new: true },
    );
    paymentData = updatedPayment as IPayment;
  } else {
    payload.tranId = tranId;
    payload.amount = amount;
    payload.orderFuelId = order._id as any;

    const createdPayment = await Payment.create(payload);
    if (!createdPayment) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create payment',
      );
    }
    paymentData = createdPayment;
  }

  const checkoutSession = await createCheckoutSession({
    product: {
      amount: paymentData.amount,
      name: 'Fuel Order Payment',
      quantity: 1,
    },
    paymentId: paymentData._id ? paymentData._id.toString() : '',
  });

  return checkoutSession?.url;
};

// const confirmPayment = async (query: Record<string, any>) => {
//   console.log('query', query);
//   const { sessionId, paymentId } = query;

//   const PaymentSession = await stripe.checkout.sessions.retrieve(sessionId);
//   const paymentIntentId = PaymentSession.payment_intent as string;

//   if (PaymentSession.status !== 'complete') {
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       'Payment session is not completed',
//     );
//   }
//   let payment: any;
//   let originalPayment: any;
//   let oldSubscription: any;
//   let originalOldSubscription: any;
//   let subscription: any;
//   let originalSubscription: any;
//   try {
//     // Step 1: Save the original state
//     const payment = await Payment.findById(paymentId).populate('user');
//     //@ts-ignore
//     originalPayment = { ...payment.toObject() }; // Store original payment state

//     console.log('payment', payment);

//     oldSubscription = await Subscription.findOne({
//       user: payment?.user,
//       isPaid: true,
//       isExpired: false,
//     });

//     originalOldSubscription = { ...oldSubscription?.toObject() };

//     console.log('oldSubscription', oldSubscription);

//     subscription = await Subscription.findById(payment?.subscription).populate(
//       'package',
//     );

//     originalSubscription = { ...subscription?.toObject() };

//     // let expiredAt;

//     // if (
//     //   oldSubscription?.expiredAt &&
//     //   moment(oldSubscription.expiredAt).isAfter(moment())
//     // ) {
//     //   const remainingTime = moment(oldSubscription.expiredAt).diff(moment());
//     //   expiredAt = moment().add(remainingTime, 'milliseconds');
//     // } else {
//     //   expiredAt = moment();
//     // }

//     // if ((subscription?.package as IPackage)?.durationDay) {
//     //   expiredAt = expiredAt.add(
//     //     (subscription?.package as IPackage)?.durationDay,
//     //     'days',
//     //   );
//     // }

//     // expiredAt = expiredAt.toDate();

//     // Step 2: Perform the updates
//     await Subscription.findByIdAndUpdate(payment?.subscription, {
//       isPaid: true,
//       trnId: payment?.tranId,
//     }).populate('package');

//     const user = await User.findById(payment?.user);

//     console.log('user', user);

//     if (!user) {
//       throw new AppError(httpStatus.NOT_FOUND, 'User Not Found!');
//     }

//     const packageDetails = subscription?.package as IPackage;
//     if (packageDetails) {
//       const { token } = packageDetails;

//       user.tokenAmount = (user.tokenAmount || 0) + (token || 0);

//       await user.save();
//     }

//     console.log('packageDetails', packageDetails);

//     await Package.findByIdAndUpdate(packageDetails?._id, {
//       $inc: { popularity: 1 },
//     });

//     const admin = await User.findOne({ role: USER_ROLE.admin });

//     await Notification.create([
//       {
//         //@ts-ignore
//         receiver: payment?.user?._id,
//         message: 'Your subscription payment was successful!',
//         description: `Your payment with ID ${payment?._id} has been processed successfully. Thank you for subscribing!`,
//         refference: payment?._id,
//         model_type: modeType?.Payment,
//       },
//       {
//         receiver: admin?._id,
//         message: 'A new subscription payment has been made.',
//         description: `User ${(payment?.user as IUser)?.email} has successfully made a payment for their subscription. Payment ID: ${payment?._id}.`,
//         refference: payment?._id,
//         model_type: modeType?.Payment,
//       },
//     ]);

//     return payment;
//   } catch (error: any) {
//     // Step 3: Rollback changes if any error occurs
//     console.error('Error occurred:', error.message);

//     // Restore the original state of the documents if an error occurs
//     if (payment) {
//       await Payment.findByIdAndUpdate(paymentId, originalPayment);
//     }

//     if (oldSubscription) {
//       await Subscription.findByIdAndUpdate(
//         oldSubscription._id,
//         originalOldSubscription,
//       );
//     }

//     if (subscription) {
//       await Subscription.findByIdAndUpdate(
//         subscription._id,
//         originalSubscription,
//       );
//     }

//     // Rollback refund if needed
//     if (paymentIntentId) {
//       try {
//         await stripe.refunds.create({
//           payment_intent: paymentIntentId,
//         });
//       } catch (refundError: any) {
//         console.error('Error processing refund:', refundError.message);
//       }
//     }

//     throw new AppError(httpStatus.BAD_GATEWAY, error.message);
//   }

//   //   try {
//   //     session.startTransaction();

//   //     const payment = await Payment.findByIdAndUpdate(
//   //       paymentId,
//   //       { isPaid: true, paymentIntentId: paymentIntentId },
//   //       { new: true, session },
//   //     ).populate('user');

//   // console.log('payment', payment);

//   //     if (!payment) {
//   //       throw new AppError(httpStatus.NOT_FOUND, 'Payment Not Found!');
//   //     }

//   //     const oldSubscription = await Subscription.findOneAndUpdate(
//   //       {
//   //         user: payment?.user,
//   //         isPaid: true,
//   //         isExpired: false,
//   //       },
//   //       {
//   //         isExpired: true,
//   //       },
//   //       { upsert: false, session },
//   //     );
//   // console.log('oldSubscription', oldSubscription);
//   //     const subscription: ISubscriptions | null = await Subscription.findById(
//   //       payment?.subscription,
//   //     )
//   //       .populate('package')
//   //       .session(session);

//   //     if (!subscription) {
//   //       throw new AppError(httpStatus.NOT_FOUND, 'Subscription Not Found!');
//   //     }

//   //     let expiredAt;

//   //     if (
//   //       oldSubscription?.expiredAt &&
//   //       moment(oldSubscription.expiredAt).isAfter(moment())
//   //     ) {
//   //       const remainingTime = moment(oldSubscription.expiredAt).diff(moment());
//   //       expiredAt = moment().add(remainingTime, 'milliseconds');
//   //     } else {
//   //       expiredAt = moment();
//   //     }

//   //     if ((subscription?.package as IPackage)?.durationDay) {
//   //       expiredAt = expiredAt.add(
//   //         (subscription?.package as IPackage)?.durationDay,
//   //         'days',
//   //       );
//   //     }

//   //     expiredAt = expiredAt.toDate();

//   //     await Subscription.findByIdAndUpdate(
//   //       payment?.subscription,
//   //       {
//   //         isPaid: true,
//   //         trnId: payment?.tranId,
//   //       },
//   //       {
//   //         session,
//   //       },
//   //     ).populate('package');

//   //     // Update User with package values if applicable
//   //     const user = await User.findById(payment?.user).session(session);
//   // console.log('user', user);
//   //     if (!user) {
//   //       throw new AppError(httpStatus.NOT_FOUND, 'User Not Found!');
//   //     }

//   //     const packageDetails = subscription?.package as IPackage;
//   //     if (packageDetails) {
//   //       const { carCreateLimit, durationDay } = packageDetails;

//   //       user.carCreateLimit = (user.carCreateLimit || 0) + (carCreateLimit || 0);
//   //       user.durationDay = (user.durationDay || 0) + (durationDay || 0);

//   //       await user.save({ session });
//   //     }
//   //     console.log('packageDetails', packageDetails);

//   //     await Package.findByIdAndUpdate(
//   //       packageDetails?._id,
//   //       {
//   //         $inc: { popularity: 1 },
//   //       },
//   //       { upsert: false, new: true, session },
//   //     );

//   //     const admin = await User.findOne({ role: USER_ROLE.admin });

//   //     await Notification.create(
//   //       [
//   //         {
//   //           receiver: (payment?.user as IUser)?._id,
//   //           message: 'Your subscription payment was successful!',
//   //           description: `Your payment with ID ${payment._id} has been processed successfully. Thank you for subscribing!`,
//   //           refference: payment?._id,
//   //           model_type: modeType?.Payment,
//   //         },
//   //         {
//   //           receiver: admin?._id,
//   //           message: 'A new subscription payment has been made.',
//   //           description: `User ${(payment.user as IUser)?.email} has successfully made a payment for their subscription. Payment ID: ${payment._id}.`,
//   //           refference: payment?._id,
//   //           model_type: modeType?.Payment,
//   //         },
//   //       ],
//   //       { session },
//   //     );

//   //     await session.commitTransaction();
//   //     return payment;
//   //   } catch (error: any) {
//   //     await session.abortTransaction();

//   //     if (paymentIntentId) {
//   //       try {
//   //         await stripe.refunds.create({
//   //           payment_intent: paymentIntentId,
//   //         });
//   //       } catch (refundError: any) {
//   //         console.error('Error processing refund:', refundError.message);
//   //       }
//   //     };

//   //     throw new AppError(httpStatus.BAD_GATEWAY, error.message);
//   //   } finally {
//   //     session.endSession();
//   //   }
// };

const confirmPayment = async (query: Record<string, any>) => {
  const { sessionId, paymentId } = query;

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const paymentIntentId = session.payment_intent as string;

  if (session.status !== 'complete') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Payment session is not completed',
    );
  }

  const payment = await Payment.findById(paymentId).populate('user');
  if (!payment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found!');
  }

  const order = await orderFuel.findById(payment.orderFuelId);
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found!');
  }

  try {
    // Update payment
    payment.isPaid = true;
    payment.paymentIntentId = paymentIntentId;
    await payment.save();

    // Update orderFuel status
    order.isPaid = true;
    order.paymentId = payment._id;
    order.finalAmountOfPayment = payment.amount;
    await order.save();

    // Notify user
    // const admin = await User.findOne({ role: USER_ROLE.admin });
    // await Notification.create([
    //   {
    //     receiver: payment.user._id,
    //     message: 'Your fuel order payment was successful!',
    //     description: `Payment ID: ${payment._id} for your fuel order has been confirmed.`,
    //     refference: payment._id,
    //     model_type: modeType.Payment,
    //   },
    //   {
    //     receiver: admin?._id,
    //     message: 'New fuel order payment received.',
    //     description: `User ${(payment.user as IUser)?.email} completed a fuel order payment.`,
    //     refference: payment._id,
    //     model_type: modeType.Payment,
    //   },
    // ]);

    return payment;
  } catch (error: any) {
    // Handle error and rollback refund
    if (paymentIntentId) {
      try {
        await stripe.refunds.create({ payment_intent: paymentIntentId });
      } catch (refundError) {
        console.error('Refund failed:');
      }
    }

    throw new AppError(httpStatus.BAD_GATEWAY, error.message);
  }
};

const getEarnings = async () => {
  const today = moment().startOf('day');

  const earnings = await Payment.aggregate([
    {
      $match: {
        isPaid: true,
      },
    },
    {
      $facet: {
        totalEarnings: [
          {
            $group: {
              _id: null,
              total: { $sum: '$amount' },
            },
          },
        ],
        todayEarnings: [
          {
            $match: {
              isDeleted: false,
              createdAt: {
                $gte: today.toDate(),
                $lte: today.endOf('day').toDate(),
              },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$amount' }, // Sum of today's earnings
            },
          },
        ],
        allData: [
          {
            $lookup: {
              from: 'users',
              localField: 'user',
              foreignField: '_id',
              as: 'userDetails',
            },
          },
          {
            $lookup: {
              from: 'subscriptions',
              localField: 'subscription',
              foreignField: '_id',
              as: 'subscriptionDetails',
            },
          },
          {
            $unwind: {
              path: '$subscriptionDetails',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: 'packages', // Name of the package collection
              localField: 'subscriptionDetails.package', // Field in the subscription referring to package
              foreignField: '_id', // Field in the package collection
              as: 'packageDetails',
            },
          },
          {
            $project: {
              user: { $arrayElemAt: ['$userDetails', 0] }, // Extract first user if multiple exist
              subscription: '$subscriptionDetails', // Already an object, no need for $arrayElemAt
              package: { $arrayElemAt: ['$packageDetails', 0] }, // Extract first package
              amount: 1,
              tranId: 1,
              status: 1,
              isPaid: 1,
              id: 1,
              _id: 1,
              createdAt: 1,
              updatedAt: 1,
            },
          },
          {
            $sort: {
              createdAt: -1,
            },
          },
        ],
      },
    },
  ]);

  const totalEarnings =
    (earnings?.length > 0 &&
      earnings[0]?.totalEarnings?.length > 0 &&
      earnings[0]?.totalEarnings[0]?.total.toFixed(2)) ||
    0;
  const todayEarnings =
    (earnings?.length > 0 &&
      earnings[0]?.todayEarnings?.length > 0 &&
      earnings[0]?.todayEarnings[0]?.total.toFixed(2)) ||
    0;

  const allData = earnings[0]?.allData || [];

  return { totalEarnings, todayEarnings, allData };
};

// const dashboardData = async (query: Record<string, any>) => {
//   const usersData = await User.aggregate([
//     {
//       $facet: {
//         totalUsers: [{ $match: { status: 'active' } }, { $count: 'count' }],
//         userDetails: [
//           { $match: { role: { $ne: USER_ROLE.admin } } },
//           {
//             $project: {
//               _id: 1,
//               name: 1,
//               email: 1,
//               coin: 1,
//               role: 1,
//               referenceId: 1,
//               createdAt: 1,
//             },
//           },
//           {
//             $sort: { createdAt: -1 },
//           },
//           {
//             $limit: 15,
//           },
//         ],
//       },
//     },
//   ]);

//   // const today = moment().startOf('day');

//   // Calculate today's income
//   const earnings = await Payment.aggregate([
//     {
//       $match: {
//         isPaid: true,
//       },
//     },
//     {
//       $facet: {
//         totalEarnings: [
//           {
//             $group: {
//               _id: null,
//               total: { $sum: '$amount' },
//             },
//           },
//         ],
//         allData: [
//           {
//             $lookup: {
//               from: 'users',
//               localField: 'user',
//               foreignField: '_id',
//               as: 'userDetails',
//             },
//           },
//           {
//             $lookup: {
//               from: 'subscription',
//               localField: 'subscription',
//               foreignField: '_id',
//               as: 'subscription',
//             },
//           },
//           {
//             $project: {
//               user: { $arrayElemAt: ['$userDetails', 0] },
//               subscription: { $arrayElemAt: ['$subscription', 0] },
//               amount: 1,
//               tranId: 1,
//               status: 1,
//               id: 1,
//               createdAt: 1,
//               updatedAt: 1,
//             },
//           },
//           {
//             $sort: { createdAt: -1 },
//           },
//           {
//             $limit: 10,
//           },
//         ],
//       },
//     },
//   ]);

//   const totalEarnings =
//     (earnings?.length > 0 &&
//       earnings[0]?.totalEarnings?.length > 0 &&
//       earnings[0]?.totalEarnings[0]?.total) ||
//     0;

//   const totalCustomer = await User.countDocuments({ role: USER_ROLE?.user });
//   const totalServiceProvider = await User.countDocuments({
//     role: USER_ROLE?.dealer,
//   });

//   const transitionData = earnings[0]?.allData || [];

//   // Calculate monthly income
//   const year = query.incomeYear ? query.incomeYear : moment().year();
//   const startOfYear = moment().year(year).startOf('year');
//   const endOfYear = moment().year(year).endOf('year');

//   const monthlyIncome = await Payment.aggregate([
//     {
//       $match: {
//         isPaid: true,
//         createdAt: {
//           $gte: startOfYear.toDate(),
//           $lte: endOfYear.toDate(),
//         },
//       },
//     },
//     {
//       $group: {
//         _id: { month: { $month: '$createdAt' } },
//         income: { $sum: '$amount' },
//       },
//     },
//     {
//       $sort: { '_id.month': 1 },
//     },
//   ]);

//   // Format monthly income to have an entry for each month
//   const formattedMonthlyIncome = Array.from({ length: 12 }, (_, index) => ({
//     month: moment().month(index).format('MMM'),
//     income: 0,
//   }));

//   monthlyIncome.forEach(entry => {
//     formattedMonthlyIncome[entry._id.month - 1].income = Math.round(
//       entry.income,
//     );
//   });

//   // Calculate monthly income
//   // JoinYear: '2022', role: ''
//   const userYear = query?.JoinYear ? query?.JoinYear : moment().year();
//   const startOfUserYear = moment().year(userYear).startOf('year');
//   const endOfUserYear = moment().year(userYear).endOf('year');

//   const monthlyUser = await User.aggregate([
//     {
//       $match: {
//         status: 'active',
//         createdAt: {
//           $gte: startOfUserYear.toDate(),
//           $lte: endOfUserYear.toDate(),
//         },
//       },
//     },
//     {
//       $group: {
//         _id: { month: { $month: '$createdAt' } },
//         total: { $sum: 1 }, // Corrected to count the documents
//       },
//     },
//     {
//       $sort: { '_id.month': 1 },
//     },
//   ]);

//   // Format monthly income to have an entry for each month
//   const formattedMonthlyUsers = Array.from({ length: 12 }, (_, index) => ({
//     month: moment().month(index).format('MMM'),
//     total: 0,
//   }));

//   monthlyUser.forEach(entry => {
//     formattedMonthlyUsers[entry._id.month - 1].total = Math.round(entry.total);
//   });

//   return {
//     totalUsers: usersData[0]?.totalUsers[0]?.count || 0,
//     totalCustomer,
//     totalServiceProvider,
//     transitionData,
//     totalIncome: totalEarnings,

//     // toDayIncome: todayEarnings,

//     monthlyIncome: formattedMonthlyIncome,
//     monthlyUsers: formattedMonthlyUsers,
//     userDetails: usersData[0]?.userDetails,
//   };
// };

const dashboardData = async (query: Record<string, any>) => {
  // Query for totalUsers and userDetails separately
  const totalUsers = await User.aggregate([
    { $match: { status: 'active' } },
    { $count: 'count' },
  ]);

  const userDetails = await User.aggregate([
    { $match: { role: { $ne: USER_ROLE.admin } } },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        coin: 1,
        role: 1,
        referenceId: 1,
        createdAt: 1,
      },
    },
    { $sort: { createdAt: -1 } },
    { $limit: 15 },
  ]);

  // Calculate today's earnings
  const earnings = await Payment.aggregate([
    { $match: { isPaid: true } },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'userDetails',
      },
    },
    {
      $lookup: {
        from: 'subscription',
        localField: 'subscription',
        foreignField: '_id',
        as: 'subscription',
      },
    },
    {
      $project: {
        user: { $arrayElemAt: ['$userDetails', 0] },
        subscription: { $arrayElemAt: ['$subscription', 0] },
        amount: 1,
        tranId: 1,
        status: 1,
        id: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
    { $sort: { createdAt: -1 } },
    { $limit: 10 },
  ]);

  const totalEarnings =
    (earnings?.length > 0 &&
      earnings[0]?.totalEarnings?.length > 0 &&
      earnings[0]?.totalEarnings[0]?.total) ||
    0;

  const totalCustomer = await User.countDocuments({ role: USER_ROLE?.user });
  const totalServiceProvider = await User.countDocuments({
    role: USER_ROLE?.user,
  });

  const transitionData = earnings || [];

  // Calculate monthly income
  const year = query.incomeYear ? query.incomeYear : moment().year();
  const startOfYear = moment().year(year).startOf('year');
  const endOfYear = moment().year(year).endOf('year');

  const monthlyIncome = await Payment.aggregate([
    {
      $match: {
        isPaid: true,
        createdAt: {
          $gte: startOfYear.toDate(),
          $lte: endOfYear.toDate(),
        },
      },
    },
    {
      $group: {
        _id: { month: { $month: '$createdAt' } },
        income: { $sum: '$amount' },
      },
    },
    { $sort: { '_id.month': 1 } },
  ]);

  // Format monthly income to have an entry for each month
  const formattedMonthlyIncome = Array.from({ length: 12 }, (_, index) => ({
    month: moment().month(index).format('MMM'),
    income: 0,
  }));

  monthlyIncome.forEach(entry => {
    formattedMonthlyIncome[entry._id.month - 1].income = Math.round(
      entry.income,
    );
  });

  // Calculate monthly user registrations
  const userYear = query?.JoinYear ? query?.JoinYear : moment().year();
  const startOfUserYear = moment().year(userYear).startOf('year');
  const endOfUserYear = moment().year(userYear).endOf('year');

  const monthlyUser = await User.aggregate([
    {
      $match: {
        status: 'active',
        createdAt: {
          $gte: startOfUserYear.toDate(),
          $lte: endOfUserYear.toDate(),
        },
      },
    },
    {
      $group: {
        _id: { month: { $month: '$createdAt' } },
        total: { $sum: 1 }, // Corrected to count the documents
      },
    },
    { $sort: { '_id.month': 1 } },
  ]);

  // Format monthly users to have an entry for each month
  const formattedMonthlyUsers = Array.from({ length: 12 }, (_, index) => ({
    month: moment().month(index).format('MMM'),
    total: 0,
  }));

  monthlyUser.forEach(entry => {
    formattedMonthlyUsers[entry._id.month - 1].total = Math.round(entry.total);
  });

  return {
    totalUsers: totalUsers[0]?.count || 0,
    totalCustomer,
    totalServiceProvider,
    transitionData,
    totalIncome: totalEarnings,
    monthlyIncome: formattedMonthlyIncome,
    monthlyUsers: formattedMonthlyUsers,
    userDetails,
  };
};

const getAllPayments = async (year: string, month: string) => {
  // Ensure that year and month are valid numbers
  const parsedYear = Number(year);
  const parsedMonth = Number(month);

  if (
    isNaN(parsedYear) ||
    isNaN(parsedMonth) ||
    parsedMonth < 0 ||
    parsedMonth > 11
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid year or month');
  }

  console.log('Parsed year:', parsedYear, 'Parsed month:', parsedMonth); // Debugging logs

  const startDate = new Date(parsedYear, parsedMonth, 1); // Start of the given month
  const endDate = new Date(parsedYear, parsedMonth + 1, 1); // Start of the next month

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid date range');
  }

  const result = await Payment.find({
    isPaid: true,
    createdAt: { $gte: startDate, $lt: endDate }, // Payments within the month
  }).populate('user');

  return result;
};

const getPaymentsByUserId = async (
  userId: string,
  query: Record<string, any>,
) => {
  const paymentQueryBuilder = new QueryBuilder(
    Payment.find({ user: userId, isPaid: true })
      .populate({
        path: 'subscription',
        populate: { path: 'package' },
      })
      .populate('user'),
    query,
  )
    .search(['paymentStatus', 'transactionId', 'subscription.name'])
    .filter()
    .paginate()
    .sort();

  const data: any = await paymentQueryBuilder.modelQuery;
  const meta = await paymentQueryBuilder.countTotal();

  // if (!data || data.length === 0) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'No payments found for the user');
  // }

  return {
    data,
    meta,
  };
};

// Get a payment by ID
const getPaymentsById = async (id: string) => {
  const payment = await Payment.findById(id);
  if (!payment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  return payment;
};

// Update a payment by ID
const updatePayments = async (id: string, updatedData: IPayment) => {
  const updatedPayment = await Payment.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  if (!updatedPayment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found to update');
  }
  return updatedPayment;
};

// Delete a payment by ID
const deletePayments = async (id: string) => {
  const deletedPayment = await Payment.findByIdAndDelete(id);
  if (!deletedPayment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Payment not found to delete');
  }
  return deletedPayment;
};

// const generateInvoice = async (payload: any) => {
//   const existingInvoice = await invoice
//     .findOne({ paymentId: payload })
//     .populate([
//       {
//         path: 'paymentId',
//         populate: [
//           {
//             path: 'user',
//           },
//           {
//             path: 'subscription',
//             populate: { path: 'package', model: 'Package' },
//           },
//         ],
//       },
//     ]);
//   if (existingInvoice) {
//     return existingInvoice;
//   }
//   const payment = await Payment.findById(payload)
//     .populate({
//       path: 'user',
//       model: User,
//       strictPopulate: false,
//     })
//     .populate({
//       path: 'subscription',
//       model: Subscription,
//       strictPopulate: false,
//       populate: {
//         path: 'package',
//         model: 'Package',
//       },
//     });
//   if (!payment) {
//     throw new Error('Payment not found');
//   }
//   const users = payment.user as IUser;
//   // if (users.vat_status !== 'valid') {
//   //   throw new Error('VAT status is not valid for the user');
//   // }
//   const vatAmount = users.vat_type === 'Romania' ? 0.19 : 0;

//   const packageAmount =
//     ((payment.subscription as ISubscriptions).package as IPackage)?.price || 0;
//   const totalAmount = packageAmount * (1 + vatAmount);
//   const invoiceNumber = `INV-${Date.now()}`;
//   const invoiceDate = new Date();
//   const invoices = new invoice({
//     paymentId: payment._id,
//     invoiceNumber,
//     invoiceDate,
//     totalAmount: totalAmount.toFixed(2), // Store total amount as a string
//   });

//   const result = await (
//     await invoice.create(invoices)
//   ).populate([
//     {
//       path: 'paymentId',
//       populate: [
//         {
//           path: 'user',
//           select: 'name phoneNumber companyName dealership vat_type vat_status',
//         },
//         { path: 'subscription', populate: { path: 'package' } },
//       ],
//     },
//   ]);
//   // Respond with the invoice details
//   return result;
// };

export const paymentsService = {
  // createPayments,
  getAllPayments,
  getPaymentsById,
  updatePayments,
  deletePayments,
  checkout,
  confirmPayment,
  dashboardData,
  getEarnings,
  getPaymentsByUserId,
  // generateInvoice,
};
