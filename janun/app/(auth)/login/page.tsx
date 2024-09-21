// app/auth/login/page.tsx

"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Link, Typography, Snackbar, Alert } from "@mui/material";
import { useRouter } from 'next/navigation';
import { ApiClient } from "@asfilab/janun-client";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("test");
  const [password, setPassword] = useState("12345678");
  const [jwtToken, setJwtToken] = useState<string>("");
  const [response, setResponse] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = "http://localhost:5000";
      const apiClient = new ApiClient(apiUrl);
      const result = await apiClient.auth.login({
        loginRequest: { username, password },
      });
      setJwtToken(result.token || "");
      setResponse(JSON.stringify(result, null, 2));
      localStorage.setItem("token", result.token || "");
      setOpenSnackbar(true); // Show snackbar on successful login
      router.push('/'); // Redirect to home or desired page
    } catch (error: any) {
      console.error("Error logging in:", error);
      setResponse(error.message || "Error logging in");
      setOpenSnackbar(true); // Show snackbar on error
    }
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(jwtToken);
    alert("Token copied to clipboard");
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: 2, 
        maxWidth: 400, 
        mx: "auto", 
        my: 4, 
        p: 2 
      }}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center">
        Login to your account
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" fullWidth>
        Login
      </Button>
      <Typography variant="body2" textAlign="center" mt={2}>
        Don’t have an account?{" "}
        <Link
          component="button"
          variant="body2"
          onClick={() => router.push('/register')}
          underline="hover"
        >
          Register
        </Link>
      </Typography>

      {/* Snackbar for showing responses */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        action={
          <Button color="inherit" onClick={() => setOpenSnackbar(false)}>
            Close
          </Button>
        }
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={response?.includes("Error") ? "error" : "success"}>
          {response}
        </Alert>
      </Snackbar>
      
      {jwtToken && (
        <Box mt={2} textAlign="center">
          <Button
            onClick={handleCopyToken}
            variant="outlined"
            color="success"
          >
            Copy Token
          </Button>
        </Box>
      )}
    </Box>
  );
}
