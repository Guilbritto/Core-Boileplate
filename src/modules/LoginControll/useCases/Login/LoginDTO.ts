import { User } from "../../../userManagement/entities/User";

export interface ILoginRequestDTO {
  email: string;
  password: string;
}

export interface ILoginResponseDTO {
  user: User;
  token: string;
}
