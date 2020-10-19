import { Router } from 'express';
import ensureAuathenticated from '../../../shared/middleware/ensureAuthenticated';
import { findAllUserController } from '../../userManagement/useCases/FindAll';
import { createUserController } from '../../userManagement/useCases/CreateUser';
import { findByIdUserController } from '../../userManagement/useCases/FindById';
import { removeUserController } from '../../userManagement/useCases/RemoveUser';
import { updateUserController } from '../../userManagement/useCases/UpdateUser';
import { findByEmailUserController } from '../../userManagement/useCases/FindByEmail';

const userRoute = Router();


userRoute.get('/', ensureAuathenticated, findAllUserController.handle.bind(findAllUserController));

userRoute.post('/', createUserController.heandle.bind(createUserController));

userRoute.get('/:id', ensureAuathenticated,  findByIdUserController.handle.bind(findByIdUserController));

userRoute.post('/search', ensureAuathenticated, findByEmailUserController.handle.bind(findByEmailUserController));

userRoute.put('/', ensureAuathenticated, updateUserController.handle.bind(updateUserController));

userRoute.delete('/:id', ensureAuathenticated, removeUserController.handle.bind(removeUserController));

export { userRoute };
