import { IUsersRepository } from '../../repositories/IUsersRepository';
import AppError from '../../../../shared/errors/AppError';
export class RemoveUserUseCase {
  
  constructor(
    private usersRepository: IUsersRepository,
  ) {}


  async execute(data: string): Promise<void> {
    const user = await this.usersRepository.findById(data);
    if (!user) {
      throw new AppError('User not found!');
    }
    await this.usersRepository.delete(user);
  }

  
}
