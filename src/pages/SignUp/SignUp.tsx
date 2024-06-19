import React from "react";
import { useForm } from "react-hook-form";
import { FormValues } from "./types";
import { Button, Container, Grid, Paper, TextField } from "@mui/material";
import { useAuthService } from "../../services/auth/auth.service";

const SignUp = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const { signUp } = useAuthService();

  const onSubmit = (values: FormValues) => {
    signUp(values);
  };

  return (
    <Container
      sx={{
        marginY: 10,
      }}
    >
      <Paper
        sx={{
          padding: 2,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item lg={12}>
              <TextField label="Name" {...register("name")} />
            </Grid>
            <Grid item lg={12}>
              <TextField label="Surname" {...register("surname")} />
            </Grid>
            <Grid item lg={12}>
              <TextField label="Email" {...register("email")} />
            </Grid>
            <Grid item lg={12}>
              <TextField label="Password" {...register("password")} />
            </Grid>
            <Grid item lg={12}>
              <Button type="submit" variant="contained">
                SignUp
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
