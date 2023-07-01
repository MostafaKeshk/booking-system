import { Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type IProps = {
  path: string;
  text: string;
};

const HomeCard: React.FC<IProps> = ({ path, text }) => {
  const navigate = useNavigate();
  const paperClass = {
    borderRadius: 1,
    height: { xs: "100px", lg: "250px" },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };
  return (
    <Grid item xs={12} sm={6} onClick={() => navigate(path)}>
      <Paper elevation={3} sx={paperClass}>
        <Typography
          sx={{ fontWeight: "700", fontSize: "18px" }}
          color="primary"
          component="h2"
          variant="h2"
        >
          {text}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default HomeCard;
