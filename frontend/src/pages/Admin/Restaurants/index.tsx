import { Box, Button, Container } from "@mui/material";
import AlertDialog from "../../../components/general/AlertDialog";
import SearchInput from "../../../components/general/SearchInput";
import Table from "../../../components/general/Table";
import Title from "../../../components/general/Title";
import RestaurantRow from "../../../components/pages/admin/restaurant/RestaurantRow";
import { MultiSelect } from "../../../utils/constants";
import withAdmin from "../../../routes/withAdmin";
import RestaurantApi from "../../../apis/restaurant";
import useTable from "../../../hooks/useTable";
import { useParams } from "react-router-dom";
import useAdminRestaurantsContainer from "../../../containers/admin/restaurants/useRestaurantsContainer";

const AdminRestaurants = () => {
  const { adminId } = useParams();
  const {
    data: restaurants,
    searchLoading,
    handleSearch,
    handleChangePage,
    handleCheckAll,
    searchValue,
    page,
    rowsPerPage,
    loading: deleteLoading,
    count,
    selectedData: selectedRestaurants,
    handleOpenDelete,
    handleCheckRow,
    handleDelete,
    openDeleteDialog,
    setOpenDeleteDialog,
    selectedItem,
  } = useTable({
    API: RestaurantApi,
    name: "restaurant",
  });

  const { handleAddRestaurant, handleEditRestaurant, tableHeads } =
    useAdminRestaurantsContainer(adminId);

  return (
    <Container maxWidth="xl">
      <Title
        text="Restaurants"
        selectedRows={selectedRestaurants}
        handleOpenDelete={handleOpenDelete}
      />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <SearchInput
          searchValue={searchValue}
          handleSearch={handleSearch}
          fullWidth
        />
        <Button
          variant="contained"
          sx={{ width: "200px", ml: 1 }}
          onClick={handleAddRestaurant}
        >
          Add Restaurant
        </Button>
      </Box>
      <Table
        rows={restaurants}
        heads={tableHeads}
        Row={
          <RestaurantRow
            actions={{
              handleOpenDelete,
              handleEdit: handleEditRestaurant,
            }}
            isSelectable={{
              selectedRows: selectedRestaurants,
              handleCheckRow,
            }}
          />
        }
        count={count}
        name="restaurants"
        loading={searchLoading}
        page={page}
        rowsPerPage={rowsPerPage}
        isSelectable={{
          selectedRows: selectedRestaurants,
          handleCheckAll,
        }}
        handleChangePage={handleChangePage}
      />
      <AlertDialog
        open={openDeleteDialog}
        handleClose={() => setOpenDeleteDialog(false)}
        onAgree={handleDelete}
        loading={deleteLoading}
        agreeText="Delete"
        disagreeText="Cancel"
        description={`Are you sure you want to delete ${
          selectedItem === MultiSelect
            ? "these restaurants"
            : `this ${selectedItem?.name}`
        }?`}
      />
    </Container>
  );
};

export default withAdmin(AdminRestaurants);
