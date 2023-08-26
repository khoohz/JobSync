import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SpaceDashboardOutlined,
  WorkOutlineOutlined,
  TaskAltOutlined,
  BusinessOutlined,
  PermContactCalendarOutlined,
  Menu as MenuIcon,
  LogoutOutlined,
  ChevronRightOutlined,
  DarkModeOutlined,
  LightModeOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import Logo from "assets/Logo";
import { useSelector, useDispatch } from "react-redux";
import { setMode, setLogout } from "states";

const navItems = [
  {
    text: "Dashboard",
    icon: <SpaceDashboardOutlined />,
  },
  {
    text: "Applications",
    icon: <WorkOutlineOutlined />,
  },
  {
    text: "Tasks",
    icon: <TaskAltOutlined />,
  },
  {
    text: "Companies",
    icon: <BusinessOutlined />,
  },
  {
    text: "Contacts",
    icon: <PermContactCalendarOutlined />,
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [active, setActive] = useState(""); // keep track of current page URL
  const navigate = useNavigate();
  const theme = useTheme();
  const mode = useSelector((state) => state.auth.mode);
  const isLightMode = mode === "light";

  const handleLogout = () => {
    dispatch(setLogout());
  };

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        variant="persistent"
        anchor="left"
        sx={{
          width: isSidebarOpen ? drawerWidth : 0,
          "& .MuiDrawer-paper": {
            color: theme.palette.font.main,
            backgroundColor: theme.palette.background.alt,
            boxSixing: "border-box",
            borderWidth: isNonMobile ? "0px" : "2px",
            width: drawerWidth,
            borderRight: isLightMode
              ? `${theme.palette.grey[200]} solid 2.5px`
              : `rgba(246, 246, 246, 0.5) solid 2px`,
          },
        }}
      >
        <Box
          width="100%"
          position="relative"
          overflow="auto"
          marginBottom="7rem"
        >
          <Box m="1rem 1.5rem 3rem 1.5rem">
            <FlexBetween color={theme.palette.font.main}>
              <Logo />
              <IconButton
                sx={{ ml: "8rem" }}
                onClick={() => dispatch(setMode())}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlined sx={{ fontSize: "25px" }} />
                ) : (
                  <LightModeOutlined sx={{ fontSize: "25px" }} />
                )}
              </IconButton>
              <IconButton onClick={() => setIsSidebarOpen(false)}>
                <MenuIcon sx={{ fontSize: "25px" }} />
              </IconButton>
            </FlexBetween>
          </Box>
          <List>
            {navItems.map(({ text, icon }) => {
              const lcText = text.toLowerCase();

              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/${lcText}`);
                      setActive(lcText);
                    }}
                    sx={{
                      backgroundColor:
                        active === lcText
                          ? theme.palette.neutral[200]
                          : "transparent",
                      color:
                        active === lcText
                          ? theme.palette.font.main
                          : theme.palette.font.light,
                      borderRadius: "0.4rem",
                      margin: "0 20px 10px 20px",
                      "& .MuiTypography-root": {
                        fontSize: "1rem",
                        fontWeight: active === lcText ? "600" : "500",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "0.5rem",
                        mr: "-0.8rem",
                        color:
                          active === lcText
                            ? theme.palette.font.main
                            : theme.palette.font.light,
                        "& .MuiSvgIcon-root": {
                          fontSize: active === lcText ? "1.6rem" : "1.5rem",
                        },
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    {active === lcText && (
                      <ChevronRightOutlined sx={{ ml: "auto" }} />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Box position="fixed" bottom="1.5rem" sx={{ width: drawerWidth }}>
          <Divider />
          <FlexBetween textTransform="none" gap="1rem" m="1.5rem 1.5rem 0 2rem">
            <Box
              component="img"
              alt="profile"
              src={`http://localhost:5001/assets/${user.picturePath}`}
              height="40px"
              width="40px"
              borderRadius="50%"
              sx={{ objectFit: "cover" }}
            />
            <Box textAlign="left">
              <Typography
                fontWeight="bold"
                fontSize="0.9rem"
                sx={{ color: theme.palette.font.main }}
              >
                {user.name}
              </Typography>
              <Typography
                fontSize="0.8rem"
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
          </FlexBetween>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
