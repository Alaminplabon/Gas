// src/modules/services/services.service.ts

import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { IServices } from './services.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { Services } from './services.models';

const createservice = async (payload: IServices) => {
  const result = await Services.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create service');
  }
  return result;
};

const getAllservices = async (query: Record<string, any>) => {
  const queryBuilder = new QueryBuilder(Services.find(), query)
    .search(['serviceName'])
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await queryBuilder.modelQuery;
  const meta = await queryBuilder.countTotal();
  return { data, meta };
};

const getserviceById = async (id: string) => {
  const result = await Services.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }
  return result;
};

const updateservice = async (id: string, payload: Partial<IServices>) => {
  const result = await Services.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update service');
  }
  return result;
};

const deleteservice = async (id: string) => {
  const result = await Services.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete service');
  }
  return result;
};

export const servicesService = {
  createservice,
  getAllservices,
  getserviceById,
  updateservice,
  deleteservice,
};
