import { UserRepository } from '../../repositories/implementations/UserRepository';
import { FindByEmailUserController } from './FindByEmailUserController';
import { FindByEmailUserUseCase } from './FindByEmailUserUseCase';


const repository = new UserRepository();

const findByEmailUserUseCase = new FindByEmailUserUseCase(repository);

const findByEmailUserController = new FindByEmailUserController(findByEmailUserUseCase);

export { findByEmailUserUseCase, findByEmailUserController};
