import axios, { AxiosResponse } from "axios";
import { GET_USERS } from "./types";
import { put, takeLatest } from "redux-saga/effects";
import { getUsersErrorAction, getUsersSuccessAction } from "./usersSlice";
import { User } from "../../services/users/users.types";

function* getUsersSaga() {
  try {
    // You can also export the axios call as a function.
    const response: AxiosResponse<User[]> = yield axios.get("/users");
    yield put(getUsersSuccessAction(response.data));
  } catch (error: any) {
    yield put(getUsersErrorAction(error));
  }
}

export function* watchGetUsers() {
  yield takeLatest(GET_USERS, getUsersSaga);
}
