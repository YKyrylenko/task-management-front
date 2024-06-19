import { Button, Container, Grid, Paper, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { FormValues } from "./types";
import { useAuthService } from "../../services/auth/auth.service";

const SignIn = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  const { signIn } = useAuthService();

  const onSubmit = (values: FormValues) => {
    signIn(values);
  };

  return (
    <Container
      sx={{
        marginY: 10,
      }}
    >
      <Paper sx={{ padding: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item lg={12}>
              <TextField label="Email" {...register("email")} />
            </Grid>
            <Grid item lg={12}>
              <TextField label="Password" {...register("password")} />
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained">
                Log In
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;
