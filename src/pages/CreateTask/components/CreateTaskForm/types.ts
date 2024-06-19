export type FormValues = {
  name: string;
  description: string;
  priority: PRIORITY;
  assignedAt: string;
  estimatedTime: number;
};
export type Props = {
  projectUuid: string;
  columnUuid: string;
};

export enum PRIORITY {
  CLEAR = "CLEAR",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}
