import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const StatsBox = ({ title, value, isOffered }) => {
  const theme = useTheme();
  return (
    <>
      {!isOffered ? (
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          p="1.25rem 1.2rem"
          flex=" 1 1 100%"
          backgroundColor={theme.palette.primary.light}
          borderRadius="0.55rem"
        >
          <Typography
            variant="h1"
            fontWeight="600"
            sx={{ color: theme.palette.primary.main }}
          >
            {value}
          </Typography>

          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ color: theme.palette.primary.main }}
          >
            {title}
          </Typography>
        </Box>
      ) : (
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          p="1.25rem 1.2rem"
          flex=" 1 1 100%"
          backgroundColor={theme.palette.primary.main}
          borderRadius="0.55rem"
        >
          <Typography
            variant="h1"
            fontWeight="600"
            sx={{ color: theme.palette.background.alt }}
          >
            {value}
          </Typography>

          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ color: theme.palette.background.alt }}
          >
            {title}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default StatsBox;
