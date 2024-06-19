import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { Button, Grid } from "@mui/material";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDispatch } from "react-redux";
import {
  createProjectAction,
  createProjectStep3,
} from "../../../../features/projects/projectsSlice";
import { useNavigate } from "react-router-dom";
import ColumnItem from "../ColumnItem";
import useProjectsService from "../../../../services/projects/projects.service";

const CreateProjectStepperStep3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createProject: project } = useProjectsService();
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 0.01,
      },
    })
  );
  const { control, register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      columns: project.columns.length
        ? project.columns
        : [{ name: "", order: 0 }],
    },
  });

  const { move, append, remove, fields } = useFieldArray({
    name: "columns",
    control: control,
  });

  const onSubmit = (values: FormValues) => {
    dispatch(createProjectStep3(values));
  };

  const handleAddColumn = () => {
    append({ name: "", order: fields.length });
  };

  const handleBack = () => {
    navigate("/projects/create/1", {
      replace: true,
    });
  };

  const handleDeleteColumn = (index: number) => (e: any) => {
    e.stopPropagation();
    remove(index);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const fieldIds = fields.map((item) => item.id);
    if (active.id !== over?.id) {
      const oldIndex = fieldIds.indexOf(String(active.id));
      const newIndex = fieldIds.indexOf(String(over?.id));

      move(oldIndex, newIndex);
    }
  };

  useEffect(() => {
    if (
      project.columns.length &&
      Object.values(project.columns[0]).length === 2
    ) {
      dispatch(createProjectAction({ ...project, navigate }));
    }
  }, [dispatch, project, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
          <SortableContext
            items={fields.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {fields.map((item, index) => {
              return (
                <Grid item lg={12} key={item.id}>
                  <ColumnItem
                    id={item.id}
                    index={index}
                    register={register}
                    value={item.name}
                    onSave={handleAddColumn}
                    onDelete={handleDeleteColumn}
                  />
                </Grid>
              );
            })}
          </SortableContext>
        </DndContext>
        <Grid item lg={12}></Grid>
        <Grid item lg={12}>
          <Grid container spacing={2}>
            <Grid item>
              <Button onClick={handleBack}> Back</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit">
                Create Project
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateProjectStepperStep3;
