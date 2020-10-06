import { Request, Response } from 'express';
import { ILoginRequestDTO } from './LoginDTO';
import { LoginUseCase } from './LoginUseCase';

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(request: Request<ILoginRequestDTO>, response: Response) {
    try {
      const user = await this.loginUseCase.execute(request.body);
    } catch (err) {
      response.status(400).json({ message: err.message });
    }
  }
}
