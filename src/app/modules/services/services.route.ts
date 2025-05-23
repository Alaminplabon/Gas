// src/modules/services/services.routes.ts

import { Router } from 'express';
import { servicesController } from './services.controller';

const router = Router();

router.post('/create', servicesController.createservice);
router.get('/', servicesController.getAllservices);
router.get('/:id', servicesController.getserviceById);
router.patch('/:id', servicesController.updateservice);
router.delete('/:id', servicesController.deleteservice);

export const servicesRoutes = router;
