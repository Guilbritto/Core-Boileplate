import { IMailProvider, IMessage } from '../providers/IMailProvider';

export class FakeMailProvider implements IMailProvider {
  constructor() {}

  async sendMail(message: IMessage): Promise<void> {
    console.log('email enviado');
  }
}
