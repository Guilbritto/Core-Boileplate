import { User } from '../../../../database/entities/User';
import { IMailProvider } from '../../../../providers/IMailProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';

export class CreateUseruseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const user = new User(data);

    await this.usersRepository.save(user);

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
