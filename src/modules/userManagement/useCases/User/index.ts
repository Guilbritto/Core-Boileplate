import { MailtrapMailProvider } from '../../../../providers/implementations/MailtrapMailProvider';
import { UserRepository } from '../../repositories/implementations/UserRepository';
import { UserController } from './UserController';
import { UserUseCase } from './UserUseCase';

const mailProvider = new MailtrapMailProvider();

const repository = new UserRepository();

const userUseCase = new UserUseCase(repository, mailProvider);

const userController = new UserController(userUseCase);

export { userController };
