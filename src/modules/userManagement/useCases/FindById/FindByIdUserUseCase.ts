import { User } from '../../../../database/entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import AppError from '../../../../errors/AppError';
export class FindByIdUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: string): Promise<User> {
    const user = await this.usersRepository.findById(data);
    if (!user) {
      throw new AppError('User not found!');
    }
    return user;
  }

}
