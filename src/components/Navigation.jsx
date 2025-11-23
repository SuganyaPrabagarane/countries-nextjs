"use client";

import { useAuth } from "@/app/context/AuthContext";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/app/context/ThemeContext";

const Navigation = ({ children }) => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { theme } = useTheme(); 

  const headerBg =
  theme.palette.mode === "dark"
  ? theme.palette.background.paper 
  : theme.palette.primary.dark;   
  const headerText = theme.palette.mode === "dark" ? theme.palette.text.primary : "#ffffff";


  return (
    <div>
      <AppBar
        position="static"
        sx={{
          mb: 3,
          backgroundColor: headerBg,
          color: headerText,
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              width: "100%",
              flexWrap: "wrap", 
            }}
          >
            <Button color="inherit" onClick={() => router.push("/countries")}>
              COUNTRIES
            </Button>
            <Button color="inherit" onClick={() => router.push("/protected")}>
              PROTECTED
            </Button>

            {user ? (
              <>
                <Button color="inherit" onClick={() => signOut()}>
                  LOGOUT
                </Button>
                <Button color="inherit" onClick={() => router.push("/profile")}>
                  PROFILE
                </Button>
                <Button color="inherit" onClick={() => router.push("/favourite")}>
                  FAVOURITE
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={() => router.push("/login")}>
                LOGIN
              </Button>
            )}

            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default Navigation;
