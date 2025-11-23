'use client';

import { Box, CircularProgress, Typography, Avatar, Paper } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import AuthRedirect from "../login/AuthRedirect";

const Protected = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "sstart",
          paddingTop: 10,
          alignItems: "center",
          height: "100vh",
          gap: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          Please login to the application to see the data
        </Typography>
        <AuthRedirect />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <Typography variant="h4" component="h1">
          Protected User Data
        </Typography>
        <Avatar
          src={user.user_metadata.avatar_url}
          alt={user.user_metadata.name}
          sx={{ width: 100, height: 100 }}
        />
        <Typography variant="h6">{user.user_metadata.name}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
        <Typography variant="body1">User ID: {user.id}</Typography>
      </Paper>
    </Box>
  );
};

export default Protected;
