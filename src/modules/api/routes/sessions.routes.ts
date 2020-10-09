import { Router } from 'express';
import { forgotPasswordController } from '../../LoginControll/useCases/ForgotPassword';
import { forgotPasswordValidateController } from '../../LoginControll/useCases/ForgotPasswordValidate';
import { loginController } from '../../LoginControll/useCases/Login';

const sessionsRoute = Router();

sessionsRoute.post('/', loginController.handle.bind(loginController));

sessionsRoute.post(
  '/forgot',
  forgotPasswordController.handle.bind(forgotPasswordController)
);
sessionsRoute.post(
  '/forgot/validate',
  forgotPasswordValidateController.handle.bind(forgotPasswordValidateController)
);

export { sessionsRoute };
