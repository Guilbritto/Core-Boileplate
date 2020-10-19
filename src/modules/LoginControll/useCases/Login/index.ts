import { BcryptProvider } from '../../../security/implementations/HashProvider/BCryptProvider';
import { JWTTokenProvider } from '../../../security/implementations/TokenProvider/JWTTokenProvider';
import { UserRepository } from '../../../userManagement/repositories/implementations/UserRepository';
import { LoginController } from './LoginController';
import { LoginUseCase } from './LoginUseCase';

const authentication = new JWTTokenProvider();
const userRepository = new UserRepository();
const bcryptProvider = new BcryptProvider();
const loginUseCase = new LoginUseCase(userRepository, authentication, bcryptProvider);
const loginController = new LoginController(loginUseCase);

export { loginUseCase, loginController };
