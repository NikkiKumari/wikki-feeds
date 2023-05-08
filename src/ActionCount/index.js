import React from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";

export const ActionCount = (props) => {
const {actions, header} = props;
return (
  <TableContainer>
  <Table sx={{ minWidth: 650 }}>
    <TableHead>
      <TableRow>
        <TableCell>{header}</TableCell>
        <TableCell align="center">Count</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {Object.keys(actions).map((keys) => (
        <TableRow
          key={keys}
        >
          <TableCell scope="row">
            {keys}
          </TableCell>
          <TableCell align="center">{actions[keys]}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
);
};

export default ActionCount