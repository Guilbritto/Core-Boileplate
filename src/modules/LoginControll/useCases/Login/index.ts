import { Token } from '../../../security/TokenHandler/Token';
import { UserRepository } from '../../../userManagement/repositories/implementations/UserRepository';
import { LoginController } from './LoginController';
import { LoginUseCase } from './LoginUseCase';

const authentication = new Token();
const userRepository = new UserRepository();
const loginUseCase = new LoginUseCase(userRepository, authentication);
const loginController = new LoginController(loginUseCase);

export { loginUseCase, loginController };
