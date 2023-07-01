import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";
import StoreIcon from "@mui/icons-material/Store";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import paths from "../../../routes/paths";
import { useAuth } from "../../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <BottomNavigation
      showLabels
      value={true}
      sx={{ position: "fixed", bottom: 0, width: "100%" }}
    >
      <BottomNavigationAction
        value={location.pathname === paths.getUser(user?._id)}
        label="Home"
        onClick={() => navigate(paths.getUser(user?._id))}
        icon={<HomeIcon />}
        sx={{ width: "20%", minWidth: "auto" }}
      />

      <BottomNavigationAction
        value={location.pathname.includes(paths.getUserReservations(user?._id))}
        label="Reservations"
        onClick={() => navigate(paths.getUserReservations(user?._id))}
        icon={<FormatListNumberedRtlIcon />}
        sx={{ width: "20%", minWidth: "auto" }}
      />

      <BottomNavigationAction
        value={location.pathname.includes(paths.getUserRestaurants(user?._id))}
        label="Restaurants"
        onClick={() => navigate(paths.getUserRestaurants(user?._id))}
        icon={<StoreIcon />}
        sx={{ width: "20%", minWidth: "auto" }}
      />

      <BottomNavigationAction
        value={location.pathname.includes(paths.getUserHistory(user?._id))}
        label="History"
        onClick={() => navigate(paths.getUserHistory(user?._id))}
        icon={<HistoryIcon />}
        sx={{ width: "20%", minWidth: "auto" }}
      />

      <BottomNavigationAction
        value={location.pathname.includes(paths.getUserSettings(user?._id))}
        label="Settings"
        onClick={() => navigate(paths.getUserSettings(user?._id))}
        icon={<SettingsIcon />}
        sx={{ width: "20%", minWidth: "auto" }}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
