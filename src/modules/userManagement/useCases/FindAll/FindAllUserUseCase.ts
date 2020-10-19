import { User } from '../../../../database/entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

export class FindAllUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(): Promise<User[]> {

    const users = await this.usersRepository.all();

    return users;
  }

}
