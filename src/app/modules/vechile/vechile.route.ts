import { Router } from 'express';
import { vechileController } from './vechile.controller';

const router = Router();

router.post('/create', vechileController.createvechile);

router.patch('/update/:id', vechileController.updatevechile);

router.delete('/:id', vechileController.deletevechile);

router.get('/:id', vechileController.getvechileById);
router.get('/', vechileController.getAllvechile);

export const vechileRoutes = router;
