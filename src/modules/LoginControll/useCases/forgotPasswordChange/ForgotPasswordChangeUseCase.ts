import { IUsersRepository } from '../../../userManagement/repositories/IUsersRepository';
import AppError from '../../../../errors/AppError';
import { IForgotPasswordChangeRequest } from './ForgotPasswordChangeDTO';
import { compare, hash } from 'bcryptjs';


export class ForgotPasswordChangeUseCase {
  constructor(
    private userRepository: IUsersRepository,
  ) {}

  async execute({code, email, password}: IForgotPasswordChangeRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if(user?.forgot_code !== code){
      throw new AppError('Invalid Code!')
    }
    
    user.password = await hash(password, 8);

    this.userRepository.update(user);
  }
}
