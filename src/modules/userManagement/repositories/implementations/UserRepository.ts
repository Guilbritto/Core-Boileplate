import { EntityRepository, getRepository, Repository } from 'typeorm';
import { User } from '../../../../database/entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UserRepository implements IUsersRepository {
  async save(user: User): Promise<void> {
    await getRepository(User).save(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await getRepository(User).findOne({
      where: { email }
    });
    return user || null;
  }
}
