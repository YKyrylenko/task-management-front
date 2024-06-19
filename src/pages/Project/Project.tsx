import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Container } from "@mui/material";
import ProjectColumn from "./components/ProjectColumn";
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import useProjectsService from "../../services/projects/projects.service";
import { useColumnService } from "../../services/columns/columns.service";
import { useDragAndDrop } from "./useDragAndDrop";
import { createPortal } from "react-dom";
import ProjectTask from "./components/ProjectTask";
import { Task } from "../../services/tasks/tasks.types";
import { dropAnimation } from "./utils";

const Project: FC = () => {
  const { uuid } = useParams<string>();

  const { isLoading, getProject } = useProjectsService();

  const { columns, getColumns } = useColumnService();

  const {
    activeItem,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  } = useDragAndDrop(columns, uuid || "");

  useEffect(() => {
    if (uuid) {
      getProject(uuid);
      getColumns(uuid);
    }
  }, [uuid, getProject, getColumns]);

  return isLoading ? (
    <>...Loading</>
  ) : columns.length ? (
    <Container
      maxWidth={false}
      sx={{
        marginTop: 10,
      }}
    >
      <DndContext
        collisionDetection={closestCorners}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        sensors={sensors}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          {columns.map((column) => (
            <ProjectColumn
              column={column}
              key={column.uuid}
              projectUuid={uuid || ""}
            />
          ))}
        </Box>
        {createPortal(
          <DragOverlay dropAnimation={dropAnimation}>
            <ProjectTask task={activeItem || ({} as Task)} />
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </Container>
  ) : (
    <>No data</>
  );
};

export default Project;
