import { User } from "../../services/users/users.types";

export type AuthState = {
  user: User;
  token: string;
  isLoading: boolean;
};

const AUTH = "auth";

export const AUTH_SIGN_IN = `${AUTH}/signInAction`;
export const AUTH_SIGN_UP = `${AUTH}/signUpAction`;
