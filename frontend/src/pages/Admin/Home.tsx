import { Container, Grid, Typography } from "@mui/material";
import withAdmin from "../../routes/withAdmin";
import { useAuth } from "../../contexts/AuthContext";
import paths from "../../routes/paths";
import HomeCard from "../../components/pages/user/home/Card";

const AdminHome = () => {
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
          path={paths.getAdminRestaurants(user._id)}
          text="Restaurants"
        />
        <HomeCard path={paths.getAdminUsers(user._id)} text="Users" />
      </Grid>
    </Container>
  );
};

export default withAdmin(AdminHome);
