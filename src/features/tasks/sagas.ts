import { put, takeLatest } from "redux-saga/effects";
import {
  CREATE_TASK,
  GET_TASK_BY_UUID,
  UPDATE_TASK_BY_UUID,
  UPDATE_TASK_ORDER,
} from "./types";
import { AxiosResponse } from "axios";
import {
  createTaskErrorAction,
  createTaskSuccessAction,
  getTaskByUuidErrorAction,
  getTaskByUuidSuccessAction,
  updateTaskByUuidErrorAction,
  updateTaskByUuidSuccessAction,
  updateTaskOrderErrorAction,
  updateTaskOrderSuccessAction,
} from "./tasksSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  CreateTaskRequest,
  GetTaskByUuidResponse,
  Task,
  UpdateTaskRequest,
} from "../../services/tasks/tasks.types";
import { getColumnsByProjectUuidAction } from "../columns/columnsSlice";
import {
  createTaskApi,
  getTaskByUuidApi,
  updateTaskByUuidApi,
  updateTaskOrderApi,
} from "../../services/tasks/tasks.api";
import { NavigateFunction } from "react-router-dom";
import { showSnackbarAction } from "../snackbar/snackbarSlice";

function* updateTaskOrderSaga({
  payload: { columnUuid, order, projectUuid, taskUuid },
}: PayloadAction<{
  taskUuid: string;
  order: number;
  columnUuid: string;
  projectUuid: string;
}>) {
  try {
    const response: AxiosResponse<Task> = yield updateTaskOrderApi({
      uuid: taskUuid,
      columnUuid,
      order,
      projectUuid,
    });
    yield put(updateTaskOrderSuccessAction(response.data));
  } catch (err: any) {
    yield put(updateTaskOrderErrorAction(err));
  }
}

function* updateTaskByUuidSaga({ payload }: PayloadAction<UpdateTaskRequest>) {
  try {
    const response: AxiosResponse<GetTaskByUuidResponse> =
      yield updateTaskByUuidApi(payload);
    yield put(updateTaskByUuidSuccessAction(response.data));
  } catch (err: any) {
    yield put(updateTaskByUuidErrorAction(err));
  }
}

function* createTaskSaga({
  payload: { navigate, ...rest },
}: PayloadAction<CreateTaskRequest & { navigate: NavigateFunction }>) {
  try {
    const response: AxiosResponse<Task> = yield createTaskApi(rest);
    yield put(createTaskSuccessAction(response.data));
    yield put(getColumnsByProjectUuidAction(response.data.projectUuid));
    yield put(
      showSnackbarAction(`Task ${response.data.name} successfully created`)
    );
    navigate(`/project/${rest.projectUuid}`);
  } catch (err: any) {
    yield put(createTaskErrorAction(err));
  }
}

function* getTaskByUuidSaga({ payload: uuid }: PayloadAction<string>) {
  try {
    const response: AxiosResponse<GetTaskByUuidResponse> =
      yield getTaskByUuidApi(uuid);
    yield put(getTaskByUuidSuccessAction(response.data));
  } catch (err: any) {
    yield put(getTaskByUuidErrorAction(err));
  }
}

export function* watchTasks() {
  yield takeLatest(UPDATE_TASK_ORDER, updateTaskOrderSaga);
  yield takeLatest(CREATE_TASK, createTaskSaga);
  yield takeLatest(GET_TASK_BY_UUID, getTaskByUuidSaga);
  yield takeLatest(UPDATE_TASK_BY_UUID, updateTaskByUuidSaga);
}
