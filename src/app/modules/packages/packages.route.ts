import { Router } from 'express';
import { packagesController } from './packages.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';
import validateRequest from '../../middleware/validateRequest';
import { packageValidator } from './packages.validation';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(packageValidator.createPackageValidator),
  packagesController.createPackages,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(packageValidator.updatePackageValidator),
  packagesController.updatePackages,
);

router.delete('/:id', auth(USER_ROLE.admin), packagesController.deletePackages);

router.get('/:id', packagesController.getPackagesById);
router.get('/', packagesController.getAllPackages);

export const packagesRoutes = router;
