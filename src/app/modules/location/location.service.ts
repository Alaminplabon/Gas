import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { ILocation } from './location.interface';
import { Location } from './location.models';

const createlocation = async (payload: ILocation) => {
  const result = await Location.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create vehicle');
  }
  return result;
};
const getAlllocation = async () => {};
const getlocationById = async () => {};
const updatelocation = async () => {};
const deletelocation = async () => {};

export const locationService = {
  createlocation,
  getAlllocation,
  getlocationById,
  updatelocation,
  deletelocation,
};
