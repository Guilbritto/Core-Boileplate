export interface ITokenProvider {
  /** Generate a JWT token */
  generateToken(
    payload: object,
    expirationTime: string,
    subject: string | undefined
  ): string;
}
