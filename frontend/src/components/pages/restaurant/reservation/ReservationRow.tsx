import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Box, CircularProgress } from "@mui/material";
import UserProfile from "../../../general/UserProfile";
import ChangeStatus from "./ChangeStatus";
import { useState } from "react";
import { viewDate } from "../../../../utils/viewDate";

type IProps = {
  row?: any;
  actions: {
    handleStatus: any;
  };
};

const classes = {
  row: {
    fontWeight: "bold",
    fontSize: 14,
    px: 1,
  },
};

const ReservationRow: React.FC<IProps> = ({ row, actions }) => {
  const [selectedStatus, setSelectedStatus] = useState(row.status);
  const [loading, setLoading] = useState(false);

  const onChange = (e: any) => {
    const value = e.target.value;
    actions.handleStatus(row._id, value, setSelectedStatus, setLoading);
  };

  return (
    <TableRow>
      <TableCell sx={classes.row}>
        <UserProfile image={row.user.image} name={row.user.name} />
      </TableCell>

      <TableCell sx={classes.row}>{row.user.phoneNumber}</TableCell>
      <TableCell sx={classes.row}>{row.user.email}</TableCell>
      <TableCell sx={classes.row}>{viewDate(row.createdAt)}</TableCell>
      <TableCell sx={classes.row}>{viewDate(row.date)}</TableCell>

      <TableCell sx={classes.row}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {loading ? (
            <CircularProgress size={15} />
          ) : (
            <ChangeStatus
              onChange={onChange}
              selectedStatus={selectedStatus}
              label="Change Status"
            />
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default ReservationRow;
