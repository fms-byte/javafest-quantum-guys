// app/auth/layout.tsx

"use client";
import { ReactNode } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" }, // Stack vertically on mobile (inverse), horizontally on desktop
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Left Side: Image and Text */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
          p: { xs: 2, md: 3 }, // Adjust padding for mobile and desktop
          textAlign: "center",
          order: { xs: 2, md: 1 }, // Position the content on the bottom for mobile
        }}
      >
        <img
          src="/images/know_everything.png" // Add your image path here
          alt="Welcome Image"
          style={{ width: "80%", maxWidth: "300px", marginBottom: "1rem" }} // Adjust size for mobile
        />
        <Typography variant="h5" fontWeight="bold">
          Welcome to Our Platform
        </Typography>
        <Typography variant="body1" mt={2}>
          Experience the best content with a seamless login experience.
        </Typography>
        <Button
          variant="outlined"
          onClick={() => router.push("/")}
          sx={{ mt: 4 }}
        >
          Back to Home
        </Button>
      </Box>

      {/* Right Side: Form */}
      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          bgcolor: "background.paper",
          p: { xs: 2, md: 3 }, // Adjust padding for mobile and desktop
          boxShadow: 3,
          order: { xs: 1, md: 2 }, // Position the form on top for mobile
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
