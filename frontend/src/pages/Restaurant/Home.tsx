import { Box, Grid, Paper, Rating, Typography } from "@mui/material";
import Line from "../../components/pages/restaurant/home/Line";
import useRestaurantHomeContainer from "../../containers/restaurant/home/useRestaurantHomeContainer";
import Loading from "../../components/general/Loading";
import Doughnut from "../../components/pages/restaurant/home/Doughnut";
import DoneIcon from "@mui/icons-material/Done";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import InfoCard from "../../components/general/InfoCard";
import { useParams } from "react-router-dom";
import withRestaurant from "../../routes/withRestaurant";

import { useAuth } from "../../contexts/AuthContext";
import Title from "../../components/general/Title";

const RestaurantHome = () => {
  const { restaurantId } = useParams();
  const { user } = useAuth();
  const { data, dataLoading } = useRestaurantHomeContainer(restaurantId);

  return (
    <Box sx={{ py: 2 }}>
      <Title text={`Welcome back, ${user.name}`} />
      {dataLoading ? (
        <Loading height="40vh" />
      ) : (
        <>
          <Paper>
            <Grid container sx={{ mt: 2 }}>
              <Grid item xs={12} lg={3}>
                <InfoCard
                  Icon={DoneIcon}
                  title="Done Reservations"
                  info={data.doneReservations}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <InfoCard
                  Icon={ThumbUpAltIcon}
                  title="Accepted Reservations"
                  info={data.acceptedReservations}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <InfoCard
                  Icon={PendingIcon}
                  title="Pending Reservations"
                  info={data.pendingReservations}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <InfoCard
                  Icon={CancelIcon}
                  title="Cancelled Reservations"
                  info={data.canceledReservations}
                />
              </Grid>
            </Grid>
          </Paper>

          <Grid container sx={{ mt: 0 }} spacing={2}>
            <Grid item xs={12} lg={8}>
              <Paper sx={{ p: 2, pr: 1, pb: 1 }}>
                <Typography
                  component="h2"
                  variant="h6"
                  sx={{ mb: 2, fontWeight: "bold" }}
                >
                  Done Reservations vs. Cancelled Reservations.
                </Typography>
                <Line
                  data1={data.doneChartData}
                  data2={data.canceledChartData}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Paper
                sx={{
                  p: 2,
                  pr: 1,
                  pb: 1,
                  height: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                  <Typography
                    component="h2"
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                  >
                    Stars Review
                  </Typography>
                  <Rating value={user.rating} readOnly sx={{ mx: 1 }} />
                  <Typography
                    component="p"
                    color="text.secondary"
                    variant="subtitle2"
                    sx={{ mr: 2 }}
                  >
                    ({user.numOfReviews} users)
                  </Typography>
                </Box>

                <Doughnut chartData={data.starsChartData} />
                <Box />
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default withRestaurant(RestaurantHome);
