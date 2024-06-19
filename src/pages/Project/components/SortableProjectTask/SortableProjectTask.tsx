import React, { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { Box } from "@mui/material";
import { Props } from "./types";
import { CSS } from "@dnd-kit/utilities";
import ProjectTask from "../ProjectTask";
import { Link } from "react-router-dom";

const SortableProjectTask: FC<Props> = ({ task, projectUuid }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.uuid,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Link to={`/project/${projectUuid}/task/${task.uuid}`}>
      <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <ProjectTask task={task} />
      </Box>
    </Link>
  );
};

export default SortableProjectTask;
