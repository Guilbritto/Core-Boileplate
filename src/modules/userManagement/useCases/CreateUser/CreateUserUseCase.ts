import { IMailProvider } from '../../../../shared/providers/IMailProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import AppError from '../../../../shared/errors/AppError';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { User } from '../../entities/User';
import { IHashProvider } from '../../../security/interfaces/IHashProvider';

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
    private hashProvider: IHashProvider
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new AppError('User already exists.');
    }

    const user = new User(data);

    user.password = await this.hashProvider.generateHash(user.password)
    
    this.usersRepository.save(user);

    this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: 'Pzm',
        email: 'pzmcore@pzmweb.com'
      },
      subject: 'PzmCore',
      body: 'ENVIO DE EMAIL TESTE'
    });
    
    return user;
  }
}
