export interface UserMeResponse {
  email: string;
  name: string;
  username: string;
}

export interface RegisterType {
  name: string,
  surname: string,
  email: string,
  password: string,
}

export interface LoginType {
  email: string,
  password: string,
}