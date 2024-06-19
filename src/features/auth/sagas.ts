import { PayloadAction } from "@reduxjs/toolkit";
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
} from "../../services/auth/auth.types";
import { put, takeLatest } from "redux-saga/effects";
import {
  signInErrorAction,
  signInSuccessAction,
  signUpErrorAction,
  signUpSuccessAction,
} from "./authSlice";
import { signInApi, signUpApi } from "../../services/auth/auth.api";
import { AxiosResponse } from "axios";
import { setToken } from "../../utils/auth";
import { AUTH_SIGN_IN, AUTH_SIGN_UP } from "./types";

function* signUpSaga({ payload: data }: PayloadAction<SignUpRequest>) {
  try {
    yield signUpApi(data);
    yield put(signUpSuccessAction);
  } catch (err) {
    yield put(signUpErrorAction());
  }
}

function* signInSaga({ payload: data }: PayloadAction<SignInRequest>) {
  try {
    const response: AxiosResponse<SignInResponse> = yield signInApi(data);
    yield put(signInSuccessAction(response.data));
    setToken(response.data.token);
  } catch (err) {
    yield put(signInErrorAction());
  }
}

export function* authWatcherSaga() {
  yield takeLatest(AUTH_SIGN_IN, signInSaga);
  yield takeLatest(AUTH_SIGN_UP, signUpSaga);
}
