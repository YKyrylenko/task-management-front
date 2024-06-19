import { User } from "../users/users.types";

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

export type SignInResponse = {
  user: User;
  token: string;
};
