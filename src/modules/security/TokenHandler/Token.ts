import { IAuthentication } from '../interfaces/IAuthentication';
import { sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth';
export class Token implements IAuthentication {
  generateToken(
    payload: object,
    expirationTime: string,
    subject: string
  ): string {
    const token = sign(payload, authConfig.jwt.secret, {
      expiresIn: expirationTime,
      subject: subject
    });
    return token;
  }
}
