import { Router } from 'express';
import { userRoute } from './User.routes';

const routes = Router();

routes.use('/user', userRoute);

export default routes;
