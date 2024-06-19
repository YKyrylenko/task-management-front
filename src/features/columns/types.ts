import { Column } from "../../services/columns/columns.types";

export type ColumnsState = {
  columns: Column[];
  isLoading: boolean;
  errors: string;
};

const COLUMNS = "columns";

export const GET_COLUMNS_BY_PROJECT_UUID = `${COLUMNS}/getColumnsByProjectUuidAction`;
