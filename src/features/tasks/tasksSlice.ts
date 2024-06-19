import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TasksState } from "./types";
import {
  CreateTaskRequest,
  GetTaskByUuidResponse,
  Task,
  UpdateTaskRequest,
} from "../../services/tasks/tasks.types";
import { RootState } from "../../app/store";

const initialState: TasksState = {
  task: {} as Task,
  viewTask: {} as GetTaskByUuidResponse,
  isLoading: false,
  errors: "",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTaskOrderAction: (
      { isLoading }: TasksState,
      payload: PayloadAction<{
        order: number;
        taskUuid: string;
        projectUuid: string;
        columnUuid: string;
      }>
    ) => {
      isLoading = true;
    },
    updateTaskOrderSuccessAction: (
      state: TasksState,
      { payload: task }: PayloadAction<Task>
    ) => {
      state.task = task;
      state.isLoading = false;
    },
    updateTaskOrderErrorAction: (state: TasksState) => {
      state.isLoading = false;
    },

    createTaskAction: (
      state: TasksState,
      { payload: task }: PayloadAction<CreateTaskRequest>
    ) => {
      state.isLoading = true;
    },

    createTaskSuccessAction: (
      state: TasksState,
      { payload: task }: PayloadAction<Task>
    ) => {
      state.isLoading = false;
      state.task = task;
    },

    createTaskErrorAction: (state: TasksState) => {
      state.isLoading = false;
    },

    getTaskByUuidAction: (
      state: TasksState,
      { payload: uuid }: PayloadAction<string>
    ) => {
      state.isLoading = true;
    },

    getTaskByUuidSuccessAction: (
      state: TasksState,
      { payload: task }: PayloadAction<GetTaskByUuidResponse>
    ) => {
      state.isLoading = false;
      state.viewTask = task;
    },
    getTaskByUuidErrorAction: (state: TasksState) => {
      state.isLoading = false;
    },
    updateTaskByUuidAction: (
      state: TasksState,
      { payload: { uuid, assignedAt } }: PayloadAction<UpdateTaskRequest>
    ) => {
      state.isLoading = true;
    },
    updateTaskByUuidSuccessAction: (
      state: TasksState,
      { payload: task }: PayloadAction<GetTaskByUuidResponse>
    ) => {
      state.isLoading = false;
      state.viewTask = task;
    },
    updateTaskByUuidErrorAction: (state: TasksState) => {
      state.isLoading = false;
    },
  },
});

export const {
  updateTaskOrderAction,
  updateTaskOrderSuccessAction,
  updateTaskOrderErrorAction,
  createTaskAction,
  createTaskErrorAction,
  createTaskSuccessAction,
  getTaskByUuidAction,
  getTaskByUuidSuccessAction,
  getTaskByUuidErrorAction,
  updateTaskByUuidAction,
  updateTaskByUuidErrorAction,
  updateTaskByUuidSuccessAction,
} = tasksSlice.actions;

export const selectIsLoading = (state: RootState) => state.tasks.isLoading;
export const selectViewTask = (state: RootState) => state.tasks.viewTask;

export default tasksSlice.reducer;
