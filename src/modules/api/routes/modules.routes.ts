import { Router } from 'express';
import ensureAuathenticated from '../../../shared/middleware/ensureAuthenticated';
import { createModuleController } from '../../marketPlace/useCases/CreateModule';
import { updateModuleController } from '../../marketPlace/useCases/UpdateModule';

const moduleRoute = Router();


moduleRoute.post('/', ensureAuathenticated, createModuleController.handle.bind(createModuleController))

moduleRoute.put('/', ensureAuathenticated, updateModuleController.handle.bind(updateModuleController))

export { moduleRoute };
