import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h3"
        color={theme.palette.font.main}
        fontWeight="700"
        sx={{ mb: "1rem", ml: "0.625rem" }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
