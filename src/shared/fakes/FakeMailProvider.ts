import { IMailProvider, IMessage } from '../providers/IMailProvider';

export class FakeMailProvider implements IMailProvider {
  constructor() {}

  async sendMail(message: IMessage): Promise<void> {
    const fake = 'sended mail'
  }
}
