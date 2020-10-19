import { Request, Response } from 'express';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  constructor(public createUserUseCase: CreateUserUseCase) {}

  async heandle(request: Request<ICreateUserRequestDTO>, response: Response) {
    await this.createUserUseCase.execute(request.body);
    return response.status(201).send();
  }
 
}
