import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type IProps = {
  name: string;
  type: string;
  setOpenDeleteDialog?: any;
  handleEdit?: any;
};

const ViewActions: React.FC<IProps> = ({
  name,
  type,
  setOpenDeleteDialog,
  handleEdit,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
        {type} Details (
        <Typography
          sx={{ fontSize: "18px", fontWeight: "bold" }}
          color="primary"
          component="span"
        >
          {name}
        </Typography>
        ):
      </Typography>
      <Box>
        {!!handleEdit && (
          <Tooltip title="Edit">
            <IconButton
              color="secondary"
              aria-label="Edit"
              onClick={handleEdit}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}

        {!!setOpenDeleteDialog && (
          <Tooltip title="Delete">
            <IconButton
              aria-label="Delete"
              color="error"
              onClick={() => setOpenDeleteDialog(true)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default ViewActions;
