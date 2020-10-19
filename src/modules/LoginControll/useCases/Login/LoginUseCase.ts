import { ILoginRequestDTO, ILoginResponseDTO } from './LoginDTO';
import { IUsersRepository } from '../../../userManagement/repositories/IUsersRepository';
import { IAuthentication } from '../../../security/interfaces/IAuthentication';
import AppError from '../../../../errors/AppError';
import { IHashProvider } from '../../../security/interfaces/IHashProvider';
export class LoginUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private authentication: IAuthentication,
    private hashProvider: IHashProvider,
  ) {}

  async execute(data: ILoginRequestDTO): Promise<ILoginResponseDTO> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError('Email or password does`t match');
    }

    const matchedPassword = await this.hashProvider.compareHash(data.password, user.password);

    if (!matchedPassword) {
      throw new AppError('Email or password does`t match');
    }

    const token = this.authentication.generateToken({}, '1d', user?.id);

    return {
      user: user,
      token: token
    } as ILoginResponseDTO;
  }
}
