import { UserRepository } from '../../repositories/implementations/UserRepository';
import { RemoveUserController } from './RemoveUserController';
import { RemoveUserUseCase } from './RemoveUserUseCase';


const repository = new UserRepository();

const removeUserUseCase = new RemoveUserUseCase(repository);

const removeUserController = new RemoveUserController(removeUserUseCase);

export { removeUserController,  removeUserUseCase};
