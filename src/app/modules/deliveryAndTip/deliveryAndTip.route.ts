// src/modules/deliveryAndTip/deliveryAndTip.routes.ts
import { Router } from 'express';
import { deliveryAndTipController } from './deliveryAndTip.controller';

const router = Router();

router.post(
  '/create-deliveryAndTip',
  deliveryAndTipController.createDeliveryAndTip,
);
router.patch('/update/:id', deliveryAndTipController.updateDeliveryAndTip);
router.delete('/:id', deliveryAndTipController.deleteDeliveryAndTip);
router.get('/:id', deliveryAndTipController.getDeliveryAndTipById);
router.get('/', deliveryAndTipController.getAllDeliveryAndTip);

export const deliveryAndTipRoutes = router;
