import { IUsersRepository } from '../../../userManagement/repositories/IUsersRepository';
import { ILoginRequestDTO } from './LoginDTO';
import { compare } from 'bcryptjs';
export class LoginUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({ email, password }: ILoginRequestDTO): Promise<void> {
    const user = this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Email or password does`t match');
    }

    const hasedPassword = await compare(password, user.password);
  }
}
