import { Button, Container, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import paths from "../routes/paths";
import { isRestaurant, isUser } from "../routes/utils";

type IProps = {
  message: string;
  pageHasHeader?: boolean;
};

const NotFound: React.FC<IProps> = ({ message, pageHasHeader = true }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const path = isUser(user)
    ? paths.getUser(user._id)
    : isRestaurant(user)
    ? paths.getRestaurant(user._id)
    : paths.admin;

  const classes = {
    center: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: pageHasHeader ? "91vh" : "100vh",
      flexDirection: "column",
    },
  };
  return (
    <Container sx={classes.center}>
      <ErrorOutlineIcon sx={{ fontSize: 100, mb: 1 }} />
      <Typography component="h1" variant="h4">
        {message}
      </Typography>
      <Button variant="contained" sx={{ mt: 1 }} onClick={() => navigate(path)}>
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;
