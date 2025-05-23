// src/modules/pushNotification/pushNotification.routes.ts
import { Router } from 'express';
import { pushNotificationController } from './pushNotification.controller';

const router = Router();

router.post(
  '/create-pushNotification',
  pushNotificationController.createPushNotification,
);
router.patch('/update/:id', pushNotificationController.updatePushNotification);
router.delete('/:id', pushNotificationController.deletePushNotification);
router.get('/:id', pushNotificationController.getPushNotificationById);
router.get('/', pushNotificationController.getAllPushNotifications);

export const pushNotificationRoutes = router;
