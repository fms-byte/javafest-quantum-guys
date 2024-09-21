"use client";

import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CloseIcon from "@mui/icons-material/Close";
import { DarkModeContext } from './ClientProvider'; // Import the context
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  
  // Access the context using useContext
  const darkModeContext = useContext(DarkModeContext);

  // Ensure darkModeContext is defined and then access darkMode and toggleDarkMode
  if (!darkModeContext) {
    throw new Error("darkModeContext is undefined, make sure you're using DarkModeContext.Provider");
  }

  const { darkMode, toggleDarkMode } = darkModeContext;
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: "black",
        width: "90vw",
        borderRadius: "18px",
        margin: "15px auto",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: {
            xs: "space-between",
            md: "space-between",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Pacifico, cursive",
            color: "black",
            marginLeft: "16px",
            fontSize: "2rem",
          }}
        >
          Janun!
        </Typography>

        {/* Right side menu for desktop */}
        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            alignItems: "center",
          }}
        >
          <Button color="inherit" sx={{ margin: "0 8px" }} onClick={() => router.push('#pricing')}>
            Pricing
          </Button>
          <Button color="inherit" sx={{ margin: "0 8px" }} onClick={() => router.push('#about')}>
            About
          </Button>
          <Button color="inherit" sx={{ margin: "0 8px" }} onClick={() => router.push('/login')}>
            Login
          </Button>
          <Button variant="contained" color="inherit" sx={{ margin: "0 8px" }} onClick={() => router.push('/register')}>
            Register
          </Button>
          <IconButton
            onClick={toggleDarkMode}
            color="inherit"
            sx={{ marginLeft: "16px" }}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        {/* Hamburger menu for mobile */}
        <Box
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={toggleDarkMode}
            color="inherit"
            sx={{ marginRight: "8px" }}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ marginRight: "16px" }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Drawer for mobile menu */}
        <Drawer
          anchor="bottom"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              height: "auto",
              backgroundColor: theme.palette.background.default,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "8px",
            }}
          >
            <IconButton onClick={toggleDrawer(false)} color="inherit">
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />
          <List>
            <ListItem>
              <ListItemButton onClick={() => router.push('/pricing')}>
                <ListItemText primary="Pricing" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => router.push('/about')}>
                <ListItemText primary="About" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => router.push('/login')}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => router.push('/register')}>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
