"use client";

import { ApiClient, Profile, User } from "@asfilab/janun-client";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Button,
  TextField,
  Chip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserCard = ({userData}: {userData: User}) => {
  const [user, setUser] = useState<User | null>(userData);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<Profile>({
    name: userData.profile?.name || "",
        avatar: userData.profile?.avatar || "",
        bio: userData.profile?.bio || "",
        city: userData.profile?.city || "",
        country: userData.profile?.country || "",
  });
  const router = useRouter();

  // const fetchUserData = async () => {
  //   try {
  //     const apiUrl = "http://localhost:5000"; // Update the API URL if necessary
  //     const token = localStorage.getItem("token") || "";
  //     const apiClient = new ApiClient(apiUrl, token);
  //     const result = await apiClient.my.getMe();
  //     setUser(result);
  //     setUpdatedUser({
  //       name: result.profile?.name || "",
  //       avatar: result.profile?.avatar || "",
  //       bio: result.profile?.bio || "",
  //       city: result.profile?.city || "",
  //       country: result.profile?.country || "",
  //     });
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching User data:", error);
  //     setLoading(false);
  //   }
  // };

  const handleUpdate = async () => {
    try {
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      await apiClient.profile.updateProfile({
        profile: updatedUser,
      });
      console.log("Updated user data:", updatedUser);
      setUser((prevUser) => ({
        ...prevUser!,
        profile: updatedUser,
      }));
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      await apiClient.auth.logout();
      localStorage.removeItem("token");
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!user) {
    return (
      <Box
        sx={{
          width: 400,
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography variant="body1">
          Failed to load user information.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: 400,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        User Profile
      </Typography>

      <Avatar
        src={user.profile?.avatar || "/images/avatar_drawn.jpg"}
        alt={user.username || "User"}
        sx={{ width: 100, height: 100, alignSelf: "center" }}
      />
      <Typography variant="body1" sx={{ alignSelf: "center" }}>
        {user.profile?.bio || "N/A"}
      </Typography>

      {editMode ? (
        <>
          <TextField
            label="Name"
            variant="outlined"
            value={updatedUser.name}
            onChange={(e) =>
              setUpdatedUser((prev) => ({ ...prev, name: e.target.value }))
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Bio"
            variant="outlined"
            value={updatedUser.bio}
            onChange={(e) =>
              setUpdatedUser((prev) => ({ ...prev, bio: e.target.value }))
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="City"
            variant="outlined"
            value={updatedUser.city}
            onChange={(e) =>
              setUpdatedUser((prev) => ({ ...prev, city: e.target.value }))
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Country"
            variant="outlined"
            value={updatedUser.country}
            onChange={(e) =>
              setUpdatedUser((prev) => ({ ...prev, country: e.target.value }))
            }
            fullWidth
            sx={{ mb: 2 }}
          />
        </>
      ) : (
        <>
          <Typography variant="body1">
            Name: {user.profile?.name || "N/A"}
          </Typography>
        </>
      )}
      <Typography variant="body1">
        Username: {user.username || "N/A"}
      </Typography>
      <Typography variant="body1">Email: {user.email || "N/A"}</Typography>
      <Typography variant="body1">
        Phone: <Chip label={user.phone || "N/A"} />
      </Typography>
      <Typography variant="body1">
        Role: <Chip label={user.role || "N/A"} />
      </Typography>
      <Typography variant="body1">
        Premium User: <Chip label={user.premium ? "Yes" : "No"} />
      </Typography>
      <Typography variant="body1">
        Email Confirmed: <Chip label={user.emailConfirmed ? "Yes" : "No"} />
      </Typography>

      {editMode ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          sx={{ mt: 2 }}
        >
          Save Changes
        </Button>
      ) : (
        <>
          <Typography variant="body1">
            Location: {user.profile?.city.toUpperCase() || "N/A"},{" "}
            {user.profile?.country.toUpperCase() || "N/A"}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setEditMode(true)}
            sx={{ mt: 2, fontWeight: "bold" }}
          >
            Edit Profile
          </Button>
        </>
      )}

      <Button
        variant="contained"
        color="error"
        onClick={handleLogout}
        sx={{ mt: 2, fontWeight: "bold" }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default UserCard;
