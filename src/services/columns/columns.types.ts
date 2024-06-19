import { Task } from "../tasks/tasks.types";

export type Column = {
  uuid: string;
  name: string;
  order: number;
  tasks: Task[];
};
