import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../../contexts/AuthContext";
import useDarkMode from "../../../contexts/ThemeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DrawerList from "./DrawerList";
import { useTheme } from "@mui/material";

interface Props {
  handleDrawerToggle: any;
  mobileOpen: boolean;
  drawerWidth: number;
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Nav: React.FC<Props> = ({
  window,
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
}) => {
  const { user, handleLogout } = useAuth();
  const { darkMode, handleThemeChange } = useDarkMode();
  const theme = useTheme();
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: theme.palette.background.paper,
          boxShadow: "none",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon sx={{ color: "primary.main" }} />
          </IconButton>
          <Box sx={{ display: { sm: "block" } }} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ mx: 1 }} onClick={handleThemeChange}>
              {darkMode ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon sx={{ color: "primary.main" }} />
              )}
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={user?.image}
                alt={user?.name}
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                  borderRadius: "40px",
                }}
              />
              <Typography sx={{ pl: 1, fontWeight: "bold" }} color="primary">
                {user?.name}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
        <Divider />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DrawerList handleLogout={handleLogout} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <DrawerList handleLogout={handleLogout} />
        </Drawer>
      </Box>
    </>
  );
};

export default Nav;
