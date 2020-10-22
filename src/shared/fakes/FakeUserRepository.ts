import { Module } from "../../modules/marketPlace/entities/Modules";
import { User } from "../../modules/userManagement/entities/User";
import { IUsersRepository } from "../../modules/userManagement/repositories/IUsersRepository";
import { ModuleStatus } from "../Enun/moduleStatus";

export class FakeUserRepository implements IUsersRepository {
  private users: User[] = [];
  
  
  async getModules(id: string): Promise<Module[]> {
    const user = new User({
      email: 'testUser@test.com',
      name: 'Teste User',
      password: 'testePassword'
    })
    const module  = new Module({
      description: 'Test Description',
      name: 'Module Test',
      user: user,
      status: ModuleStatus.ATIVO,
    })
    return [module] as Module[]
  }

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
