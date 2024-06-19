import React, { FC } from "react";
import { Props } from "./types";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { stringAvatar } from "../../../../utils/stringAvatar";
const ProjectTask: FC<Props> = ({
  task: {
    name,
    number,
    assignee: { name: userName, surname },
  },
}) => {
  return (
    <Box
      bgcolor={"#ffffff"}
      marginY={1}
      borderRadius={1}
      padding={1}
      boxShadow="0px 0px 4px 0px rgba(0,0,0,0.1)"
    >
      <Grid container>
        <Grid item lg={12}>
          <Typography color="initial">{name}</Typography>
        </Grid>
        <Grid item lg={12}>
          <Grid container>
            <Grid item lg>
              <Typography color="initial">{number}</Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{ width: 24, height: 24, fontSize: 12 }}
                {...stringAvatar(userName, surname)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectTask;
