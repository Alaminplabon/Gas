import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { IPackage } from './packages.interface';
import Package from './packages.models';
import QueryBuilder from '../../builder/QueryBuilder';

const createPackages = async (payload: IPackage) => {
  const packageCount = await Package.countDocuments();

  if (packageCount >= 2) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Cannot create more than 2 packages.',
    );
  }

  const packages = await Package.create(payload);

  if (!packages) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create package.',
    );
  }
  return packages;
};

const getAllPackages = async (query: Record<string, any>) => {
  const packagesModel = new QueryBuilder(Package.find(), query)
    .search(['title'])
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await packagesModel.modelQuery;
  const meta = await packagesModel.countTotal();
  return {
    data,
    meta,
  };
};

const getPackagesById = async (id: string) => {
  const result = await Package.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Packages not found');
  }
  return result;
};

const updatePackages = async (id: string, payload: Partial<IPackage>) => {
  const packages = await Package.findByIdAndUpdate(id, payload, { new: true });
  if (!packages) {
    throw new AppError(httpStatus.NOT_FOUND, 'Packages not found');
  }
  return packages;
};

const deletePackages = async (id: string) => {
  const result = await Package.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true },
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Packages Delete failed');
  }
  return result;
};

export const packagesService = {
  createPackages,
  getAllPackages,
  getPackagesById,
  updatePackages,
  deletePackages,
};
