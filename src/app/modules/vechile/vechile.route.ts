import { Router } from 'express';
import { vechileController } from './vechile.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post('/create', auth(USER_ROLE.user), vechileController.createvechile);

router.patch('/update/:id', vechileController.updatevechile);
router.get(
  '/my-vehicles',
  auth(USER_ROLE.user),
  vechileController.getMyVechiles,
);

router.delete('/:id', vechileController.deletevechile);
router.get(
  '/my-vehicles',
  auth(USER_ROLE.user),
  vechileController.getvechileById,
);
router.get('/:id', vechileController.getvechileById);
router.get('/', vechileController.getAllvechile);

export const vechileRoutes = router;
