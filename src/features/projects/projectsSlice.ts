import { createSlice } from "@reduxjs/toolkit";
import { ProjectsState } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  CreateProjectRequest,
  Project,
} from "../../services/projects/projects.types";
import { RootState } from "../../app/store";
import { NavigateFunction } from "react-router-dom";

const projectsInitialState: ProjectsState = {
  project: {
    uuid: "",
    name: "",
    creatorUuid: "",
    description: "",
    taskPrefix: "",
    participant: [],
  },
  createProject: {
    columns: [],
    description: "",
    name: "",
    participantUuids: [],
    taskPrefix: "",
  },
  projects: [],
  errors: "",
  isLoading: false,
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState: projectsInitialState,
  reducers: {
    getProjectsAction: (state: ProjectsState) => {
      state.isLoading = true;
    },
    getProjectsSuccessAction: (
      state: ProjectsState,
      { payload: projects }: PayloadAction<Project[]>
    ) => {
      state.projects = projects;
      state.isLoading = false;
    },
    getProjectsErrorAction: (state: ProjectsState) => {
      state.isLoading = false;
    },

    createProjectAction: (
      state: ProjectsState,
      {
        payload: project,
      }: PayloadAction<CreateProjectRequest & { navigate: NavigateFunction }>
    ) => {
      state.isLoading = true;
    },
    createProjectSuccessAction: (
      state: ProjectsState,
      { payload: project }: PayloadAction<Project>
    ) => {
      state.isLoading = false;
      state.project = project;
    },

    createProjectErrorAction: (state: ProjectsState) => {
      state.isLoading = false;
    },

    createProjectStep1: (
      state: ProjectsState,
      {
        payload: project,
      }: PayloadAction<
        Omit<CreateProjectRequest, "participantUuids" | "columns">
      >
    ) => {
      state.createProject = { ...state.createProject, ...project };
    },

    createProjectStep2: (
      state: ProjectsState,
      {
        payload: project,
      }: PayloadAction<
        Omit<
          CreateProjectRequest,
          "name" | "description" | "taskPrefix" | "columns"
        >
      >
    ) => {
      state.createProject = { ...state.createProject, ...project };
    },

    createProjectStep3: (
      state: ProjectsState,
      {
        payload: project,
      }: PayloadAction<
        Omit<
          CreateProjectRequest,
          "name" | "description" | "taskPrefix" | "participantUuids"
        >
      >
    ) => {
      state.createProject = { ...state.createProject, ...project };
    },

    getProjectByUuidAction: (
      state: ProjectsState,
      { payload: uuid }: PayloadAction<string>
    ) => {
      state.isLoading = true;
    },

    getProjectByUuidSuccessAction: (
      state: ProjectsState,
      { payload: project }: PayloadAction<Project>
    ) => {
      state.isLoading = false;
      state.project = project;
    },

    getProjectByUuidErrorAction: (state: ProjectsState) => {
      state.isLoading = false;
    },
  },
});

export const {
  getProjectsAction,
  getProjectsErrorAction,
  getProjectsSuccessAction,
  createProjectAction,
  createProjectErrorAction,
  createProjectSuccessAction,
  createProjectStep1,
  createProjectStep2,
  createProjectStep3,
  getProjectByUuidAction,
  getProjectByUuidErrorAction,
  getProjectByUuidSuccessAction,
  // moveTaskInColumn,
  // moveTaskThroughColumns,
} = projectsSlice.actions;

export const selectProjects = (state: RootState) => state.projects.projects;
export const selectProject = (state: RootState) => state.projects.project;
export const selectCreateProject = (state: RootState) =>
  state.projects.createProject;

export const selectProjectParticipants = (state: RootState) =>
  state.projects.project.participant;

export const selectIsLoading = (state: RootState) => state.projects.isLoading;
