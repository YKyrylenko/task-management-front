import { User } from "../users/users.types";

export type Project = {
  uuid: string;
  name: string;
  taskPrefix: string;
  creatorUuid: string;
  description: string;
  participant: User[];
};

export type CreateProjectRequest = {
  name: string;
  description: string;
  taskPrefix: string;
  participantUuids: string[];
  columns: {
    name: string;
    order: number;
  }[];
};
