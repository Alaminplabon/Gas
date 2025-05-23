import { TBusinessOur } from './businessOur.interface';
import { BusinessHour } from './businessOur.model';

const updateBusinessOur = async (
  userType: 'subscriber' | 'nonSubscriber',
  payload: TBusinessOur,
) => {
  payload.userType = userType;
  const result = await BusinessHour.findOneAndUpdate({ userType }, payload, {
    upsert: true,
  });
  return result;
};

const getBusinessHours = async () => {
  const businessHours = await BusinessHour.find();
  return businessHours;
};

const getSingleBusinessHour = async (id: string) => {
  const businessHour = await BusinessHour.findById(id);
  return businessHour;
};

export const businessOurServices = {
  updateBusinessOur,
  getBusinessHours,
  getSingleBusinessHour,
};
