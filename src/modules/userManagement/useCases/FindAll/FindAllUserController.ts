import { Request, Response } from 'express';
import { FindAllUserUseCase } from './FindAllUserUseCase';

export class FindAllUserController {
  constructor(public findAllUserUseCase: FindAllUserUseCase) {}

  async handle(request: Request, response: Response) {
    const users = await this.findAllUserUseCase.execute();
    return response.status(200).json(users);
  }
}
