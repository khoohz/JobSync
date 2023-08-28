import React, { useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import Logo from "assets/Logo";
import FlexBetween from "components/FlexBetween";
import loginImageBoy from "assets/loginImageBoy.png";

const Login = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const handlePageTypeChange = (newPageType) => {
    setPageType(newPageType);
  };

  return (
    <Box>
      <Box p="3rem 0 0 3rem" sx={{ width: "12rem" }}>
        <FlexBetween>
          <Logo />
          <Box textAlign="left">
            <Typography
              fontWeight="600"
              variant="h4"
              sx={{ color: theme.palette.font.main }}
            >
              JobSync
            </Typography>
          </Box>
        </FlexBetween>
      </Box>

      <FlexBetween>
        <Box
          width={isNonMobile ? "42%" : "90%"}
          p={isNonMobile ? "10vh 0 6.5rem 20% " : "20% 10% 5% 20%"}
        >
          <Typography
            fontWeight="600"
            variant="h1"
            textAlign={isNonMobile ? "" : "center"}
            sx={{ mb: "1rem", color: theme.palette.font.main }}
          >
            {pageType === "login" ? "Welcome Back" : "Create Account"}
          </Typography>
          <Typography
            fontWeight="500"
            variant="h5"
            textAlign={isNonMobile ? "" : "center"}
            sx={{ mb: "0.5rem", color: theme.palette.font.light }}
          >
            {pageType === "login"
              ? "Navigating Your Career Journey Together"
              : "Empowering Your Job Search Efforts"}
          </Typography>
          <Typography
            fontWeight="500"
            variant="h6"
            textAlign={isNonMobile ? "" : "center"}
            sx={{ mb: "1rem", color: theme.palette.primary.main }}
          >
            {pageType === "login"
              ? "*Recommended browser size: 80%"
              : ""}
          </Typography>
          <Form
            onPageTypeChange={handlePageTypeChange}
            isLogin={isLogin}
            isRegister={isRegister}
          />
        </Box>
        {isNonMobile && (
          <Box
            component="img"
            alt="loginImage"
            src={loginImageBoy}
            height="auto"
            width="43.5%"
            pt="2.5rem"
            mb="2rem"
          />
        )}
      </FlexBetween>
    </Box>
  );
};

export default Login;
