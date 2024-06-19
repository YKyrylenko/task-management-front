import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { Button, Grid, MenuItem, OutlinedInput, Select } from "@mui/material";
import { options } from "./utils";
import { Controller, useForm } from "react-hook-form";
import { createProjectStep2 } from "../../../../features/projects/projectsSlice";
import { FormValues } from "./types";
import { useNavigate } from "react-router-dom";
import { useUsersService } from "../../../../services/users/user.service";

const CreateProjectStepperStep2 = () => {
  const { isLoading, users, getUsers } = useUsersService();

  const { participant } = useSelector(
    (state: RootState) => state.projects.project
  );

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      participantUuids: participant || [],
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values: any) => {
    dispatch(createProjectStep2(values));
    navigate("/projects/create/2", {
      replace: true,
    });
  };

  const handleBack = () => {
    navigate("/projects/create/0", {
      replace: true,
    });
  };

  useEffect(() => {
    if (!users.length) {
      getUsers();
    }
  }, [getUsers, users]);

  return isLoading ? (
    <>loading...</>
  ) : users?.length ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item lg={12}>
          <Controller
            control={control}
            name="participantUuids"
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  multiple
                  onChange={onChange}
                  value={value}
                  input={<OutlinedInput />}
                  sx={{
                    width: "300px",
                  }}
                >
                  <MenuItem disabled value="">
                    Placeholder
                  </MenuItem>
                  {options(users).map((option) => (
                    <MenuItem key={option.label} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              );
            }}
          />
        </Grid>
        <Grid item lg={12}>
          <Grid container>
            <Grid item lg={6}>
              <Button onClick={handleBack}> Back</Button>
            </Grid>
            <Grid item lg={6}>
              <Button type="submit" variant="contained">
                Next
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  ) : (
    <>no users</>
  );
};

export default CreateProjectStepperStep2;
