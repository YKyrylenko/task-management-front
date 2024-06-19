import React, { FC } from "react";
import { Props } from "./types";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ColumnItem: FC<Props> = ({
  value,
  id,
  index,
  register,
  onSave,
  onDelete,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return value ? (
    <Grid
      container
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <Grid item>
        <Box
          sx={{
            borderEndStartRadius: 4,
            borderColor: "#111111",
          }}
        >
          {value}
        </Box>
      </Grid>
      <Grid item>
        <IconButton onClick={onDelete(index)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  ) : (
    <Grid container>
      <Grid item>
        <TextField
          placeholder="Column name"
          {...register(`columns.${index}.name`)}
        />
      </Grid>
      <Grid item>
        <IconButton onClick={onSave}>
          <CheckIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ColumnItem;
