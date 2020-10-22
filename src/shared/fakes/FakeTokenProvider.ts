import { ITokenProvider } from "../../modules/security/interfaces/ITokenProvider";

export class FakeTokenProvider implements ITokenProvider{
  generateToken(payload: object, expirationTime: string, subject: string | undefined): string {
    return 
  }

}