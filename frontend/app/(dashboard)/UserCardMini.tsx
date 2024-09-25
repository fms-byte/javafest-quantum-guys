"use client";
import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography, CircularProgress, Alert } from '@mui/material';
import { Crown } from 'lucide-react';
import { ApiClient, User } from "@asfilab/janun-client";

const UserCardMini: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const apiUrl = "http://localhost:5000";
                const token = localStorage.getItem("token") || "";
                const apiClient = new ApiClient(apiUrl, token);
                const result = await apiClient.auth.getUser();
                setUser(result);
            } catch (error: any) {
                console.error("Error fetching user data:", error);
                setError(error.message || "Error fetching user data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 2 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (!user) {
        return (
            <Box sx={{ p: 2 }}>
                <Alert severity="warning">User data not found</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
                <Avatar src={user.profile?.avatar || "/images/avatar_drawn.jpg"} alt={user.profile?.name || "Avatar"} />
                <Box>
                    <Typography fontWeight="medium" sx={{wordBreak: "break-word"}}>{user.username || "Name"}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ wordBreak: "break-word",}}>
                        { user.email ||"Email"}
                    </Typography>
                </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
                <Crown style={{ color: "secondary.main" }} />
                <Typography variant="body2" fontWeight="medium">
                    Premium Plan
                </Typography>
            </Box>
        </Box>
    );
};

export default UserCardMini;
