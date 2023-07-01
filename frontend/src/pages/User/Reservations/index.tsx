import { Box, Container, Grid, Typography } from "@mui/material";
import withUser from "../../../routes/withUser";
import useUserReservationsContainer from "../../../containers/user/reservations/useUserReservationsContainer";
import Loading from "../../../components/general/Loading";
import ReservationCard from "../../../components/pages/user/reservations/Card";
import EmptyMessage from "../../../components/general/EmptyMessage";
import InfiniteScroll from "react-infinite-scroll-component";
import AlertDialog from "../../../components/general/AlertDialog";
import SearchInput from "../../../components/general/SearchInput";

const UserReservations = () => {
  const {
    reservations,
    searchLoading,
    count,
    fetchData,
    handleOpenCancel,
    showCancelModal,
    setShowCancelModal,
    selectedReservation,
    handleCancel,
    loading,
    searchValue,
    handleSearch,
  } = useUserReservationsContainer();

  return (
    <Container maxWidth="xl" sx={{ pt: 3, pb: 6 }}>
      <Typography
        component="h1"
        variant="h1"
        color="primary"
        sx={{ fontWeight: "bold", fontSize: "18px", mb: 1 }}
      >
        Reservations
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
            dataLength={reservations.length}
            next={fetchData}
            hasMore={reservations.length < count} // Replace with a condition based on your data source
            loader={<Loading height="30vh" />}
          >
            <Grid container spacing={3} sx={{ pt: 3 }}>
              {reservations.map((res: any) => (
                <Grid key={res._id} item xs={12} lg={6}>
                  <ReservationCard
                    reservation={res}
                    handleOpenCancel={handleOpenCancel}
                  />
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        </Box>
      ) : (
        <EmptyMessage name="reservation" />
      )}
      <AlertDialog
        title="Cancel reservation"
        description={`Are you sure you want to cancel your reservation at (${selectedReservation?.restaurant?.name})?`}
        open={showCancelModal}
        handleClose={() => setShowCancelModal(false)}
        onAgree={handleCancel}
        loading={loading}
        agreeText="Cancel Reservation"
        disagreeText="Close"
      />
    </Container>
  );
};

export default withUser(UserReservations);
