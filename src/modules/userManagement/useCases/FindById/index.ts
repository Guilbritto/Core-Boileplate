import { UserRepository } from '../../repositories/implementations/UserRepository';
import { FindByIdUserController } from './FindByIdUserController';
import { FindByIdUserUseCase } from './FindByIdUserUseCase';


const repository = new UserRepository();

const findByIdUserUseCase = new FindByIdUserUseCase(repository);

const findByIdUserController = new FindByIdUserController(findByIdUserUseCase);

export { findByIdUserUseCase, findByIdUserController };
