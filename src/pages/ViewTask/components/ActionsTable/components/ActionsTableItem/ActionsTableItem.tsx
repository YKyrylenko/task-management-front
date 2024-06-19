import React, { FC } from "react";
import { Props } from "./types";
import { TableCell, TableRow } from "@mui/material";
import { ACTION_TYPES } from "../../../../../../services/tasks/tasks.types";
import { format } from "date-fns";

const ActionsTableItem: FC<Props> = ({ action }) => {
  return (
    <TableRow>
      <TableCell>{format(action.createdAt, "d/MMMM/yyyy HH:mm:ss")}</TableCell>
      <TableCell>{`${action.createdBy.name} ${action.createdBy.surname}`}</TableCell>
      <TableCell>{`${action.assignee.name} ${action.assignee.surname}`}</TableCell>
      <TableCell>{`${
        action.type === ACTION_TYPES.CHANGE_STATUS && action.prevColumn.name
      } ${action.currentColumn.name}`}</TableCell>
    </TableRow>
  );
};

export default ActionsTableItem;
