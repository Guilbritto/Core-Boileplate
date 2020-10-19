import { User } from "../entities/User";

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  update(user: User): Promise<void>;
  delete(user: User): Promise<void>;
  all(): Promise<User[]>;
}
