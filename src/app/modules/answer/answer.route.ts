import { Router } from 'express';
import { answerController } from './answer.controller';

const router = Router();

router.post('/create-answer', answerController.createanswer);

router.patch('/update/:id', answerController.updateanswer);

router.delete('/:id', answerController.deleteanswer);

router.get('/:id', answerController.getanswer);
router.get('/', answerController.getanswer);

export const answerRoutes = router;