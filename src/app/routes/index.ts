import { Router } from 'express';
import { otpRoutes } from '../modules/otp/otp.routes';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { notificationRoutes } from '../modules/notification/notificaiton.route';
import { orderFuelRoutes } from '../modules/orderFuel/orderFuel.route';
import { vechileRoutes } from '../modules/vechile/vechile.route';
import { reviewRoutes } from '../modules/review/review.route';
import { paymentsRoutes } from '../modules/payments/payments.route';
import { locationRoutes } from '../modules/location/location.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/otp',
    route: otpRoutes,
  },
  {
    path: '/notifications',
    route: notificationRoutes,
  },
  {
    path: '/orders',
    route: orderFuelRoutes,
  },
  {
    path: '/vehicles',
    route: vechileRoutes,
  },
  {
    path: '/reviews',
    route: reviewRoutes,
  },
  {
    path: '/payments',
    route: paymentsRoutes,
  },
  {
    path: '/locations',
    route: locationRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
