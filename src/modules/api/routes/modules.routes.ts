import { Router } from 'express';
import ensureAuathenticated from '../../../shared/middleware/ensureAuthenticated';
import { createModuleController } from '../../marketPlace/useCases/CreateModule';
import { updateUserController } from '../../userManagement/useCases/UpdateUser';

const moduleRoute = Router();


moduleRoute.post('/', ensureAuathenticated, createModuleController.handle.bind(createModuleController))

moduleRoute.put('/', ensureAuathenticated, updateUserController.handle.bind(updateUserController))

export { moduleRoute };
