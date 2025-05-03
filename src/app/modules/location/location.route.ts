import { Router } from 'express';
import { locationController } from './location.controller';

const router = Router();

router.post('/create-location', locationController.createlocation);

router.patch('/update/:id', locationController.updatelocation);

router.delete('/:id', locationController.deletelocation);

// router.get('/:id', locationController.getlocation);
// router.get('/', locationController.getlocation);

export const locationRoutes = router;