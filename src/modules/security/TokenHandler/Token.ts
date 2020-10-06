import { User } from '../../../database/entities/User';
import { IAuthentication } from '../interfaces/IAuthentication';
import { sign } from 'jsonwebtoken';

export class Token implements IAuthentication {
  generateToken(
    payload: object,
    expirationTime: string,
    subject: string
  ): string {
    const token = sign(payload, 'lkajdsfhvlkjhgrvolhfgb', {
      expiresIn: expirationTime,
      subject: subject
    });
    return token;
  }
}
