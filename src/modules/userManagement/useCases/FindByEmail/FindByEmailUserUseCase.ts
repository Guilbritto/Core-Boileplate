import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { User } from '../../entities/User';

export class FindByEmailUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(email: string): Promise<User | null> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User not found!');
    }
    return user || null;
  }


}
