import { Router } from 'express';
import { driverEarningController } from './driverErning.controller';

const router = Router();

router.post(
  '/create-driverErning',
  driverEarningController.createDriverEarning,
);

router.patch('/update/:id', driverEarningController.updateDriverEarning);

router.delete('/:id', driverEarningController.deleteDriverEarning);
router.get('/summary/:userId?', driverEarningController.getEarningsSummary);
router.get('/:id', driverEarningController.getDriverEarningById);
router.get('/', driverEarningController.getAllDriverEarnings);

export const driverErningRoutes = router;
