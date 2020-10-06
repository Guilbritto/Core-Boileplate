import { ILoginRequestDTO, ILoginResponseDTO } from './LoginDTO';
import { IUsersRepository } from '../../../userManagement/repositories/IUsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { IAuthentication } from '../../../security/interfaces/IAuthentication';
export class LoginUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private authentication: IAuthentication
  ) {}

  async execute(data: ILoginRequestDTO): Promise<ILoginResponseDTO> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error('Email or password does`t match');
    }

    const matchedPassword = compare(user.password, data.password);

    if (!matchedPassword) {
      throw new Error('Email or password does`t match');
    }

    const token = this.authentication.generateToken({}, '1d', user?.id);

    return {
      user: user,
      token: token
    } as ILoginResponseDTO;
  }
}
