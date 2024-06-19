import { useCallback } from "react";
import { useAppDispatch } from "../../app/hooks";
import { SignInRequest, SignUpRequest } from "./auth.types";
import { signInAction, signUpAction } from "../../features/auth/authSlice";

type AuthServiceOperators = {
  signIn: (data: SignInRequest) => void;
  signUp: (data: SignUpRequest) => void;
};

export const useAuthService = (): Readonly<AuthServiceOperators> => {
  const dispatch = useAppDispatch();
  return {
    signIn: useCallback(
      (data: SignInRequest) => {
        dispatch(signInAction(data));
      },
      [dispatch]
    ),
    signUp: useCallback(
      (data: SignUpRequest) => {
        dispatch(signUpAction(data));
      },
      [dispatch]
    ),
  };
};
