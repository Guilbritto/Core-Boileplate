import { MailtrapMailProvider } from '../../../../providers/implementations/MailtrapMailProvider';
import { UserRepository } from '../../repositories/implementations/UserRepository';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

const mailProvider = new MailtrapMailProvider();

const repository = new UserRepository();

const createUserUseCase = new CreateUserUseCase(repository, mailProvider);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserController,  createUserUseCase};
