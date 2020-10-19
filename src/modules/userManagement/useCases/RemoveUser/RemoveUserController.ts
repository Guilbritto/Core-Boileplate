import { Request, Response } from 'express';
import { RemoveUserUseCase } from './RemoveUserUseCase';

export class RemoveUserController {
  constructor(public RemoveUserUseCase: RemoveUserUseCase) {}

  async execute(request: Request, response: Response) {
    const { id } = request.params;
    if (typeof id === 'string') {
      await this.RemoveUserUseCase.handle(id);
    }
    response.status(200).send();
  }
}
