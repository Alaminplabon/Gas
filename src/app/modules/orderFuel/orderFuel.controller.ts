import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderFuelService } from './orderFuel.service';

const createorderFuel = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;
  req.body.userId = userId;
  const result = await orderFuelService.createorderFuel(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getActiveOrderFuel = catchAsync(async (req: Request, res: Response) => {
  const result = await orderFuelService.getActiveOrderFuel(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Active orders retrieved successfully',
    data: result,
  });
});

const getAllorderFuel = catchAsync(async (req: Request, res: Response) => {
  const result = await orderFuelService.getAllorderFuel(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const getInProgressorderFuel = catchAsync(
  async (req: Request, res: Response) => {
    const result = await orderFuelService.getInProgressorderFuel(req.query);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Orders retrieved successfully',
      data: result,
    });
  },
);

const getDeliveredorderFuel = catchAsync(
  async (req: Request, res: Response) => {
    const result = await orderFuelService.getAllorderFuel(req.query);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Orders retrieved successfully',
      data: result,
    });
  },
);

const getorderFuelById = catchAsync(async (req: Request, res: Response) => {
  const result = await orderFuelService.getorderFuelById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  });
});

const updateorderFuel = catchAsync(async (req: Request, res: Response) => {
  const result = await orderFuelService.updateorderFuel(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order updated successfully',
    data: result,
  });
});

const deleteorderFuel = catchAsync(async (req: Request, res: Response) => {
  const result = await orderFuelService.deleteorderFuel(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order deleted successfully',
    data: result,
  });
});

export const orderFuelController = {
  createorderFuel,
  getAllorderFuel,
  getorderFuelById,
  updateorderFuel,
  deleteorderFuel,
  getDeliveredorderFuel,
  getInProgressorderFuel,
  getActiveOrderFuel,
};
