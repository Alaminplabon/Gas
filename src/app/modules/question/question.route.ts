// src/modules/question/question.routes.ts

import { Router } from 'express';
import { questionController } from './question.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post('/create', questionController.createquestion);
router.patch('/update/:id', questionController.updatequestion);
router.delete('/:id', questionController.deletequestion);
router.get('/:id', questionController.getquestionById);
router.get('/', questionController.getAllquestion);

export const questionRoutes = router;
