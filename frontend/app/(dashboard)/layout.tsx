// app/dashboard/layout.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Pacifico } from "next/font/google";
import { Bell, Home, Hash, FileText, Search } from "lucide-react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
  Button,
  Input,
  Divider,
  Typography,
  IconButton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  Popover,
  Card,
  Drawer,
} from "@mui/material";
import UserCardMini from "./UserCardMini";
import { ApiClient, Channel, User } from "@asfilab/janun-client";
import NotificationCard from "./NotificationCard";
import UserCard from "./UserCard";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

const menuItems = [
  { icon: Home, label: "Feed", id: "feed" },
  { icon: Bell, label: "Channel", id: "channel" },
  { icon: Hash, label: "Tags", id: "tags" },
  { icon: FileText, label: "Reports", id: "reports" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeMenu, setActiveMenu] = useState("feed");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [myChannels, setMyChannels] = useState<Channel[]>([]);
  const [popularChannels, setPopularChannels] = useState<Channel[]>([]);
  const [notificationAnchor, setNotificationAnchor] =
    useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New post from jagannath university",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      type: "info",
    },
    {
      id: 2,
      message: "Your comment received a reply",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      type: "warning",
    },
    {
      id: 3,
      message: "Your comment has been deleted!",
      date: new Date(),
      type: "error",
    },
  ]);
  const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleAvatarClick = () => {
    setIsUserDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsUserDrawerOpen(false);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const isNotificationOpen = Boolean(notificationAnchor);
  const notificationId = isNotificationOpen
    ? "notification-popover"
    : undefined;

  const fetchPopularChannels = async () => {
    try {
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      const result = await apiClient.channel.getChannels();
      console.log("Popular Channels:", result);
      setPopularChannels(result.data);
    } catch (error) {
      console.error("Error fetching popular channels:", error);
    }
  };

  const fetchMyChannels = async () => {
    try {
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      const result = await apiClient.my.getMySubscribedChannels();
      console.log("My Channels:", result);
      setMyChannels(result.data);
    } catch (error) {
      console.error("Error fetching my channels:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      const result = await apiClient.my.getMe();
      console.log("User Data:", result);
      setUser(result);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    fetchPopularChannels();
    fetchMyChannels();
    fetchUserData();
  }, []);

  const sortPupularChannels = (channels: Channel[]) => {
    return channels
      .sort((a, b) => b.subscriberCount - a.subscriberCount)
      .slice(0, 3);
  };

  useEffect(() => {
    setIsMounted(true);
    const activeMenuItem = menuItems.find(
      (item) => pathname === `/${item.id}` || pathname === `/${item.id}/`
    );
    if (activeMenuItem) {
      setActiveMenu(activeMenuItem.id);
    }
  }, []);

  const isPostDetailsPage = pathname.startsWith("/feed/");

  const handleMenuClick = (id: string) => {
    setActiveMenu(id);
    if (isMounted) {
      router.push(`/${id}`);
    }
  };

  useEffect(() => {
    if (isMounted) {
      const activeMenuItem = menuItems.find(
        (item) => pathname === `/${item.id}` || pathname === `/${item.id}/`
      );
      if (activeMenuItem) {
        setActiveMenu(activeMenuItem.id);
      }
    }
  }, [pathname, isMounted]);

  const renderSidebarContent = () => (
    <>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          className={pacifico.className}
          onClick={() => router.push("/")}
          sx={{ cursor: "pointer" }}
        >
          Janun!
        </Typography>
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

  const renderRightPanel = () => (
    <Box
      sx={{
        width: { xs: "100%", sm: 320 },
        display: isPostDetailsPage
          ? "none"
          : { xs: "none", sm: "none", md: "flex" },
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
      <Box>
        <Typography variant="h6" fontWeight="bold">
          📌 Popular Channels
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
          {sortPupularChannels(popularChannels).map((channel, index) => (
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
              {channel.name}
            </Button>
          ))}
        </Box>
      </Box>
      <Divider />
      <Box>
        <Typography variant="h6" fontWeight="bold">
          🔊 My Channels
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
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
              {channel.name}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
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
        {renderSidebarContent()}
      </Box>

      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        {renderSidebarContent()}
      </SwipeableDrawer>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
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
            <Button onClick={handleNotificationClick}>
              <Bell />
            </Button>
            <Avatar
              src={user?.profile?.avatar || "/images/avatar_drawn.jpg"}
              alt={user?.username || "User"}
              onClick={handleAvatarClick} // Avatar click opens the drawer
              sx={{ cursor: "pointer" }}
            />
          </Box>

          <Popover
            id={notificationId}
            open={isNotificationOpen}
            anchorEl={notificationAnchor}
            onClose={handleNotificationClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              mt: 2,
            }}
          >
            <Box
              sx={{
                p: 2,
                width: 400,
                border: "1px solid #49fd8a",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Notifications
              </Typography>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                  />
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No new notifications
                </Typography>
              )}
            </Box>
          </Popover>

          <Drawer
            anchor="right"
            open={isUserDrawerOpen}
            onClose={handleDrawerClose}
          >
            <UserCard userData={user}/>
          </Drawer>
        </Box>

        <Box
          sx={{ display: "flex", flex: 1, p: 3, gap: 3, overflow: "hidden" }}
        >
          <Box sx={{ flex: 1, overflowY: "auto" }}>{children}</Box>
          {renderRightPanel()}
        </Box>
      </Box>
    </Box>
  );
}
