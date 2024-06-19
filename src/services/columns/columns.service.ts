import { useCallback } from "react";
import { Column } from "./columns.types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getColumnsByProjectUuidAction,
  selectColumns,
  sortTask,
  sortTaskThroughColumn,
} from "../../features/columns/columnsSlice";
import { Task } from "../tasks/tasks.types";

type ColumnServiceOperators = {
  columns: Column[];
  getColumns: (uuid: string) => void;
  sortTasks: (sortedTasks: Task[], activeColumnUuid: string) => void;
  sortTasksThroughColumns: (columns: Column[]) => void;
};

export const useColumnService = (): Readonly<ColumnServiceOperators> => {
  const dispatch = useAppDispatch();
  return {
    columns: useAppSelector(selectColumns),
    getColumns: useCallback(
      (uuid: string) => {
        dispatch(getColumnsByProjectUuidAction(uuid));
      },
      [dispatch]
    ),
    sortTasks: useCallback(
      (sortedTasks: Task[], activeColumnUuid: string) => {
        dispatch(
          sortTask({
            activeColumnUuid,
            sortedTasks,
          })
        );
      },
      [dispatch]
    ),
    sortTasksThroughColumns: useCallback(
      (columns: Column[]) => {
        dispatch(sortTaskThroughColumn(columns));
      },
      [dispatch]
    ),
  };
};
