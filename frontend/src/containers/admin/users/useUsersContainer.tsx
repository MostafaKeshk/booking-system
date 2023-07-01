import paths from "../../../routes/paths";
import { useNavigate } from "react-router-dom";

const useAdminUsersContainer = (adminId: any) => {
  const navigate = useNavigate();

  const tableHeads = [
    { label: "Name", align: "left" },
    { label: "Email", align: "left" },
    { label: "Phone Number", align: "left" },
    { label: "Actions", align: "center" },
  ];

  const handleEditUser = (id: any) =>
    navigate(paths.getEditAdminUser(adminId, id));

  const handleAddUser = () => navigate(paths.getAddAdminUser(adminId));

  return {
    tableHeads,

    handleEditUser,

    handleAddUser,
  };
};

export default useAdminUsersContainer;
