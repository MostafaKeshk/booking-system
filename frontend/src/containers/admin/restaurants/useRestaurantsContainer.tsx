import paths from "../../../routes/paths";
import { useNavigate } from "react-router-dom";

const useAdminRestaurantsContainer = (adminId: any) => {
  const navigate = useNavigate();

  const tableHeads = [
    { label: "Name", align: "left" },
    { label: "Email", align: "left" },
    { label: "Phone Number", align: "left" },
    { label: "Address", align: "left" },
    { label: "Actions", align: "center" },
  ];

  const handleEditRestaurant = (id: any) =>
    navigate(paths.getEditAdminRestaurants(adminId, id));

  const handleAddRestaurant = () =>
    navigate(paths.getAddAdminRestaurant(adminId));

  return {
    tableHeads,

    handleEditRestaurant,

    handleAddRestaurant,
  };
};

export default useAdminRestaurantsContainer;
