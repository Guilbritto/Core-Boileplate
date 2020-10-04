import { IMailProvider, IMessage } from '../IMailProvider';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
export class MailtrapMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'b34322a98cbcec',
        pass: '269603623c4872'
      }
    });
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        address: message.to.email,
        name: message.to.name
      },
      from: {
        address: message.to.email,
        name: message.to.name
      },
      subject: message.subject,
      html: message.body
    });
  }
}
