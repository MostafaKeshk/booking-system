import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { MultiSelect } from "../../utils/constants";

type IProps = {
  text: any;
  selectedRows?: any[];
  handleOpenDelete?: any;
};

const Title: React.FC<IProps> = ({ text, selectedRows, handleOpenDelete }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
      <Typography
        component="h6"
        variant="h6"
        sx={{ fontWeight: "700" }}
        color="primary"
      >
        {selectedRows && selectedRows.length > 0
          ? `${selectedRows.length} ${text}`
          : `${text}`}
      </Typography>

      {selectedRows && selectedRows.length > 0 && (
        <Box sx={{ display: "flex", ml: 2 }}>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => handleOpenDelete(MultiSelect)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default Title;
