import { User } from "../../modules/userManagement/entities/User";
import { IUsersRepository } from "../../modules/userManagement/repositories/IUsersRepository";

export class FakeUserRepository implements IUsersRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    return user || null;
  }

  async update(user: User): Promise<void> {
    this.users.map((u) => {
      if (u.id === user.id) {
        return {
          ...u,
          ...user
        };
      } else {
        return u;
      }
    });
  }

  async delete(user: User): Promise<void> {
    this.users = this.users.filter((u) => u.id !== user.id);
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);
    return user || null;
  }

  async all(): Promise<User[]> {
    return this.users;
  }
}
