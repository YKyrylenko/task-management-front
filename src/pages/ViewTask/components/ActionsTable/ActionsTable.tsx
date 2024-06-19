import React, { FC } from "react";
import { Props } from "./types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ActionsTableItem from "./components/ActionsTableItem";

const ActionsTable: FC<Props> = ({ actions }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Updated By</TableCell>
          <TableCell>Assignee</TableCell>
          <TableCell>Column</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {actions.map((action) => (
          <ActionsTableItem action={action} key={action.uuid} />
        ))}
      </TableBody>
    </Table>
  );
};

export default ActionsTable;
