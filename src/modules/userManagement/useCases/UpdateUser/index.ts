import { UserRepository } from '../../repositories/implementations/UserRepository';
import { UpdateUserController } from './UpdateUserController';
import { UpdateUserUseCase } from './UpdateUserUseCase';


const repository = new UserRepository();

const updateUserUseCase = new UpdateUserUseCase(repository);

const updateUserController = new UpdateUserController(updateUserUseCase);

export { updateUserController, updateUserUseCase };
