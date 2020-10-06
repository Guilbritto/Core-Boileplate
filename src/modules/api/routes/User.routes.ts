import { Router } from 'express';
import { userController } from '../../userManagement/useCases/User';

const userRoute = Router();

userRoute.get('/', userController.getUsers.bind(userController));

userRoute.post('/', userController.createUser.bind(userController));

userRoute.delete('/:id', userController.removeUser.bind(userController));

export { userRoute };
