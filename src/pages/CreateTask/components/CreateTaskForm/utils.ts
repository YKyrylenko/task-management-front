import { PRIORITY } from "./types";

export const priorityOptions = Object.values(PRIORITY).map((el) => ({
  label: el,
  value: el,
}));
