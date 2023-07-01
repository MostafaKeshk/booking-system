import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

type IProps = {
  text: string;
  Icon: any;
  route: string;
  badge?: number;
  active?: boolean;
  show?: boolean;
};

const NavLink: React.FC<IProps> = ({
  text,
  Icon,
  route,
  badge,
  active = false,
  show = true,
}) => {
  const navigate = useNavigate();

  const classes = {
    badge: {
      width: "20px",
      height: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "primary.main",
      color: "common.white",
      borderRadius: "7px",
      fontWeight: "bold",
      fontSize: "14px",
    },
  };
  const colorClass = { color: active ? "primary.main" : "" };

  if (!show) return <></>;

  return (
    <ListItem key={text} disablePadding>
      <ListItemButton onClick={() => navigate(route)}>
        <ListItemIcon>
          <Icon sx={colorClass} />
        </ListItemIcon>
        <ListItemText primary={text} sx={colorClass} />
        {badge && <Box sx={classes.badge}>{badge}</Box>}
      </ListItemButton>
    </ListItem>
  );
};

export default NavLink;
