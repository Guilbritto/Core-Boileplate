export interface IUserRequestDTO {
  name: string;
  email: string;
  password: string;
}

export interface IUserUpdateDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  status: string;
}

export interface IUserSearchDTO {
  id: string;
  email: string;
  status: string;
}
