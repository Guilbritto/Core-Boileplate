import { Request, Response } from 'express';
import { FindByIdUserUseCase } from './FindByIdUserUseCase';

export class FindByIdUserController {
  constructor(public findByIduserUseCase: FindByIdUserUseCase) {}


  async handle(request: Request, response: Response) {
    const { id } = request.params;
    if (typeof id === 'string') {
      const user = await this.findByIduserUseCase.execute(id);
      return response.status(200).json(user);
    }
    return response.status(204).send();
  }
}
