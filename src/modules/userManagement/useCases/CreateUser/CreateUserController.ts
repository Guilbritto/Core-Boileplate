import { Request, Response } from 'express';
import { CreateUseruseCase } from './CreateUserUseCase';

export class CreateUserController {
  constructor(private createUserUseCase: CreateUseruseCase) {}
  handle(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;

      this.createUserUseCase.execute({ name, email, password });

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected Error'
      });
    }
  }
}
