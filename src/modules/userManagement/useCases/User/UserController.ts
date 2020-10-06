import { Request, Response } from 'express';
import { User } from '../../../../database/entities/User';
import { IUserRequestDTO, IUserSearchDTO, IUserUpdateDTO } from './UserDTO';
import { UserUseCase } from './UserUseCase';

export class UserController {
  constructor(public userUseCase: UserUseCase) {}

  async createUser(request: Request<IUserRequestDTO>, response: Response) {
    try {
      await this.userUseCase.execute(request.body);
      return response.status(201).send();
    } catch (err) {
      response.status(400).json({ message: err.message });
    }
  }

  async findUserById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      if (typeof id === 'string') {
        const user = await this.userUseCase.findById(id);
        delete user.password;
        return response.status(200).json(user);
      }
      return response.status(204).send();
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }

  async fundByEmail(request: Request, response: Response) {
    try {
      const { email } = request.params;
      if (typeof email === 'string') {
        const user = await this.userUseCase.findByEmail(email);
        delete user?.password;
      }
    } catch (err) {
      response.status(400).json({ message: err.message });
    }
  }

  async removeUser(request: Request, response: Response) {
    try {
      const { id } = request.params;
      if (typeof id === 'string') {
        await this.userUseCase.removeUseCase(id);
      }
      response.status(200).send();
    } catch (err) {
      response.send(400).json({ message: err.message });
    }
  }

  async getAllUsers(request: Request, response: Response) {
    try {
      const users = await this.userUseCase.getAllUsers();
      const userWithoutPassword = users.map(
        (user: User) => delete user.password
      );
      return response.status(200).json(users);
    } catch (err) {
      response.send(400).json({ message: err.message });
    }
  }

  async updateUser(request: Request<IUserUpdateDTO>, response: Response) {
    try {
      await this.userUseCase.updateUser(request.body);
      return response.status(200).send();
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }

  async getUserById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      if (typeof id === 'string') {
        const user = await this.userUseCase.findById(id);
        return response.status(200).json(user);
      }
      return response.status(200).send();
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }

  async getUserByEmail(request: Request<IUserSearchDTO>, response: Response) {
    try {
      const { email } = request.body;
      const user = await this.userUseCase.findByEmail(email);
      return response.status(200).json(user);
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }
}
