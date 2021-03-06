import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { createConnection } from 'typeorm';
import routes from './routes';
import cors from 'cors';
import AppError from '../../shared/errors/AppError';

createConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message
      });
    }
    
    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
);

export { app };
