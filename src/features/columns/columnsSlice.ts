import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ColumnsState } from "./types";
import { Column } from "../../services/columns/columns.types";
import { RootState } from "../../app/store";
import { Task } from "../../services/tasks/tasks.types";

const initialState: ColumnsState = {
  columns: [],
  isLoading: false,
  errors: "",
};

const columnsSlice = createSlice({
  initialState,
  name: "columns",
  reducers: {
    getColumnsByProjectUuidAction: (
      state: ColumnsState,
      { payload: uuid }: PayloadAction<string>
    ) => {
      state.isLoading = true;
    },
    getColumnsByProjectUuidSuccessAction: (
      state: ColumnsState,
      { payload: columns }: PayloadAction<Column[]>
    ) => {
      state.isLoading = false;
      state.columns = columns;
    },
    getColumnsByProjectUuidErrorAction: (state: ColumnsState) => {},

    sortTask: (
      state: ColumnsState,
      {
        payload: { sortedTasks, activeColumnUuid },
      }: PayloadAction<{ sortedTasks: Task[]; activeColumnUuid: string }>
    ) => {
      const index = state.columns.findIndex(
        (column) => column.uuid === activeColumnUuid
      );
      state.columns[index].tasks = sortedTasks;
    },

    sortTaskThroughColumn: (
      state: ColumnsState,
      { payload: columns }: PayloadAction<Column[]>
    ) => {
      state.columns = columns;
    },
  },
});

export const {
  getColumnsByProjectUuidAction,
  getColumnsByProjectUuidErrorAction,
  getColumnsByProjectUuidSuccessAction,
  sortTask,
  sortTaskThroughColumn,
} = columnsSlice.actions;

export const selectColumns = (state: RootState) => state.columns.columns;
export default columnsSlice.reducer;
