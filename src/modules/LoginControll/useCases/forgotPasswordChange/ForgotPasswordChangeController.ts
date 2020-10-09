import { Request, Response } from 'express';
import { IForgotPasswordChangeRequest } from './ForgotPasswordChangeDTO';
import { ForgotPasswordChangeUseCase } from './ForgotPasswordChangeUseCase';

export class ForgotPasswordChangeController {
  constructor(private forgotPasswordChangeUseCase: ForgotPasswordChangeUseCase) {}

  async handle(request: Request<IForgotPasswordChangeRequest>, response: Response) {
    const data = request.body;

    await this.forgotPasswordChangeUseCase.execute(data);

    return response.status(200).send();
  }
}
