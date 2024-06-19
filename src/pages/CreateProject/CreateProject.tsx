import React from "react";
import CreateProjectStepper from "./components/CreateProjectStepper";
import { Container } from "@mui/material";

const CreateProject = () => {
  return (
    <Container
      sx={{
        my: 10,
      }}
    >
      <CreateProjectStepper />
    </Container>
  );
};

export default CreateProject;
