import { MailtrapMailProvider } from '../../../../providers/implementations/MailtrapMailProvider';
import { UserRepository } from '../../../userManagement/repositories/implementations/UserRepository';
import { ForgotPasswordChangeController } from './ForgotPasswordChangeController';
import { ForgotPasswordChangeUseCase } from './ForgotPasswordChangeUseCase';

const userRepository = new UserRepository();
const forgotPasswordChangeUseCase = new ForgotPasswordChangeUseCase(
  userRepository
);
const forgotPasswordChangeController = new ForgotPasswordChangeController(
  forgotPasswordChangeUseCase
);

export { forgotPasswordChangeController, forgotPasswordChangeUseCase };
