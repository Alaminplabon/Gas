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
import { deliveryRoutes } from '../modules/delivery/delivery.route';
import { questionRoutes } from '../modules/question/question.route';
import { cityExpansionRoutes } from '../modules/cityExpansion/cityExpansion.route';
import businessOurRoutes from '../modules/businessOur/businessOur.routes';
import { servicesRoutes } from '../modules/services/services.route';
import { fuelInfoRoutes } from '../modules/fuelInfo/fuelInfo.route';
import { deliveryAndTipRoutes } from '../modules/deliveryAndTip/deliveryAndTip.route';
import { driverErningRoutes } from '../modules/driverErning/driverErning.route';

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
  {
    path: '/delivery',
    route: deliveryRoutes,
  },
  {
    path: '/questions',
    route: questionRoutes,
  },
  {
    path: '/cityExpansion',
    route: cityExpansionRoutes,
  },
  {
    path: '/business-ours',
    route: businessOurRoutes,
  },
  {
    path: '/services',
    route: servicesRoutes,
  },
  {
    path: '/cityExpansion',
    route: cityExpansionRoutes,
  },
  {
    path: '/fuelinfo',
    route: fuelInfoRoutes,
  },
  {
    path: '/deleveryAndtips',
    route: deliveryAndTipRoutes,
  },
  {
    path: '/driverearnings',
    route: driverErningRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
