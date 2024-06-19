import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormValues, PRIORITY, Props } from "./types";
import {
  Button,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { priorityOptions } from "./utils";
import { options } from "../../../CreateProject/components/CreateProjectStepperStep2/utils";
import { useTasksService } from "../../../../services/tasks/tasks.service";
import { useNavigate } from "react-router-dom";
import useProjectsService from "../../../../services/projects/projects.service";

const CreateTaskForm: FC<Props> = ({ columnUuid, projectUuid }) => {
  const navigate = useNavigate();
  const { participants } = useProjectsService();
  const { createTask } = useTasksService();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      assignedAt: "",
      estimatedTime: 0,
      description: "",
      priority: PRIORITY.CLEAR,
    },
  });

  const onSubmit = (values: FormValues) => {
    createTask({
      ...values,
      columnUuid,
      projectUuid,
      navigate,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <TextField
            label="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item lg={12}>
          <TextField
            label="Description"
            {...register("description")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item lg={12}>
          <Controller
            name="priority"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  onChange={onChange}
                  value={value}
                  input={<OutlinedInput />}
                >
                  {priorityOptions.map((option) => (
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
                  {options(participants || []).map((option) => (
                    <MenuItem value={option.value}> {option.label}</MenuItem>
                  ))}
                </Select>
              );
            }}
          />
        </Grid>
        <Grid item lg={12}>
          <TextField
            label="Estimated Time"
            {...register("estimatedTime")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item lg={12}>
          <Button variant="contained" type="submit">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateTaskForm;
