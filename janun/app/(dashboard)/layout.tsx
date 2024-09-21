// app/dashboard/layout.tsx
"use client";

import { useState, useEffect } from "react";
import { Bell, Home, Hash, FileText, Crown, Search } from "lucide-react";
import {
  Avatar,
  Box,
  Button,
  Input,
  Divider,
  Typography,
  IconButton,
  SwipeableDrawer, // For mobile sidebar
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Pacifico } from "next/font/google";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import UserCardMini from "./UserCardMini";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeMenu, setActiveMenu] = useState("feed");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // For mobile sidebar drawer
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // Ensures that the code runs after the component is mounted
  }, []);

  const menuItems = [
    { icon: Home, label: "Feed", id: "feed" },
    { icon: Bell, label: "Channel", id: "channel" },
    { icon: Hash, label: "Tags", id: "tags" },
    { icon: FileText, label: "Reports", id: "reports" },
  ];

  const popularChannels = [
    "📚 Jagannath University",
    "🏛️ Government",
    "🚄 Railway",
  ];

  const myChannels = ["👨‍💻 DevsOnly", "🎮 Gamers Hub", "🎨 Art Zone"];

  const handleMenuClick = (id: string) => {
    setActiveMenu(id);
    if (isMounted) {
      router.push(`/${id}`); // Navigates to different pages based on the menu item
    }
  };

  const sidebarContent = (
    <>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box onClick={() => router.push("/")} sx={{ cursor: "pointer" }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            className={pacifico.className}
            onClick={() => router.push("/")}
          >
            Janun!
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {menuItems.map((item) => (
          <Button
            key={item.id}
            fullWidth
            variant={activeMenu === item.id ? "contained" : "text"}
            startIcon={<item.icon />}
            onClick={() => handleMenuClick(item.id)}
            sx={{
              justifyContent: "flex-start",
              textTransform: "none",
              px: 2,
              py: 1,
            }}
          >
            {isSidebarOpen && item.label}
          </Button>
        ))}
      </Box>

      <Divider />

      <UserCardMini />
    </>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Left Sidebar */}
      <Box
        sx={{
          width: isSidebarOpen ? { xs: 64, sm: 240 } : 64,
          position: { xs: "fixed", sm: "relative" },
          left: 0,
          top: 0,
          height: "100%",
          bgcolor: "background.paper",
          boxShadow: 3,
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          transition: "width 0.3s",
        }}
      >
        {sidebarContent}
      </Box>

      {/* Sidebar for mobile using SwipeableDrawer */}
      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        {sidebarContent}
      </SwipeableDrawer>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Top Bar */}
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <IconButton
            sx={{ display: { xs: "block", sm: "none" } }}
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ position: "relative", width: "100%" }}>
            <Search
              style={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
            <Input placeholder="Search..." sx={{ pl: 5, width: "100%" }} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button>
              <Bell />
            </Button>
            <Avatar src="/images/avatar_drawn.jpg" alt="User" />
          </Box>
        </Box>

        {/* Main Content Area */}
        <Box
          sx={{ display: "flex", flex: 1, p: 3, gap: 3, overflow: "hidden" }}
        >
          <Box sx={{ flex: 1, overflowY: "auto" }}>{children}</Box>

          {/* Right Panel */}
          <Box
            sx={{
              width: { xs: "100%", sm: 320 },
              display: { xs: "none", sm: "none", md: "flex" },
              flexDirection: "column",
              gap: 3,
              position: "relative",
              bgcolor: "background.paper",
              boxShadow: 3,
              borderRadius: 2,
              p: 2,
              "& > *": {
                mb: 2,
                "&:last-child": { mb: 0 },
              },
            }}
          >
            {/* Popular Channels Section */}
            <Box>
              <Typography variant="h6" fontWeight="bold">
                📌 Popular Channels
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}
              >
                {popularChannels.map((channel, index) => (
                  <Button
                    key={index}
                    fullWidth
                    variant="outlined"
                    sx={{
                      justifyContent: "flex-start",
                      textTransform: "none",
                      color: "text.primary",
                      p: 1.5,
                    }}
                  >
                    {channel}
                  </Button>
                ))}
              </Box>
            </Box>

            <Divider />

            {/* My Channels Section */}
            <Box>
              <Typography variant="h6" fontWeight="bold">
                🔊 My Channels
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}
              >
                {myChannels.map((channel, index) => (
                  <Button
                    key={index}
                    fullWidth
                    variant="outlined"
                    sx={{
                      justifyContent: "flex-start",
                      textTransform: "none",
                      color: "text.primary",
                      p: 1.5,
                    }}
                  >
                    {channel}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
