import { Router } from 'express';
import { paymentsController } from './payments.controller';
import { USER_ROLE } from '../user/user.constants';
import auth from '../../middleware/auth';

const router = Router();

router.post('/checkout', auth(USER_ROLE.user), paymentsController.checkout);
router.get('/confirm-payment', paymentsController.confirmPayment);

router.get(
  '/userpayment',
  auth(USER_ROLE.user, USER_ROLE.admin),
  paymentsController.getPaymentsByUserId,
);

router.get(
  '/paymentbyuserId/:id',
  auth(USER_ROLE.admin),
  paymentsController.getPaymentsByUserIdWithParams,
);

// router.get('/invoices/:id', paymentsController.generateInvoice);

router.get(
  '/dashboard-data',
  auth(USER_ROLE.admin, USER_ROLE.user),
  paymentsController.dashboardData,
);
router.get('/earnings', auth(USER_ROLE.admin), paymentsController.getEarnings);
// router.get('/dashboard-data', paymentsController.);
// router.post('/', paymentsController.createPayments);

router.patch('/:id', auth(USER_ROLE.admin), paymentsController.updatePayments);

router.delete('/:id', auth(USER_ROLE.admin), paymentsController.deletePayments);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  paymentsController.getPaymentsById,
);
router.get('/', auth(USER_ROLE.admin), paymentsController.getAllPayments);
router.post('/', auth(USER_ROLE.admin), paymentsController.getAllPayments);

export const paymentsRoutes = router;
