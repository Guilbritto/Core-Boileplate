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

    const matchedPassword = await compare(password.old, user.password);

    if(!matchedPassword){
      throw new AppError('Old Password is wrong!')
    }

    if(user?.forgot_code !== code){
      throw new AppError('Invalid Code!')
    }
    
    user.password = await hash(password.new, 8);

    this.userRepository.update(user);
  }
}
