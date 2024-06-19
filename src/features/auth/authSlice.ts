import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types";
import { User } from "../../services/users/users.types";
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
} from "../../services/auth/auth.types";

const initialState: AuthState = {
  user: {} as User,
  token: "",
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUpAction: (
      state: AuthState,
      { payload: data }: PayloadAction<SignUpRequest>
    ) => {
      state.isLoading = true;
    },
    signUpSuccessAction: (state: AuthState) => {
      state.isLoading = false;
    },
    signUpErrorAction: (state: AuthState) => {
      state.isLoading = false;
    },
    signInAction: (
      state: AuthState,
      { payload: data }: PayloadAction<SignInRequest>
    ) => {
      state.isLoading = true;
    },
    signInSuccessAction: (
      state: AuthState,
      { payload }: PayloadAction<SignInResponse>
    ) => {
      state.isLoading = false;
      state.token = payload.token;
      state.user = payload.user;
    },
    signInErrorAction: (state: AuthState) => {
      state.isLoading = false;
    },
  },
});

export const {
  signInAction,
  signInErrorAction,
  signInSuccessAction,
  signUpAction,
  signUpErrorAction,
  signUpSuccessAction,
} = authSlice.actions;

export default authSlice.reducer;
