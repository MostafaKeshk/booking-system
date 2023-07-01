import { Box, Container, Typography, useTheme } from "@mui/material";
import withUser from "../../../routes/withUser";
import useUserHistoryContainer from "../../../containers/user/history/useUserHistoryContainer";
import Loading from "../../../components/general/Loading";
import EmptyMessage from "../../../components/general/EmptyMessage";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchInput from "../../../components/general/SearchInput";
import ReservationHistoryCard from "../../../components/pages/user/history/Card";
import ReviewDialog from "../../../components/pages/user/history/ReviewDialog";
import { Masonry } from "@mui/lab";

const UserHistory = () => {
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
    loading,
    reservations,
    searchLoading,
    count,
    fetchData,
    handleOpenReview,
    showReviewModal,
    setShowReviewModal,
    formik,
    searchValue,
    handleSearch,
  } = useUserHistoryContainer();

  return (
    <Container maxWidth="xl" sx={{ pt: 3, pb: 6 }}>
      <Typography
        component="h1"
        variant="h1"
        color="primary"
        sx={{ fontWeight: "bold", fontSize: "18px", mb: 1 }}
      >
        History
      </Typography>
      <SearchInput
        fullWidth
        searchValue={searchValue}
        handleSearch={handleSearch}
      />
      {searchLoading ? (
        <Loading height="70vh" />
      ) : count > 0 ? (
        <Box sx={{ my: 3 }}>
          <InfiniteScroll
            dataLength={reservations.length}
            next={fetchData}
            hasMore={reservations.length < count}
            loader={<Loading height="30vh" />}
            style={{ overflow: "initial" }}
          >
            <Masonry
              columns={{ xs: 1, lg: 2 }}
              spacing={3}
              sx={classes.masonry}
            >
              {reservations.map((res: any) => (
                <ReservationHistoryCard
                  reservation={res}
                  handleOpenReview={handleOpenReview}
                />
              ))}
            </Masonry>
          </InfiniteScroll>
        </Box>
      ) : (
        <EmptyMessage name="reservation" />
      )}
      <ReviewDialog
        open={showReviewModal}
        setOpen={setShowReviewModal}
        formik={formik}
        loading={loading}
      />
    </Container>
  );
};

export default withUser(UserHistory);
