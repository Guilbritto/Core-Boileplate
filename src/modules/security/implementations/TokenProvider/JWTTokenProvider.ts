import { sign } from 'jsonwebtoken';
import authConfig from '../../../../shared/config/auth';
import { ITokenProvider } from '../../interfaces/ITokenProvider';

export class JWTTokenProvider implements ITokenProvider {
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
