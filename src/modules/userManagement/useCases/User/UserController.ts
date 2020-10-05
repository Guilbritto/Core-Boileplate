import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { User } from '../../../../database/entities/User';
import { IMailProvider } from '../../../../providers/IMailProvider';
import { UserRepository } from '../../repositories/implementations/UserRepository';
import { IUserRequestDTO } from './UserDTO';
import { UserUseCase } from './UserUseCase';

export class UserController {
  constructor(public mailProvider: IMailProvider) {}

  async getUsers(request: Request, response: Response) {
    const users = await getRepository(User).find();
    return response.status(200).json(users);
  }

  async createUser(request: Request<IUserRequestDTO>, response: Response) {
    try {
      const repository = getCustomRepository(UserRepository);
      const userUseCase = new UserUseCase(repository, this.mailProvider);
      userUseCase.execute(request.body);
      return response.status(201).send();
    } catch (err) {
      response.status(400).json({ message: err.message });
    }
  }
}
