import { AxiosResponse } from "axios";
import { CREATE_PROJECT, GET_PROJECTS, GET_PROJECT_BY_UUID } from "./types";
import { put, takeLatest } from "redux-saga/effects";
import {
  createProjectErrorAction,
  createProjectSuccessAction,
  getProjectByUuidErrorAction,
  getProjectByUuidSuccessAction,
  getProjectsErrorAction,
  getProjectsSuccessAction,
} from "./projectsSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  createProjectApi,
  getProjectByUuidApi,
  getProjectsApi,
} from "../../services/projects/projects.api";
import {
  CreateProjectRequest,
  Project,
} from "../../services/projects/projects.types";
import { NavigateFunction } from "react-router-dom";
import { showSnackbarAction } from "../snackbar/snackbarSlice";

function* getProjectsSaga() {
  try {
    // You can also export the axios call as a function.
    const response: AxiosResponse<Project[]> = yield getProjectsApi();
    yield put(getProjectsSuccessAction(response.data));
  } catch (error: any) {
    yield put(getProjectsErrorAction(error));
  }
}

function* createProjectSaga({
  payload: { navigate, ...project },
}: PayloadAction<CreateProjectRequest & { navigate: NavigateFunction }>) {
  try {
    // You can also export the axios call as a function.
    const response: AxiosResponse<Project> = yield createProjectApi(project);
    yield put(createProjectSuccessAction(response.data));
    yield put(
      showSnackbarAction(`Project ${response.data.name} successfully created`)
    );
    navigate("/projects");
  } catch (error: any) {
    yield put(createProjectErrorAction(error));
  }
}

function* getProjectByUuidSaga({ payload: uuid }: PayloadAction<string>) {
  try {
    // You can also export the axios call as a function.
    const response: AxiosResponse<Project> = yield getProjectByUuidApi(uuid);
    yield put(getProjectByUuidSuccessAction(response.data));
  } catch (error: any) {
    yield put(getProjectByUuidErrorAction(error));
  }
}

export function* watchProjects() {
  yield takeLatest(GET_PROJECTS, getProjectsSaga);
  yield takeLatest(GET_PROJECT_BY_UUID, getProjectByUuidSaga);
  yield takeLatest(CREATE_PROJECT, createProjectSaga);
}
