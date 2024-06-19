import { UseFormRegister } from "react-hook-form";
import { FormValues } from "../CreateProjectStepperStep3/types";

export type Props = {
  value: string;
  id: string;
  index: number;
  register: UseFormRegister<FormValues>;
  onSave: () => void;
  onDelete: (index: number) => (e: any) => void;
};
