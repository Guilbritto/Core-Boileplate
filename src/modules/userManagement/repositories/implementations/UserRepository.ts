import { EntityRepository, getRepository, Repository } from "typeorm";
import { User } from "../../../../database/entities/User";
import { IUsersRepository } from "../IUsersRepository";

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.findOne({
      where: { email },
    });
    return user || null;
  }
}
