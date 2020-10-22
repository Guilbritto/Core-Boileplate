import { getRepository } from 'typeorm';
import { Module } from '../../../marketPlace/entities/Modules';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UserRepository implements IUsersRepository {
  
  async getModules(id: string): Promise<Module[]> {
    const user = await getRepository(User).findOne({
      where: {
        id,
      },
      relations: ['modules']
    })
    return user?.modules || [] as Module[];
  }

  async findById(id: string): Promise<User | null> {
    const user = await getRepository(User).findOne({
      where: { id },
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

  async findByEmail(email: string, withPassword?: boolean): Promise<User | null> {
    const user = await getRepository(User).findOne({
      where: { email },
    });
    return user || null;
  }

  async all(): Promise<User[]> {
    const users = await getRepository(User).find({
    });
    return users;
  }
}
