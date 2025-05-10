import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { paymentsService } from './payments.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import config from '../../config';

const checkout = catchAsync(async (req: Request, res: Response) => {
  req.body.user = req.user.userId;
  const result = await paymentsService.checkout(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'payment link get successful',
  });
});

const confirmPayment = catchAsync(async (req: Request, res: Response) => {
  console.log('req.query', req?.query);
  const results = await paymentsService.confirmPayment(req?.query);
  res.redirect(
    `${config.success_url}?subscriptionId=${results?.subscription}&paymentId=${results?._id}`,
  );

  // console.log('req.query.paymentId', req?.query);
  //   const result = await paymentsService.generateInvoice(req?.query.paymentId);
  //   sendResponse(res, {
  //     success: true,
  //     statusCode: httpStatus.OK,
  //     data: result,
  //     message: 'Payment retrieved successfully',
  //   });
});

const dashboardData = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentsService.dashboardData(req?.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'dashboard data successful',
  });
});
const getEarnings = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentsService.getEarnings();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'earnings data successful',
  });
});

const getPaymentsByUserId = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const result = await paymentsService.getPaymentsByUserId(userId, req.query);
  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Payment not found',
      data: {},
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Payment retrieved successfully',
  });
});

const getPaymentsByUserIdWithParams = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await paymentsService.getPaymentsByUserId(id, req.query);
    if (!result) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'Payment not found',
        data: {},
      });
    }
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
      message: 'Payment retrieved successfully',
    });
  },
);

const getAllPayments = catchAsync(async (req: Request, res: Response) => {
  const year = req.query.year as string;
  const month = req.query.month as string;
  console.log(year, month);
  const result = await paymentsService.getAllPayments(year, month); // Assume this service method exists
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'All payments retrieved successfully',
  });
});

const getPaymentsById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await paymentsService.getPaymentsById(id); // Assume this service method exists
  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Payment not found',
      data: {},
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Payment retrieved successfully',
  });
});

// const generateInvoice = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   // console.log(id);
//   const result = await paymentsService.generateInvoice(id);
//   if (!result) {
//     return sendResponse(res, {
//       success: false,
//       statusCode: httpStatus.NOT_FOUND,
//       message: 'Payment not found',
//       data: {},
//     });
//   }
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     data: result,
//     message: 'Payment retrieved successfully',
//   });
// });

const updatePayments = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const paymentData = req.body;
  const result = await paymentsService.updatePayments(id, paymentData); // Assume this service method exists
  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Payment not found',
      data: {},
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Payment updated successfully',
  });
});
const deletePayments = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await paymentsService.deletePayments(id);
  if (!result) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'Payment not found',
      data: {},
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.NO_CONTENT,
    message: 'Payment deleted successfully',
    data: result,
  });
});

export const paymentsController = {
  getAllPayments,
  getPaymentsById,
  updatePayments,
  deletePayments,
  confirmPayment,
  checkout,
  dashboardData,
  getEarnings,
  getPaymentsByUserId,
  getPaymentsByUserIdWithParams,
  // generateInvoice,
};
