import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormValues, Props } from "./types";
import { Button, Grid, MenuItem, OutlinedInput, Select } from "@mui/material";
import { options } from "../../../CreateProject/components/CreateProjectStepperStep2/utils";
import useProjectsService from "../../../../services/projects/projects.service";
import { useTasksService } from "../../../../services/tasks/tasks.service";

const EditTaskForm: FC<Props> = ({ task }) => {
  const { participants } = useProjectsService();

  console.log(participants);
  const { updateTaskByUuid } = useTasksService();
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      assignedAt: task?.assignee?.uuid,
    },
  });

  const onSubmit = (values: FormValues) => {
    updateTaskByUuid({
      assignedAt: values.assignedAt,
      uuid: task.uuid,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item lg={12}>
          <Controller
            name="assignedAt"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  onChange={onChange}
                  value={value}
                  input={<OutlinedInput />}
                >
                  {options(participants).map((option) => (
                    <MenuItem value={option.value} key={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              );
            }}
          />
        </Grid>
        <Grid item lg={12}>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditTaskForm;
