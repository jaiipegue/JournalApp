import { Box } from "@mui/system";
import React from "react";
import { NavBar, SideBar } from "../components";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <NavBar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} />

      <Box component="main" sx={{ flexGrow: 1, pt: 10, pl: 1, pr: 2 }}>
        {/* toolbar */}
        {children}
      </Box>
    </Box>
  );
};
