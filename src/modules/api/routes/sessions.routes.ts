import { Router } from 'express';
import { forgotPasswordController } from '../../LoginControll/useCases/ForgotPassword';
import { forgotPasswordChangeController } from '../../LoginControll/useCases/forgotPasswordChange';
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
sessionsRoute.patch(
  '/forgot/change',
  forgotPasswordChangeController.handle.bind(forgotPasswordChangeController)
);

export { sessionsRoute };
