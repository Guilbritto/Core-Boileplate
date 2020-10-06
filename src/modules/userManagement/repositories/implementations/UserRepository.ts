import { EntityRepository, getRepository, Repository } from 'typeorm';
import { User } from '../../../../database/entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UserRepository implements IUsersRepository {
  async findById(id: string): Promise<User | null> {
    const user = await getRepository(User).findOne({
      where: { id }
    });
    return user || null;
  }

  async update(user: User): Promise<void> {
    await getRepository(User).save(user);
  }

  async delete(user: User): Promise<void> {
    getRepository(User).delete(user);
  }

  async save(user: User): Promise<void> {
    await getRepository(User).save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await getRepository(User).findOne({
      where: { email }
    });
    return user || null;
  }

  async all(): Promise<User[]> {
    const users = await getRepository(User).find();
    return users;
  }
}
