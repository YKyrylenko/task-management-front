import { Button, Grid, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormValues } from "./types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProjectStep1 } from "../../../../features/projects/projectsSlice";
import { FC } from "react";
import { validationSchema } from "./validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import useProjectsService from "../../../../services/projects/projects.service";

const CreateProjectStepperStep1: FC = () => {
  const {
    project: { name, description, taskPrefix },
  } = useProjectsService();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: name || "",
      description: description || "",
      taskPrefix: taskPrefix || "",
    },
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    dispatch(createProjectStep1(values));
    navigate("/projects/create/1", { replace: true });
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
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Grid>
        <Grid item lg={12}>
          <TextField
            label="Task prefix"
            {...register("taskPrefix")}
            error={!!errors.taskPrefix}
            helperText={errors.taskPrefix?.message}
            inputProps={{
              style: { textTransform: "uppercase" },
            }}
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateProjectStepperStep1;
