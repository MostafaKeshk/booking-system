import {
  Box,
  Container,
  Pagination,
  Typography,
  useTheme,
} from "@mui/material";
import withRestaurant from "../../../routes/withRestaurant";
import useRestaurantReviewsContainer from "../../../containers/restaurant/reviews/useRestaurantReviewsContainer";
import Loading from "../../../components/general/Loading";
import EmptyMessage from "../../../components/general/EmptyMessage";
import SearchInput from "../../../components/general/SearchInput";
import ReviewCard from "../../../components/pages/restaurant/review/Card";
import { Masonry } from "@mui/lab";
import { useParams } from "react-router-dom";

const RestaurantReviews = () => {
  const { restaurantId } = useParams();
  const theme = useTheme();
  const classes = {
    masonry: {
      pt: 3,
      [theme.breakpoints.up("xs")]: {
        "& .MuiCard-root": {
          width: "100%",
        },
      },
      [theme.breakpoints.up("lg")]: {
        "& .MuiCard-root": {
          width: `calc(50.00% - 12px)`,
        },
      },
    },
  };
  const {
    reviews,
    searchLoading,
    handleSearch,
    handleChangePage,
    searchValue,
    page,
    rowsPerPage,
    count,
  } = useRestaurantReviewsContainer(restaurantId);

  return (
    <Container maxWidth="xl" sx={{ pt: 3, pb: 6 }}>
      <Typography
        component="h1"
        variant="h1"
        color="primary"
        sx={{ fontWeight: "bold", fontSize: "18px", mb: 1 }}
      >
        Reviews
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
          <Masonry columns={{ xs: 1, lg: 2 }} spacing={3} sx={classes.masonry}>
            {reviews.map((review: any) => (
              <ReviewCard review={review} />
            ))}
          </Masonry>
          {count > rowsPerPage && (
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Pagination
                count={reviews ? Math.ceil(count / rowsPerPage) : 1}
                variant="outlined"
                onChange={handleChangePage}
                page={page + 1}
                sx={{ mt: 2 }}
                color="primary"
              />
            </Box>
          )}
        </Box>
      ) : (
        <EmptyMessage name="reviews" />
      )}
    </Container>
  );
};

export default withRestaurant(RestaurantReviews);
