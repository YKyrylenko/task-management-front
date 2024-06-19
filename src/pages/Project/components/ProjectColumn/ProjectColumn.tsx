import React, { FC } from "react";
import { Props } from "./types";
import { SortableContext } from "@dnd-kit/sortable";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDroppable } from "@dnd-kit/core";
import AddIcon from "@mui/icons-material/Add";
import SortableProjectTask from "../SortableProjectTask";

const ProjectColumn: FC<Props> = ({
  column: { name, tasks, uuid },
  projectUuid,
}) => {
  const { setNodeRef } = useDroppable({
    id: uuid,
  });

  return (
    <Box
      width={300}
      bgcolor="#f4f5f7"
      borderRadius={1}
      padding={1}
      marginX={2}
      height={`calc(100vh - 104px)`}
    >
      <Grid container height="100%" display="flex" direction="column">
        <Grid item>
          <Typography>{name} </Typography>
        </Grid>
        <Grid item flexGrow={1}>
          <SortableContext items={tasks.map(({ uuid }) => uuid)}>
            <Box ref={setNodeRef} height="100%">
              {tasks.map((task) => {
                return (
                  <SortableProjectTask
                    task={task}
                    key={task.uuid}
                    projectUuid={projectUuid}
                  />
                );
              })}
            </Box>
          </SortableContext>
        </Grid>
        <Grid item>
          <Link to={`/project/${projectUuid}/column/${uuid}`}>
            <IconButton>
              <AddIcon />
            </IconButton>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectColumn;
