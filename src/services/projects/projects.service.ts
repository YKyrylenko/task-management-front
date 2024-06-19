import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getProjectByUuidAction,
  getProjectsAction,
  selectCreateProject,
  selectIsLoading,
  selectProject,
  selectProjectParticipants,
  selectProjects,
} from "../../features/projects/projectsSlice";
import { CreateProjectRequest, Project } from "./projects.types";
import { User } from "../users/users.types";

type ProjectServiceOperators = {
  project: Project;
  projects: Project[];
  createProject: CreateProjectRequest;
  participants: User[];
  isLoading: boolean;
  getProjects: () => void;
  getProject: (uuid: string) => void;
};

const useProjectsService = (): Readonly<ProjectServiceOperators> => {
  const dispatch = useAppDispatch();
  return {
    getProjects: useCallback(() => {
      dispatch(getProjectsAction());
    }, [dispatch]),

    getProject: useCallback(
      (uuid: string) => {
        dispatch(getProjectByUuidAction(uuid));
      },
      [dispatch]
    ),
    project: useAppSelector(selectProject),
    projects: useAppSelector(selectProjects),
    createProject: useAppSelector(selectCreateProject),
    participants: useAppSelector(selectProjectParticipants),
    isLoading: useAppSelector(selectIsLoading),
  };
};

export default useProjectsService;
