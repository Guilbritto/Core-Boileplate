import { Request, Response } from 'express';
import { UpdateUserUseCase } from './UpdateUserUseCase';

export class UpdateUserController {
  constructor(public updateUserUseCase: UpdateUserUseCase) {}

  async handle(request: Request, response: Response) {
    await this.updateUserUseCase.execute(request.body);
    return response.status(200).send();
  }
}
