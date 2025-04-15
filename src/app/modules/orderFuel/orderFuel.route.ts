import { Router } from 'express';
import { orderFuelController } from './orderFuel.controller';

const router = Router();

router.post('/create-orderFuel', orderFuelController.createorderFuel);

router.patch('/update/:id', orderFuelController.updateorderFuel);

router.delete('/:id', orderFuelController.deleteorderFuel);

router.get('/:id', orderFuelController.getorderFuelById);
router.get('/', orderFuelController.getAllorderFuel);

export const orderFuelRoutes = router;
