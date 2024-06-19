import { User } from "../../services/users/users.types";

export type UsersState = {
  users: User[];
  isLoading: boolean;
  errors: "";
};

export const USERS = "users";
export const GET_USERS = `${USERS}/getUsersAction`;
