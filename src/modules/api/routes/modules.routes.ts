import { Router } from 'express';
import ensureAuathenticated from '../../../shared/middleware/ensureAuthenticated';
import { createModuleController } from '../../marketPlace/useCases/CreateModule';

const moduleRoute = Router();


moduleRoute.post('/', ensureAuathenticated, createModuleController.handle.bind(createModuleController))

export { moduleRoute };
