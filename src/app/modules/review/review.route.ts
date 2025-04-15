import { Router } from 'express';
import { reviewController } from './review.controller';

const router = Router();

router.post('/create', reviewController.createreview);

router.patch('/update/:id', reviewController.updatereview);

router.delete('/:id', reviewController.deletereview);

router.get('/:id', reviewController.getreviewById);
router.get('/', reviewController.getAllreview);

export const reviewRoutes = router;
