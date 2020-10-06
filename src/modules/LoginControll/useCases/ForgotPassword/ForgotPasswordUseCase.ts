import { getRepository } from 'typeorm';
import { IMailProvider } from '../../../../providers/IMailProvider';
import { IUsersRepository } from '../../../userManagement/repositories/IUsersRepository';
import randomize from 'randomatic';
export class ForgotPasswordUseCase {
  constructor(
    private userRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Email not found, check our email e try again!');
    }
    const code = randomize('0', 8);

    user.forgot_code = code;
    await this.userRepository.update(user);

    await this.mailProvider.sendMail({
      to: {
        email: user.email,
        name: user.name
      },
      from: {
        email: 'pzmcore@pzmweb.com.br',
        name: 'PZMCORE'
      },
      subject: 'Forgot Password',
      body: `<h1> CODE: ${code} </h1>`
    });
  }
}
