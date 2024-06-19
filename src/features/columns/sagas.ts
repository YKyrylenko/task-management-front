import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Column } from "../../services/columns/columns.types";
import { getColumnsByProjectUuid } from "../../services/columns/columns.api";
import {
  getColumnsByProjectUuidErrorAction,
  getColumnsByProjectUuidSuccessAction,
} from "./columnsSlice";
import { put, takeLatest } from "redux-saga/effects";
import { GET_COLUMNS_BY_PROJECT_UUID } from "./types";

function* getColumnsByProjectUuidSaga({
  payload: uuid,
}: PayloadAction<string>) {
  try {
    const response: AxiosResponse<Column[]> = yield getColumnsByProjectUuid(
      uuid
    );
    yield put(getColumnsByProjectUuidSuccessAction(response.data));
  } catch (err) {
    yield put(getColumnsByProjectUuidErrorAction());
  }
}

export function* watchColumns() {
  yield takeLatest(GET_COLUMNS_BY_PROJECT_UUID, getColumnsByProjectUuidSaga);
}
