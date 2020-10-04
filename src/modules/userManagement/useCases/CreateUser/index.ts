import { MailtrapMailProvider } from '../../../../providers/implementations/MailtrapMailProvider';
import { UserRepository } from '../../repositories/implementations/UserRepository';
import { CreateUserController } from './CreateUserController';
import { CreateUseruseCase } from './CreateUserUseCase';

const mailtrapProvider = new MailtrapMailProvider();
const userRepository = new UserRepository();

const createUserUseCase = new CreateUseruseCase(
  userRepository,
  mailtrapProvider
);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserController, createUserUseCase };
