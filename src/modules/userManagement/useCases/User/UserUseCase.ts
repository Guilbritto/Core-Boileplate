import { User } from '../../../../database/entities/User';
import { IMailProvider } from '../../../../providers/IMailProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUserRequestDTO, IUserUpdateDTO } from './UserDTO';
import AppError from '../../../../errors/AppError';
export class UserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async createUser(data: IUserRequestDTO): Promise<void> {
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

  async removeUseCase(data: string): Promise<void> {
    const user = await this.usersRepository.findById(data);
    if (!user) {
      throw new AppError('User not found!');
    }
    await this.usersRepository.delete(user);
  }

  async findById(data: string): Promise<User> {
    const user = await this.usersRepository.findById(data);
    if (!user) {
      throw new AppError('User not found!');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User not found!');
    }
    return user || null;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.all();

    return users;
  }

  async updateUser(data: IUserUpdateDTO): Promise<void> {
    /** check if email will be updated */
    if (data.email) {
      const userEmailCheck = await this.findByEmail(data.email);

      if (userEmailCheck) {
        throw new AppError('This Email already in use!');
      }
    }

    const user = await this.findById(data.id);
    if (!user) {
      throw new AppError('User not found!');
    }
    const updatedUser = Object.assign(user, data);
    await this.usersRepository.update(updatedUser);
  }
}
