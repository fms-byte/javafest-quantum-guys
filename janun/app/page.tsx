"use client";

import React from "react";
import Navbar from "./Navbar";
import { Container, Typography, Button, Box, Grid, Card, CardContent, CardActions } from "@mui/material";
import { useRouter } from 'next/navigation';
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

const HomePage: React.FC = () => {
  const router = useRouter();

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Navbar />

      {/* Hero Section */}
      <Box sx={{ height: "100vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <Container>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  color: "#ffffff",
                  mb: 2,
                  fontWeight: "bold",
                  fontSize: { xs: "2rem", md: "3rem" },
                }}
              >
                Welcome to{" "}
                <Box
                  component="span"
                  sx={{
                    fontFamily: pacifico.style.fontFamily,
                    fontSize: { xs: "2rem", md: "3rem" },
                  }}
                >
                  Janun!
                </Box>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#ffffff",
                  mb: 4,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  width: { xs: "100%", md: "80%" },
                }}
              >
                Stay informed with Janun, the app that delivers real-time updates
                from public websites in Bangladesh. Subscribe to topics and get
                instant notifications via email, SMS, or push alerts.
              </Typography>
              <Box sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}>
                <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={() => router.push('/feed')}>
                  Open Feed
                </Button>
                <Button variant="outlined" color="secondary" sx={{ mr: 2 }} onClick={() => router.push('/register')}>
                  Register
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/know_everything.png"
                alt="Hero Image"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Box id="about" sx={{ py: 8, backgroundColor: "secondary.main" }}>
        <Container>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                color="black"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                About {""}
                <Box
                  component="span"
                  sx={{
                    fontFamily: pacifico.style.fontFamily,
                    fontSize: { xs: "1rem", md: "2rem" },
                  }}
                >
                  Janun!
                </Box>
              </Typography>
              <Typography variant="body1" color="black" sx={{ mb: 4 }}>
                Sometimes, we need updates from websites about exam results,
                tender notices, job openings, etc., and we constantly check
                these websites for days to stay updated. This is a common issue
                because most government and public institution websites lack
                notification features. This is where our app, Janun, comes into
                play. Janun is a web app that connects users with various public
                websites in Bangladesh, such as government websites, law courts,
                universities, and more. Users can connect to different public
                sites, subscribe to various topics, and receive notifications
                through channels like email, push notifications, SMS, and more.
                <br /> <br />
                Janun is not just a news aggregator; it has its own scraping
                system and crawlers that extract content from different sources,
                post it, analyze it, and notify users about news and updates.
                Janun will feature a recommendation system that suggests posts
                based on user activity (subscriptions, reactions, comments,
                etc.). It will feel like a social media platform where users can
                follow different websites, react to, and comment on content.
                Additionally, users will be able to view AI-generated weekly and
                monthly reports on what is happening in the country. With a
                wealth of content from public websites, the possibilities are
                endless.
              </Typography>
              <Button variant="contained" color="primary">
                Learn More
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/confuse_man.jpg"
                alt="About Image"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 8, backgroundColor: "primary.main" }}>
        <Container>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/explaining_topic.jpg"
                alt="How It Works"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                color="black"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                How It Works
              </Typography>
              <Typography variant="body1" color="black" sx={{ mb: 4 }}>
                Janun scans public websites for important updates and delivers
                them to you in real-time. You can subscribe to specific topics
                or websites and choose to receive updates via email, SMS, or
                push notifications.
                <br /> <br />
                Our app is powered by a sophisticated AI system that analyzes
                content from various sources and recommends posts based on your
                interests. You can also view weekly and monthly reports on
                trending topics in Bangladesh
              </Typography>
              <Button variant="contained" color="primary">
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box id="pricing" sx={{ py: 8, backgroundColor: "background.default" }}>
      <Container>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
          Pricing
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
          We offer a free plan for basic notifications, with premium options available for advanced features like SMS alerts and multiple topic subscriptions.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ textAlign: "center" }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Free Plan
                </Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  $0/month
                </Typography>
                <Typography variant="body2">
                  Basic notifications via email and push alerts. Limited to one topic subscription.
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" fullWidth>
                  Choose Plan
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined" sx={{ textAlign: "center"}}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Premium Plan
                </Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  $10/month
                </Typography>
                <Typography variant="body2">
                  Advanced features including SMS alerts, multiple topic subscriptions, and priority support.
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" fullWidth>
                  Choose Plan
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>

      {/* Footer Section */}
      <Box
        sx={{
          py: 4,
          backgroundColor: "secondary.main",
          color: "black",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="body2" sx={{ mb: 1 }}>
            © 2024 Janun. All Rights Reserved.
          </Typography>
          <Typography variant="body2" color="black">
            Follow us on <a href="https://twitter.com/janun">Twitter</a> |{" "}
            <a href="https://facebook.com/janun">Facebook</a>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
