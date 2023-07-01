import { Container, Grid, Typography } from "@mui/material";
import withUser from "../../routes/withUser";
import { useAuth } from "../../contexts/AuthContext";
import paths from "../../routes/paths";
import HomeCard from "../../components/pages/user/home/Card";

const UserHome = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="xl" sx={{ py: 2, mb: 6 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            sx={{ fontWeight: "700", fontSize: "18px" }}
            color="primary"
            component="h2"
            variant="h2"
          >
            Welcome back, {user.name}
          </Typography>
        </Grid>
        <HomeCard
          path={paths.getUserReservations(user._id)}
          text="Reservations"
        />
        <HomeCard
          path={paths.getUserRestaurants(user._id)}
          text="Restaurants"
        />
        <HomeCard path={paths.getUserHistory(user._id)} text="History" />
        <HomeCard path={paths.getUserSettings(user._id)} text="Settings" />
      </Grid>
    </Container>
  );
};

export default withUser(UserHome);
