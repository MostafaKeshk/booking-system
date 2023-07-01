import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import { Box, useTheme } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../../contexts/AuthContext";
import UserProfile from "../../general/UserProfile";
import useDarkMode from "../../../contexts/ThemeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const Nav = () => {
  const theme = useTheme();
  const { user, handleLogout } = useAuth();
  const { darkMode, handleThemeChange } = useDarkMode();

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Tooltip title="Logout">
            <IconButton onClick={handleLogout}>
              <LogoutIcon sx={{ color: "common.white" }} />
            </IconButton>
          </Tooltip>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ mx: 1 }} onClick={handleThemeChange}>
              {darkMode ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon sx={{ color: "common.white" }} />
              )}
            </IconButton>

            <UserProfile
              image={user?.image}
              name={user?.name}
              sx={{ color: theme.palette.common.white }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;
