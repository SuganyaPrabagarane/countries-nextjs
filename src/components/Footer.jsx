"use client";

import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@/app/context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();

  const bgColor =
    theme.palette.mode === "dark"
      ? theme.palette.background.paper 
      : theme.palette.primary.dark;   

  const textColor =
    theme.palette.mode === "dark" ? theme.palette.text.primary : "#ffffff";

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: bgColor,
        color: textColor,
        py: 3,
        mt: "auto", 
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} All rights reserved by REACT25K
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
