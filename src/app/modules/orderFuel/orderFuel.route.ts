import { Router } from 'express';
import { orderFuelController } from './orderFuel.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post(
  '/create-orderFuel',
  auth(USER_ROLE.user),
  orderFuelController.createorderFuel,
);

router.patch('/update/:id', orderFuelController.updateorderFuel);
router.get('/driver',auth(USER_ROLE.driver), orderFuelController.getorderFuelByDriverId);
router.delete('/:id', orderFuelController.deleteorderFuel);

router.get('/active', orderFuelController.getActiveOrderFuel);
router.get('/in-progress', orderFuelController.getInProgressorderFuel);
router.get('/delivered', orderFuelController.getDeliveredorderFuel);

router.get('/:id', orderFuelController.getorderFuelById);
router.get('/', orderFuelController.getAllorderFuel);

export const orderFuelRoutes = router;
