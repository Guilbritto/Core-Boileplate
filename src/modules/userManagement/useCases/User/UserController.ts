import { Request, Response } from 'express';
import { User } from '../../../../database/entities/User';
import { IUserRequestDTO, IUserSearchDTO, IUserUpdateDTO } from './UserDTO';
import { UserUseCase } from './UserUseCase';

export class UserController {
  constructor(public userUseCase: UserUseCase) {}

  async createUser(request: Request<IUserRequestDTO>, response: Response) {
    await this.userUseCase.createUser(request.body);
    return response.status(201).send();
  }

  async findUserById(request: Request, response: Response) {
    const { id } = request.params;
    if (typeof id === 'string') {
      const user = await this.userUseCase.findById(id);
      delete user.password;
      return response.status(200).json(user);
    }
    return response.status(204).send();
  }

  async fundByEmail(request: Request, response: Response) {
    const { email } = request.params;
    if (typeof email === 'string') {
      const user = await this.userUseCase.findByEmail(email);
      delete user?.password;
    }
  }

  async removeUser(request: Request, response: Response) {
    const { id } = request.params;
    if (typeof id === 'string') {
      await this.userUseCase.removeUseCase(id);
    }
    response.status(200).send();
  }

  async getAllUsers(request: Request, response: Response) {
    const users = await this.userUseCase.getAllUsers();
    const userWithoutPassword = users.map((user: User) => delete user.password);
    return response.status(200).json(users);
  }

  async updateUser(request: Request<IUserUpdateDTO>, response: Response) {
    await this.userUseCase.updateUser(request.body);
    return response.status(200).send();
  }

  async getUserById(request: Request, response: Response) {
    const { id } = request.params;
    if (typeof id === 'string') {
      const user = await this.userUseCase.findById(id);
      return response.status(200).json(user);
    }
    return response.status(200).send();
  }

  async getUserByEmail(request: Request<IUserSearchDTO>, response: Response) {
    const { email } = request.body;
    const user = await this.userUseCase.findByEmail(email);
    return response.status(200).json(user);
  }
}
