import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NavLink from "../Restaurant/NavLink";
import paths from "../../../routes/paths";
import { Button } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import { useLocation, useParams } from "react-router-dom";

type IProps = {
  handleLogout: any;
};

const DrawerList: React.FC<IProps> = ({ handleLogout }) => {
  const location = useLocation();
  const classes = {
    toolbar: { px: `14px!important` },
    mallIcon: { color: "primary.main", fontSize: 30 },
  };
  const { adminId } = useParams();

  return (
    <div>
      <Toolbar sx={classes.toolbar}>
        <LocalMallIcon sx={{ color: "primary.main", fontSize: 30 }} />
        <Typography sx={{ pl: 1, fontWeight: "bold" }} color="primary">
          Booking
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <NavLink
          text="Home"
          Icon={HomeIcon}
          route={paths.getAdmin(adminId)}
          active={location.pathname === paths.getAdmin(adminId)}
        />
        <NavLink
          text="Restaurants"
          Icon={FormatListNumberedRtlIcon}
          route={paths.getAdminRestaurants(adminId)}
          active={location.pathname.includes(
            paths.getAdminRestaurants(adminId)
          )}
        />

        <NavLink
          text="Users"
          Icon={PeopleIcon}
          route={paths.getAdminUsers(adminId)}
          active={location.pathname === paths.getAdminUsers(adminId)}
        />
      </List>
      <Divider />
      <Box sx={{ mx: 1, mt: 1 }}>
        <Button
          sx={{
            backgroundColor: "error.main",
            color: "common.white",
            width: "100%",
            ":hover": {
              backgroundColor: "error.main",
              color: "common.white",
            },
          }}
          variant="contained"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </div>
  );
};

export default DrawerList;
