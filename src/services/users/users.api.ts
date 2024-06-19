import axios, { AxiosResponse } from "axios";
import { User } from "./users.types";

const BASE_URL = "/users";

export const getUsers = (): Promise<AxiosResponse<User>> => {
  return axios.get(BASE_URL);
};
