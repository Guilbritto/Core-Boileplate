import { Router } from 'express';
import { loginController } from '../../LoginControll/useCases/Login';
import { userController } from '../../userManagement/useCases/User';

const sessionsRoute = Router();

sessionsRoute.post('/', loginController.handle.bind(loginController));

export { sessionsRoute };
