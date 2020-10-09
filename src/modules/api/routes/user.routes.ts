import { Router } from 'express';
import ensureAuathenticated from '../../../middleware/ensureAuthenticated';
import { userController } from '../../userManagement/useCases/User';

const userRoute = Router();


userRoute.get('/', ensureAuathenticated, userController.getAllUsers.bind(userController));

userRoute.post('/', userController.createUser.bind(userController));

userRoute.get('/:id', ensureAuathenticated,  userController.getUserById.bind(userController));

userRoute.post('/search', ensureAuathenticated, userController.getUserByEmail.bind(userController));

userRoute.put('/', ensureAuathenticated, userController.updateUser.bind(userController));

userRoute.delete('/:id', ensureAuathenticated, userController.removeUser.bind(userController));

export { userRoute };
