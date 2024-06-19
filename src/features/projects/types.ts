import {
  CreateProjectRequest,
  Project,
} from "../../services/projects/projects.types";

export type ProjectsState = {
  project: Project;
  projects: Project[];
  createProject: CreateProjectRequest;
  isLoading: boolean;
  errors: string;
};

export const PROJECTS = "projects";
export const GET_PROJECTS = `${PROJECTS}/getProjectsAction`;
export const CREATE_PROJECT = `${PROJECTS}/createProjectAction`;
export const GET_PROJECT_BY_UUID = `${PROJECTS}/getProjectByUuidAction`;
