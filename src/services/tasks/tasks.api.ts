import axios, { AxiosResponse } from "axios";
import { CreateTaskRequest, Task, UpdateTaskRequest } from "./tasks.types";

const BASE_URL = "/tasks";

export const createTaskApi = (
  data: CreateTaskRequest
): Promise<AxiosResponse<Task>> => {
  return axios.post(BASE_URL, data);
};

export const updateTaskOrderApi = ({
  uuid,
  columnUuid,
  projectUuid,
  order,
}: {
  uuid: string;
  columnUuid: string;
  projectUuid: string;
  order: number;
}): Promise<AxiosResponse<Task>> => {
  return axios.put(`${BASE_URL}/${uuid}`, {
    columnUuid,
    projectUuid,
    order,
  });
};

export const getTaskByUuidApi = (uuid: string) => {
  return axios.get(`${BASE_URL}/${uuid}`);
};

export const updateTaskByUuidApi = ({
  uuid,
  assignedAt,
}: UpdateTaskRequest) => {
  return axios.put(`${BASE_URL}/edit/${uuid}`, {
    assignedAt,
  });
};
