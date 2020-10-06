import { Request, response, Response } from 'express';
import { IForgotPasswordRequest } from './ForgotPasswordDTO';
import { ForgotPasswordUseCase } from './ForgotPasswordUseCase';

export class ForgotPasswordController {
  constructor(private forgotPasswordUseCase: ForgotPasswordUseCase) {}

  async handle(request: Request<IForgotPasswordRequest>, response: Response) {
    try {
      const { email } = request.body;

      await this.forgotPasswordUseCase.execute(email);

      return response.status(200).send();
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }
}
