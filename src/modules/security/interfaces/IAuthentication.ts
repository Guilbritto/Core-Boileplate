export interface IAuthentication {
  /** Generate a JWT token */
  generateToken(
    payload: object,
    expirationTime: string,
    subject: string | undefined
  ): string;
}
