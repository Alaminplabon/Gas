import { Router } from 'express';
import { driverErningController } from './driverErning.controller';

const router = Router();

router.post('/create-driverErning', driverErningController.createdriverErning);

router.patch('/update/:id', driverErningController.updatedriverErning);

router.delete('/:id', driverErningController.deletedriverErning);

router.get('/:id', driverErningController.getdriverErning);
router.get('/', driverErningController.getdriverErning);

export const driverErningRoutes = router;