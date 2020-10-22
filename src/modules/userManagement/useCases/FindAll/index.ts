import { UserRepository } from '../../repositories/implementations/UserRepository';
import { FindAllUserController } from './FindAllUserController';
import { FindAllUserUseCase } from './FindAllUserUseCase';


const repository = new UserRepository();

const findAllUserUseCase = new FindAllUserUseCase(repository);

const findAllUserController = new FindAllUserController(findAllUserUseCase);

export { findAllUserUseCase, findAllUserController };
