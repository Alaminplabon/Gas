import { Router } from 'express';
import { privacyController } from './privacy.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

// Create Privacy
router.post('/create-privacy', privacyController.createprivacy);

// Update Privacy
router.patch('/update', auth(USER_ROLE.admin), privacyController.updateprivacy);

// Delete Privacy
// router.delete('/:id', privacyController.deleteprivacy);

// Get Privacy by ID
router.get('/:id', privacyController.getprivacyById);

// Get All Privacy
router.get('/', privacyController.getAllprivacy);

export const privacyRoutes = router;
