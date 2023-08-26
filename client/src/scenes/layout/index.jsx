import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "states/api";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.auth.user._id);

  const { data } = useGetUserQuery(userId);
  
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="300px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
      { !isSidebarOpen ? (
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        ): <Box mt="2.5rem">
          </Box>
        }
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
