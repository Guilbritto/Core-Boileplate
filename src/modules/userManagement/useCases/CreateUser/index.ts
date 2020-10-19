import { MailtrapMailProvider } from '../../../../shared/providers/implementations/MailtrapMailProvider';
import { BcryptProvider } from '../../../security/implementations/HashProvider/BCryptProvider';
import { UserRepository } from '../../repositories/implementations/UserRepository';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

const mailProvider = new MailtrapMailProvider();

const repository = new UserRepository();

const bcryptProvider = new BcryptProvider();

const createUserUseCase = new CreateUserUseCase(repository, mailProvider, bcryptProvider);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserController,  createUserUseCase};
