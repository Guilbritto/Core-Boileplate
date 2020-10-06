import { Router } from 'express';
import { userController } from '../../userManagement/useCases/User';

const userRoute = Router();

userRoute.get('/', userController.getAllUsers.bind(userController));

userRoute.get('/:id', userController.getUserById.bind(userController));

userRoute.post('/', userController.createUser.bind(userController));

userRoute.post('/search', userController.getUserByEmail.bind(userController));

userRoute.put('/', userController.updateUser.bind(userController));

userRoute.delete('/:id', userController.removeUser.bind(userController));

export { userRoute };
