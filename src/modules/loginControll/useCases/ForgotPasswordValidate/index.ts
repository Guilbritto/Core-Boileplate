import { UserRepository } from '../../../userManagement/repositories/implementations/UserRepository';
import { ForgotPasswordValidateController } from './ForgotPasswordValidateController';
import { ForgotPasswordValidateUseCase } from './ForgotPasswordValidateUseCase';

const userRepository = new UserRepository();
const forgotPasswordValidateUseCase = new ForgotPasswordValidateUseCase(
  userRepository
);
const forgotPasswordValidateController = new ForgotPasswordValidateController(
  forgotPasswordValidateUseCase
);

export { forgotPasswordValidateController, forgotPasswordValidateUseCase };
