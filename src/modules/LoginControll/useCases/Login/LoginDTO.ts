export interface ILoginRequestDTO {
  email: string;
  password: string;
}

export interface IPermissionsDTO {}

export interface ILoginResponseDTO {
  name: string;
  token: string;
  permissions: IPermissionsDTO;
}
