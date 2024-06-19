import { PRIORITY } from "../../pages/CreateTask/components/CreateTaskForm/types";
import { Column } from "../columns/columns.types";
import { User } from "../users/users.types";

export enum ACTION_TYPES {
  CREATE = "CREATE",
  CHANGE_STATUS = "CHANGE_STATUS",
  LOG_TIME = "LOG_TIME",
}

export type Action = {
  createdBy: Pick<User, "name" | "surname">;
  createdAt: string;
  updatedAt: string;
  uuid: string;
  assignee: Pick<User, "name" | "surname">;
  currentColumn: Pick<Column, "name">;
} & (
  | {
      prevColumn: Pick<Column, "name">;
      type: ACTION_TYPES.CHANGE_STATUS;
    }
  | {
      type: ACTION_TYPES.CREATE;
    }
);

export type Task = {
  uuid: string;
  name: string;
  projectUuid: string;
  number: string;
  assignee: User;
};

export type CreateTaskRequest = {
  name: string;
  description: string;
  priority: PRIORITY;
  assignedAt: string;
  estimatedTime: number;
  projectUuid: string;
  columnUuid: string;
};

export type GetTaskByUuidResponse = Task & { actions: Action[] };

export type UpdateTaskRequest = {
  uuid: string;
  assignedAt: string;
};
