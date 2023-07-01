import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, Container, Divider, Grid, Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import useUserRestaurantContainer from "../../../containers/user/restaurants/useUserRestaurantContainer";
import Loading from "../../../components/general/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth } from "../../../contexts/AuthContext";
import BookDialog from "../../../components/pages/user/restaurants/BookDialog";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import IconLink from "../../../components/pages/user/restaurants/IconLink";
import IconText from "../../../components/pages/user/restaurants/IconText";
import ReviewCard from "../../../components/pages/user/restaurants/ReviewCard";

const UserRestaurant = () => {
  const { restaurantId } = useParams();
  const {
    pageLoading,
    restaurant,
    reviews,
    fetchReviews,
    count,
    handleBook,
    setShowDialog,
    showDialog,
    date,
    setDate,
  } = useUserRestaurantContainer(restaurantId);
  const { user } = useAuth();

  return (
    <Container maxWidth="xl">
      {pageLoading ? (
        <Loading height="70vh" />
      ) : (
        <>
          <Card sx={{ my: 2 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={restaurant.image}
              title={restaurant.name}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="primary"
              >
                {restaurant.name}
              </Typography>
              <IconLink
                text={restaurant.email}
                href={`mailto:${restaurant.email}`}
                Icon={EmailIcon}
              />

              <IconLink
                text={restaurant.phoneNumber}
                href={`tel:${restaurant.phoneNumber}`}
                Icon={CallIcon}
              />

              <IconText text={restaurant.address} Icon={LocationOnIcon} />

              {restaurant.numOfReviews === 0 ? (
                <Typography variant="subtitle1" component="div">
                  No reviews yet
                </Typography>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Rating readOnly defaultValue={restaurant.rating} />
                  <Typography variant="subtitle1" component="div">
                    ({restaurant.numOfReviews} users)
                  </Typography>
                </Box>
              )}
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                disabled={restaurant.bookingList.find(
                  (book: any) => book === user._id
                )}
                size="small"
                variant="contained"
                onClick={() => setShowDialog(true)}
              >
                {restaurant.bookingList.find((book: any) => book === user._id)
                  ? "Booked"
                  : "Book a Table"}
              </Button>
            </CardActions>
            {restaurant.numOfReviews > 0 && (
              <CardContent sx={{ mb: 3 }}>
                <Divider />
                <Typography
                  variant="h6"
                  component="div"
                  color="primary"
                  sx={{ my: 1 }}
                >
                  Reviews
                </Typography>
                <InfiniteScroll
                  dataLength={reviews.length}
                  next={fetchReviews}
                  hasMore={reviews.length < count} // Replace with a condition based on your data source
                  loader={<Loading height="30vh" />}
                  style={{ overflow: "auto" }}
                >
                  <Grid container spacing={3} sx={{ pt: 3 }}>
                    {reviews.map((res: any) => (
                      <Grid key={res._id} item xs={12} lg={6}>
                        <ReviewCard res={res} />
                      </Grid>
                    ))}
                  </Grid>
                </InfiniteScroll>
              </CardContent>
            )}
          </Card>
          <BookDialog
            handleBook={handleBook}
            open={showDialog}
            setOpen={setShowDialog}
            date={date}
            setDate={setDate}
          />
        </>
      )}
    </Container>
  );
};

export default UserRestaurant;
