import { Router } from 'express';
import { userController } from '../../userManagement/useCases/User';

const sessionsRoute = Router();

sessionsRoute.post(
  '/search',
  userController.getUserByEmail.bind(userController)
);

export { sessionsRoute };
