import axios from "axios";
import { SignInRequest, SignUpRequest } from "./auth.types";

const BASE_URL = "/auth";

export const signInApi = (data: SignInRequest) => {
  return axios.post(`${BASE_URL}/signin`, data);
};

export const signUpApi = (data: SignUpRequest) => {
  return axios.post(`${BASE_URL}/signup`, data);
};
