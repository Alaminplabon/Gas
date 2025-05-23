import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { ICityExpansion } from './cityExpansion.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { CityExpansion } from './cityExpansion.models';

const createCityExpansion = async (payload: ICityExpansion) => {
  const result = await CityExpansion.create(payload);
  if (!result)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to create city expansion',
    );
  return result;
};

const getAllCityExpansions = async (query: Record<string, any>) => {
  const queryBuilder = new QueryBuilder(CityExpansion.find(), query)
    .search(['cityName', 'centralZipCode'])
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await queryBuilder.modelQuery;
  const meta = await queryBuilder.countTotal();
  return { data, meta };
};

const getCityExpansionById = async (id: string) => {
  const result = await CityExpansion.findById(id);
  if (!result)
    throw new AppError(httpStatus.NOT_FOUND, 'City expansion not found');
  return result;
};

const updateCityExpansion = async (
  id: string,
  payload: Partial<ICityExpansion>,
) => {
  const result = await CityExpansion.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!result)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to update city expansion',
    );
  return result;
};

const deleteCityExpansion = async (id: string) => {
  const result = await CityExpansion.findByIdAndDelete(id);
  if (!result)
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to delete city expansion',
    );
  return result;
};

export const cityExpansionService = {
  createCityExpansion,
  getAllCityExpansions,
  getCityExpansionById,
  updateCityExpansion,
  deleteCityExpansion,
};
