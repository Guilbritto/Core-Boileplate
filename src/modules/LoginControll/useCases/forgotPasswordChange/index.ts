import { BcryptProvider } from '../../../security/implementations/HashProvider/BCryptProvider';
import { UserRepository } from '../../../userManagement/repositories/implementations/UserRepository';
import { ForgotPasswordChangeController } from './ForgotPasswordChangeController';
import { ForgotPasswordChangeUseCase } from './ForgotPasswordChangeUseCase';

const userRepository = new UserRepository();
const hashProvider = new BcryptProvider();
const forgotPasswordChangeUseCase = new ForgotPasswordChangeUseCase(
  userRepository,
  hashProvider,
);
const forgotPasswordChangeController = new ForgotPasswordChangeController(
  forgotPasswordChangeUseCase
);

export { forgotPasswordChangeController, forgotPasswordChangeUseCase };
