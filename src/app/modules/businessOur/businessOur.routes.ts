import { Router } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';
import validateRequest from '../../middleware/validateRequest';
import { businessHourZodSchema } from './businessOur.validation';
import { businessOurControllers } from './businessOur.controller';

const businessOurRoutes = Router();

businessOurRoutes.put(
  '/:userType',
  //   auth(USER_ROLE.admin),
  //   validateRequest(businessHourZodSchema),
  businessOurControllers.updateBusinessOur,
);
businessOurRoutes.get(
  '/',
  // auth(USER_ROLE.admin),
  businessOurControllers.getBusinessHours,
);
businessOurRoutes.get(
  '/:id',
  // auth(USER_ROLE.admin),
  businessOurControllers.getSingleBusinessHour,
);

export default businessOurRoutes;
