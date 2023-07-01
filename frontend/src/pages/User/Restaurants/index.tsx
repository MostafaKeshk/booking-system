import { Box, Container, Grid, Typography } from "@mui/material";
import withUser from "../../../routes/withUser";
import useUserRestaurantsContainer from "../../../containers/user/restaurants/useUserRestaurantsContainer";
import Loading from "../../../components/general/Loading";
import RestaurantCard from "../../../components/pages/user/restaurants/Card";
import EmptyMessage from "../../../components/general/EmptyMessage";
import SearchInput from "../../../components/general/SearchInput";
import InfiniteScroll from "react-infinite-scroll-component";

const UserRestaurants = () => {
  const {
    handleSearch,
    restaurants,
    searchValue,
    searchLoading,
    count,
    fetchData,
    handleRestaurant,
  } = useUserRestaurantsContainer();

  return (
    <Container maxWidth="xl" sx={{ pt: 3, pb: 6 }}>
      <Typography
        component="h1"
        variant="h1"
        color="primary"
        sx={{ fontWeight: "bold", fontSize: "18px", mb: 1 }}
      >
        Restaurants
      </Typography>
      <SearchInput
        fullWidth
        searchValue={searchValue}
        handleSearch={handleSearch}
      />
      {searchLoading ? (
        <Loading height="70vh" />
      ) : count > 0 ? (
        <Box sx={{ mb: 3 }}>
          <InfiniteScroll
            dataLength={restaurants.length}
            next={fetchData}
            hasMore={restaurants.length < count} // Replace with a condition based on your data source
            loader={<Loading height="30vh" />}
          >
            <Grid container spacing={3} sx={{ pt: 3 }}>
              {restaurants.map((res: any) => (
                <Grid key={res._id} item xs={12} lg={6}>
                  <RestaurantCard
                    restaurant={res}
                    handleRestaurant={handleRestaurant}
                  />
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        </Box>
      ) : (
        <EmptyMessage name="restaurnt" />
      )}
    </Container>
  );
};

export default withUser(UserRestaurants);
