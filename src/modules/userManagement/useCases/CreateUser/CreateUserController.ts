import { Request, Response } from 'express';
import { IUserRequestDTO } from '../User/UserDTO';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  constructor(public createUserUseCase: CreateUserUseCase) {}

  async heandle(request: Request<IUserRequestDTO>, response: Response) {
    await this.createUserUseCase.execute(request.body);
    return response.status(201).send();
  }
 
}
