import { Request, Response } from 'express';
import { IApplictionDefaultError } from '../../../../interface/IApplicationDefaultError';
import { ILoginRequestDTO, ILoginResponseDTO } from './LoginDTO';
import { LoginUseCase } from './LoginUseCase';

export class LoginController {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(
    request: Request<ILoginRequestDTO>,
    response: Response<ILoginResponseDTO | IApplictionDefaultError>
  ) {
    const user = await this.loginUseCase.execute(request.body);
    
    return response.status(200).json(user);
  }
}
