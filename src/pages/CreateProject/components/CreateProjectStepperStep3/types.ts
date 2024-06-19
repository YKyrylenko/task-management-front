import { Column } from "../../../../services/columns/columns.types";

type CreateColumn = Omit<Column, "uuid" | "tasks">;

export type FormValues = {
  columns: CreateColumn[];
};
