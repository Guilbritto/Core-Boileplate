export interface IForgotPasswordChangeRequest {
  email: string;
  code: string;
  password: {
    old: string;
    new: string;
  }
}
