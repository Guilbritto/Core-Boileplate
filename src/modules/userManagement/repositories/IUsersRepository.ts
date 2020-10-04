import { User } from '../../../database/entities/User';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): void;
}
