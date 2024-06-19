import { CreateProjectRequest, Project } from "./projects.types";
import axios, { AxiosResponse } from "axios";

const BASE_URL = "/projects";

export const getProjectsApi = (): Promise<AxiosResponse<Project[]>> => {
  return axios.get(`${BASE_URL}`);
};

export const createProjectApi = (
  project: CreateProjectRequest
): Promise<AxiosResponse<Project>> => {
  return axios.post(BASE_URL, project);
};

export const getProjectByUuidApi = (
  uuid: string
): Promise<AxiosResponse<Project>> => {
  return axios.get(`${BASE_URL}/${uuid}`);
};
