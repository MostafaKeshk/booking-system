import { Box, Typography } from "@mui/material";

type IProps = {
  title: string;
  value: string;
};

const ViewItem: React.FC<IProps> = ({ title, value }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography sx={{ fontSize: "18px", fontWeight: "bold", mr: 1 }}>
        {title}:
      </Typography>
      <Typography sx={{ fontSize: "18px", fontWeight: "bold" }} color="primary">
        {value}
      </Typography>
    </Box>
  );
};

export default ViewItem;
