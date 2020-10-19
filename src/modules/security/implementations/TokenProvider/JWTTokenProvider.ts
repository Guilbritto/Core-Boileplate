import { sign } from 'jsonwebtoken';
import authConfig from '../../../../config/auth';
import { IAuthentication } from '../../interfaces/IAuthentication';

export class JWTTokenProvider implements IAuthentication {
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
