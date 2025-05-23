import { Router } from 'express';
import { fuelInfoController } from './fuelInfo.controller';

const router = Router();

router.post('/create-fuelInfo', fuelInfoController.createfuelInfo);
router.patch('/update/:id', fuelInfoController.updatefuelInfo);
router.delete('/:id', fuelInfoController.deletefuelInfo);

// Fix: Use correct handlers
router.get('/:id', fuelInfoController.getfuelInfoById);
router.get('/', fuelInfoController.getAllfuelInfo);

export const fuelInfoRoutes = router;
