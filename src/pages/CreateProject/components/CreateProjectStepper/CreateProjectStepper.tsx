import { Paper, Step, StepLabel, Stepper, Box, Grid } from "@mui/material";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { steps } from "./utils";

const CreateProjectStepper = () => {
  const { step } = useParams();

  const [activeStep, setActiveStep] = useState<number>(Number(step) || 0);

  useEffect(() => {
    setActiveStep(Number(step));
  }, [step]);
  return (
    <Paper
      sx={{
        p: 4,
      }}
    >
      <Grid container spacing={3}>
        <Grid item lg={12}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item lg={12}>
          <Box>{steps[activeStep].element}</Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CreateProjectStepper;
