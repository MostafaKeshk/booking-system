import { Box, CircularProgress } from "@mui/material";

type IProps = {
  height?: any;
  size?: any;
};

const Loading: React.FC<IProps> = ({ height = "100vh", size = 60 }) => {
  const classes = {
    loadingContainer: {
      height,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
  return (
    <Box sx={classes.loadingContainer}>
      <CircularProgress color="primary" size={size} />
    </Box>
  );
};

export default Loading;
