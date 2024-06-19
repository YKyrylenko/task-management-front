import { GetTaskByUuidResponse, Task } from "../../services/tasks/tasks.types";

export type TasksState = {
  task: Task;
  viewTask: GetTaskByUuidResponse;
  isLoading: boolean;
  errors: string;
};

const TASKS = "tasks";

export const UPDATE_TASK_ORDER = `${TASKS}/updateTaskOrderAction`;
export const CREATE_TASK = `${TASKS}/createTaskAction`;
export const GET_TASK_BY_UUID = `${TASKS}/getTaskByUuidAction`;
export const UPDATE_TASK_BY_UUID = `${TASKS}/updateTaskByUuidAction`;
