import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import SearchInput from "../../../components/general/SearchInput";
import Table from "../../../components/general/Table";
import withRestaurant from "../../../routes/withRestaurant";
import { useParams } from "react-router-dom";

import ReservationRow from "../../../components/pages/restaurant/reservation/ReservationRow";
import useRestaurantReservationsContainer from "../../../containers/restaurant/reservations/useRestaurantReservationsContainer";
import { reservationStatus } from "../../../utils/constants";

const RestaurantReservations = () => {
  const { restaurantId } = useParams();
  const {
    reservations,
    searchLoading,
    handleSearch,
    handleChangePage,
    searchValue,
    page,
    rowsPerPage,
    count,
    handleStatus,
    tableHeads,

    handleFilter,
    status,
  } = useRestaurantReservationsContainer(restaurantId);

  return (
    <Container maxWidth="xl">
      <Typography
        component="h6"
        variant="h6"
        sx={{ fontWeight: "700", my: 1 }}
        color="primary"
      >
        Reservations
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <SearchInput
          searchValue={searchValue}
          handleSearch={handleSearch}
          fullWidth
        />

        <FormControl sx={{ minWidth: "150px", ml: 1 }} size="small">
          <InputLabel>Filter by Status</InputLabel>
          <Select
            label="Filter by Status"
            onChange={handleFilter}
            value={status}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value={reservationStatus.cancelled}>Cancelled</MenuItem>
            <MenuItem value={reservationStatus.pending}>Pending</MenuItem>
            <MenuItem value={reservationStatus.accepted}>Accepted</MenuItem>
            <MenuItem value={reservationStatus.done}>Done</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Table
        rows={reservations}
        heads={tableHeads}
        Row={
          <ReservationRow
            actions={{
              handleStatus,
            }}
          />
        }
        count={count}
        name="reservations"
        loading={searchLoading}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
      />
    </Container>
  );
};

export default withRestaurant(RestaurantReservations);
