import React from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  LogoutOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "states";
import {
  AppBar,
  IconButton,
  Toolbar,
  useTheme,
  Box,
  Typography,
} from "@mui/material";
import { setLogout } from "states";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            sx={{ ...(isSidebarOpen && { display: "none" }) }}
          >
            <MenuIcon sx={{ fontSize: "25px" }} />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          ></FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <FlexBetween>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={`http://localhost:5001/assets/${user.picturePath}`}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.font.main }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.font.light }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <IconButton>
                <LogoutOutlined
                  onClick={handleLogout}
                  sx={{ color: theme.palette.primary.main, fontSize: "25px" }}
                />
              </IconButton>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
