// src/modules/delivery/delivery.routes.ts
import { Router } from 'express';
import { deliveryController } from './delivery.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';
import parseData from '../../middleware/parseData';
import multer, { memoryStorage } from 'multer';

const router = Router();
const storage = memoryStorage();
const upload = multer({ storage });
router.post(
  '/create-delivery',
  auth(USER_ROLE.driver),
  deliveryController.createdelivery,
);

router.patch(
  '/update/:id',
  auth(USER_ROLE.driver),
  upload.single('proofImage'),
  parseData(),
  deliveryController.updatedelivery,
);

router.delete('/:id', auth(USER_ROLE.user), deliveryController.deletedelivery);

router.get('/:id', auth(USER_ROLE.user), deliveryController.getdeliveryById);

router.get('/', auth(USER_ROLE.user), deliveryController.getAlldelivery);

export const deliveryRoutes = router;
