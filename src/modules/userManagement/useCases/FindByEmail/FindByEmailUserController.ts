import { Request, Response } from 'express';
import { FindByEmailUserUseCase } from './FindByEmailUserUseCase';

export class FindByEmailUserController {
  constructor(public findByEmailUserUseCase: FindByEmailUserUseCase) {}

  async handle(request: Request, response: Response) {
    const { email } = request.params;
    if (typeof email === 'string') {
      const user = await this.findByEmailUserUseCase.execute(email);
    }
  }
}
