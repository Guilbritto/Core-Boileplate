import { Router } from 'express';
import { forgotPasswordController } from '../../LoginControll/useCases/ForgotPassword';
import { loginController } from '../../LoginControll/useCases/Login';
import { userController } from '../../userManagement/useCases/User';

const sessionsRoute = Router();

sessionsRoute.post('/', loginController.handle.bind(loginController));

sessionsRoute.post(
  '/forgot',
  forgotPasswordController.handle.bind(forgotPasswordController)
);

export { sessionsRoute };
