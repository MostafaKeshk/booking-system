import { Box, Typography } from "@mui/material";

type IProps = {
  name: string;
};

const EmptyMessage: React.FC<IProps> = ({ name }) => {
  const classes = {
    container: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "60vh",
      width: "100%",
    },
    inner: {
      width: "50%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      minWidth: "250px",
    },
    text: {
      fontSize: "16px",
      fontWeight: "700",
      mt: 2,
      textAlign: "center",
    },
  };

  return (
    <Box sx={classes.container}>
      <Box sx={classes.inner}>
        <Typography sx={classes.text} color="primary" component="h6">
          {`There are no ${name} to show.`}
        </Typography>
      </Box>
    </Box>
  );
};

export default EmptyMessage;
