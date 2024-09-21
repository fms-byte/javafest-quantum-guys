"use client";
import { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { ApiClient, User } from "@asfilab/janun-client";
import { useRouter } from 'next/navigation';

export default function Register() {
  const [response, setResponse] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUsername = async () => {
      try {
        const apiUrl = "http://localhost:5000";
        const apiClient = new ApiClient(apiUrl);
        const available = await apiClient.auth.checkUsername({ username });
        setUsernameAvailable(available.available || false);
      } catch (error) {
        console.error("Error checking username:", error);
      }
    };

    if (username) {
      checkUsername();
    }
  }, [username]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = "http://localhost:5000";
      const apiClient = new ApiClient(apiUrl);
      if (!usernameAvailable) {
        setResponse("Username already taken");
        return;
      }
      const result: User = await apiClient.auth.register({
        registerRequest: {
          username,
          email,
          password,
        },
      });
      setResponse(JSON.stringify(result, null, 2));
    } catch (error: any) {
      console.error("Error registering:", error);
      setResponse(error.message || "Error registering");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        p: 2,
        bgcolor: "background.default",
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{
          width: { xs: "100%", sm: "400px" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!username && !usernameAvailable}
          helperText={
            username && !usernameAvailable ? "Username already taken" :
            username && usernameAvailable ? "Username available" : ""
          }
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!usernameAvailable || !username || !email || !password}
        >
          Register
        </Button>
        <Typography variant="body2" textAlign="center" mt={2}>
          Already have an account?{" "}
          <Link
            component="button"
            variant="body2"
            onClick={() => router.push('/login')}
            underline="hover"
          >
            Login
          </Link>
        </Typography>
      </Box>
      {response && (
        <Box
          sx={{
            mt: 4,
            width: { xs: "100%", sm: "400px" },
            bgcolor: "background.paper",
            p: 2,
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {response}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
