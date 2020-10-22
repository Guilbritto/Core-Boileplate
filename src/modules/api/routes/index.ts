import { Router } from 'express';
import { userRoute } from './user.routes';
import { sessionsRoute } from './sessions.routes';
import { moduleRoute } from './modules.routes';
const routes = Router();

  routes.use('/user', userRoute);
  routes.use('/sessions', sessionsRoute);
  routes.use('/module', moduleRoute);
  
export default routes;
