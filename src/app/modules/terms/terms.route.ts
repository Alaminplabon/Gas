import { Router } from 'express';
import { termsController } from './terms.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post('/create-terms', termsController.createterms);

router.patch('/update', auth(USER_ROLE.admin), termsController.updateterms);

router.delete('/:id', termsController.deleteterms);

router.get('/:id', termsController.gettermsById);
router.get('/', termsController.getAllterms);

export const termsRoutes = router;
