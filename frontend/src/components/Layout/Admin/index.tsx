import Nav from "./Nav";
import AlertMessage from "../../general/AlertMessage";
import { useAlert } from "../../../contexts/AlertContext";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import React from "react";

const AdminLayout: React.FC = () => {
  const { value, msg, setValue, error } = useAlert();
  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Nav
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>

      <AlertMessage value={value} setValue={setValue} error={error} msg={msg} />
    </Box>
  );
};

export default AdminLayout;
