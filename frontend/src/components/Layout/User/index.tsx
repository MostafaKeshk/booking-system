import AlertMessage from "../../general/AlertMessage";
import { useAlert } from "../../../contexts/AlertContext";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import React from "react";
import Nav from "./Nav";
import BottomNav from "./BottomNav";

const UserLayout: React.FC = () => {
  const { value, msg, setValue, error } = useAlert();

  return (
    <Box component="main">
      <Nav />
      <Toolbar />
      <Outlet />
      <BottomNav />

      <AlertMessage value={value} setValue={setValue} error={error} msg={msg} />
    </Box>
  );
};

export default UserLayout;
