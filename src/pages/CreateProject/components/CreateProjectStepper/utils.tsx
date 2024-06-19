import CreateProjectStepperStep1 from "../CreateProjectStepperStep1";
import CreateProjectStepperStep2 from "../CreateProjectStepperStep2";
import CreateProjectStepperStep3 from "../CreateProjectStepperStep3";

type Step = {
  element: React.ReactElement;
  label: string;
};

export const steps: Step[] = [
  {
    element: <CreateProjectStepperStep1 />,
    label: "Common",
  },
  {
    element: <CreateProjectStepperStep2 />,
    label: "Participants",
  },
  {
    element: <CreateProjectStepperStep3 />,
    label: "Columns",
  },
];
