import { User } from "../../../../services/users/users.types";

export const options = (users: User[]) =>
  users.map((user) => ({
    label: user.name,
    value: user.uuid,
  }));
