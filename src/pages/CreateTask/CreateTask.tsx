import { Container, Paper, Typography } from "@mui/material";
import React from "react";
import CreateTaskForm from "./components/CreateTaskForm/CreateTaskForm";
import { useParams } from "react-router-dom";

const CreateTask = () => {
  const { uuid: projectUuid, columnUuid } = useParams<{
    uuid: string;
    columnUuid: string;
  }>();

  return (
    <Container
      sx={{
        paddingY: 10,
      }}
    >
      <Paper
        sx={{
          padding: 2,
        }}
      >
        <Typography>Create Task</Typography>
        <CreateTaskForm
          columnUuid={columnUuid || ""}
          projectUuid={projectUuid || ""}
        />
      </Paper>
    </Container>
  );
};

export default CreateTask;
