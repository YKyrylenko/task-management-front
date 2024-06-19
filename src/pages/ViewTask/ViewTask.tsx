import { Container, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTasksService } from "../../services/tasks/tasks.service";
import ActionsTable from "./components/ActionsTable";
import EditTaskForm from "./components/EditTaskForm";

const ViewTask = () => {
  const { taskUuid } = useParams();

  const { getTaskByUuid, viewTask, isLoading } = useTasksService();

  useEffect(() => {
    if (taskUuid) {
      getTaskByUuid(taskUuid);
    }
  }, [taskUuid, getTaskByUuid]);

  return isLoading ? (
    <>Loading...</>
  ) : (
    <Container sx={{ marginY: 10 }}>
      <Paper sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <Grid container>
              <Grid item lg={12}>
                <Typography> {viewTask?.name}</Typography>
              </Grid>
              <Grid item lg={12}>
                <EditTaskForm task={viewTask || {}} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <ActionsTable actions={viewTask?.actions || []} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ViewTask;
