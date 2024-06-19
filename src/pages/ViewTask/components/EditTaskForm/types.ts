import { GetTaskByUuidResponse } from "../../../../services/tasks/tasks.types";

export type Props = {
  task: GetTaskByUuidResponse;
};

export type FormValues = {
  assignedAt: string;
};
