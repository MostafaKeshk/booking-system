import { Box, Button, Container } from "@mui/material";
import AlertDialog from "../../../components/general/AlertDialog";
import SearchInput from "../../../components/general/SearchInput";
import Table from "../../../components/general/Table";
import Title from "../../../components/general/Title";
import UserRow from "../../../components/pages/admin/user/UserRow";
import { MultiSelect } from "../../../utils/constants";
import withAdmin from "../../../routes/withAdmin";
import UserApi from "../../../apis/user";
import useTable from "../../../hooks/useTable";
import { useParams } from "react-router-dom";
import useAdminUsersContainer from "../../../containers/admin/users/useUsersContainer";

const AdminUsers = () => {
  const { adminId } = useParams();
  const {
    data: users,
    searchLoading,
    handleSearch,
    handleChangePage,
    handleCheckAll,
    searchValue,
    page,
    rowsPerPage,
    loading: deleteLoading,
    count,
    selectedData: selectedUsers,
    handleOpenDelete,
    handleCheckRow,
    handleDelete,
    openDeleteDialog,
    setOpenDeleteDialog,
    selectedItem,
  } = useTable({
    API: UserApi,
    name: "user",
  });

  const { handleAddUser, handleEditUser, tableHeads } =
    useAdminUsersContainer(adminId);

  return (
    <Container maxWidth="xl">
      <Title
        text="Users"
        selectedRows={selectedUsers}
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
          onClick={handleAddUser}
        >
          Add User
        </Button>
      </Box>
      <Table
        rows={users}
        heads={tableHeads}
        Row={
          <UserRow
            actions={{
              handleOpenDelete,
              handleEdit: handleEditUser,
            }}
            isSelectable={{
              selectedRows: selectedUsers,
              handleCheckRow,
            }}
          />
        }
        count={count}
        name="users"
        loading={searchLoading}
        page={page}
        rowsPerPage={rowsPerPage}
        isSelectable={{
          selectedRows: selectedUsers,
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
            ? "these users"
            : `this ${selectedItem?.name}`
        }?`}
      />
    </Container>
  );
};

export default withAdmin(AdminUsers);
