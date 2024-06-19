import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createTaskAction,
  getTaskByUuidAction,
  selectIsLoading,
  selectViewTask,
  updateTaskByUuidAction,
  updateTaskOrderAction,
} from "../../features/tasks/tasksSlice";
import {
  CreateTaskRequest,
  GetTaskByUuidResponse,
  UpdateTaskRequest,
} from "./tasks.types";
import { NavigateFunction } from "react-router-dom";

type TaskServiceOperators = {
  updateTaskOrder: ({
    taskUuid,
    columnUuid,
    order,
    projectUuid,
  }: {
    taskUuid: string;
    order: number;
    columnUuid: string;
    projectUuid: string;
  }) => void;
  createTask: (
    data: CreateTaskRequest & { navigate: NavigateFunction }
  ) => void;
  getTaskByUuid: (uuid: string) => void;
  updateTaskByUuid: (data: UpdateTaskRequest) => void;
  viewTask: GetTaskByUuidResponse;
  isLoading: boolean;
};

export const useTasksService = (): Readonly<TaskServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    isLoading: useAppSelector(selectIsLoading),
    getTaskByUuid: useCallback(
      (uuid: string) => {
        dispatch(getTaskByUuidAction(uuid));
      },
      [dispatch]
    ),
    createTask: useCallback(
      (data: CreateTaskRequest) => {
        dispatch(createTaskAction(data));
      },
      [dispatch]
    ),

    updateTaskOrder: useCallback(
      ({
        taskUuid,
        columnUuid,
        order,
        projectUuid,
      }: {
        taskUuid: string;
        order: number;
        columnUuid: string;
        projectUuid: string;
      }) => {
        dispatch(
          updateTaskOrderAction({
            columnUuid,
            order,
            projectUuid,
            taskUuid,
          })
        );
      },
      [dispatch]
    ),
    updateTaskByUuid: useCallback(
      (data: UpdateTaskRequest) => {
        dispatch(updateTaskByUuidAction(data));
      },
      [dispatch]
    ),
    viewTask: useAppSelector(selectViewTask),
  };
};
