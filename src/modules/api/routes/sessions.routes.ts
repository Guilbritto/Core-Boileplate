import { Router } from 'express';
import { forgotPasswordController } from '../../loginControll/useCases/ForgotPassword';
import { forgotPasswordChangeController } from '../../loginControll/useCases/forgotPasswordChange';
import { forgotPasswordValidateController } from '../../loginControll/useCases/ForgotPasswordValidate';
import { loginController } from '../../loginControll/useCases/Login';

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
sessionsRoute.patch(
  '/forgot/change',
  forgotPasswordChangeController.handle.bind(forgotPasswordChangeController)
);

export { sessionsRoute };
