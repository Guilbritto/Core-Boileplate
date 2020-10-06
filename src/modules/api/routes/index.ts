import { Router } from 'express';
import { userRoute } from './user.routes';
import { sessionsRoute } from './sessions.routes';
const routes = Router();

routes.use('/user', userRoute);
routes.use('/sessions', sessionsRoute);

export default routes;
