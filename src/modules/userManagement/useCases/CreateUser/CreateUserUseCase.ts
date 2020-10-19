import { IMailProvider } from '../../../../providers/IMailProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import AppError from '../../../../errors/AppError';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { User } from '../../entities/User';

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new AppError('User already exists.');
    }

    const user = new User(data);

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
  }
}
