import { IUsersRepository } from '../../repositories/IUsersRepository';
import AppError from '../../../../shared/errors/AppError';
import { IUserUpdateDTO } from './UpdateUserDTO';
export class UpdateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: IUserUpdateDTO): Promise<void> {
    /** check if email will be updated */
    if (data.email) {
      const userEmailCheck = await this.usersRepository.findByEmail(data.email);

      if (userEmailCheck) {
        throw new AppError('This Email already in use!');
      }
    }

    const user = await this.usersRepository.findById(data.id);

    if (!user) {
      throw new AppError('User not found!');
    }
    const updatedUser = Object.assign(user, data);
    await this.usersRepository.update(updatedUser);
  }
}
