import { Request, Response } from 'express';
import { IForgotPasswordValidateRequest } from './ForgotPasswordValidateDTO';
import { ForgotPasswordValidateUseCase } from './ForgotPasswordValidateUseCase';

export class ForgotPasswordValidateController {
  constructor(private forgotPasswordValidateUseCase: ForgotPasswordValidateUseCase) {}

  async handle(request: Request<IForgotPasswordValidateRequest>, response: Response) {
    const { email, code } = request.body;

    const validate = await this.forgotPasswordValidateUseCase.execute(email, code);

    return response.status(200).json({validate: validate});
  }
}
