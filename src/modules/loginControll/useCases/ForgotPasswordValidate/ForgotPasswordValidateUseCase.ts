import { IUsersRepository } from '../../../userManagement/repositories/IUsersRepository';
import { AppError } from '../../../../shared/errors/AppError';
export class ForgotPasswordValidateUseCase {
  constructor(
    private userRepository: IUsersRepository,
  ) {}

  async execute(email: string, code: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if(user?.forgot_code !== code){
      throw new AppError('Invalid Code!')
    }
    return true;
  }
}
