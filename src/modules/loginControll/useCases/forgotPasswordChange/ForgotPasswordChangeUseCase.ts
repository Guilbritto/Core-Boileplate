import { IUsersRepository } from '../../../userManagement/repositories/IUsersRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { IForgotPasswordChangeRequest } from './ForgotPasswordChangeDTO';
import { IHashProvider } from '../../../security/interfaces/IHashProvider';


export class ForgotPasswordChangeUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  async execute({code, email, password}: IForgotPasswordChangeRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if(user?.forgot_code !== code){
      throw new AppError('Invalid Code!')
    }
    
    user.password = await this.hashProvider.generateHash(password);

    this.userRepository.update(user);
  }
}
