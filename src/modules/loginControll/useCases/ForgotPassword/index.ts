import { MailtrapMailProvider } from '../../../../shared/providers/implementations/MailtrapMailProvider';
import { UserRepository } from '../../../userManagement/repositories/implementations/UserRepository';
import { ForgotPasswordController } from './ForgotPasswordController';
import { ForgotPasswordUseCase } from './ForgotPasswordUseCase';

const userRepository = new UserRepository();
const mailProvider = new MailtrapMailProvider();
const forgotPasswordUseCase = new ForgotPasswordUseCase(
  userRepository,
  mailProvider
);
const forgotPasswordController = new ForgotPasswordController(
  forgotPasswordUseCase
);

export { forgotPasswordController, forgotPasswordUseCase };
