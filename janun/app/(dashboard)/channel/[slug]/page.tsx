"use client";
import React, { useEffect, useState } from "react";
import { ApiClient, Channel, Post, Thread } from "@asfilab/janun-client";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  Skeleton,
  Divider,
  Card,
  Avatar,
  Tab,
  Tabs,
  Box,
  Button,
} from "@mui/material";
import { Users, Files, AtSign, Flag } from "lucide-react";
import Link from "next/link";
import PostCard from "../../feed/PostCard";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ChannelPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const [channel, setChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(true);
  const [channelPosts, setChannelPosts] = useState<Post[]>([]);
  const [channelThreads, setChannelThreads] = useState<Thread[]>([]);
  const [tabValue, setTabValue] = useState(0);
  const [subscribedThreads, setSubscribedThreads] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [threadsPosts, setThreadsPosts] = useState<Post[]>([]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncatedDescription =
    channel?.description?.length > 80
      ? channel?.description.slice(0, 80) + "..."
      : channel?.description;

  const handleThreadClick = (threadSlug) => {
    console.log("Thread clicked:", threadSlug);
  };

  const handleSubscribe = (threadSlug) => {
    if (subscribedThreads.includes(threadSlug)) {
      setSubscribedThreads(
        subscribedThreads.filter((slug) => slug !== threadSlug)
      );
    } else {
      setSubscribedThreads([...subscribedThreads, threadSlug]);
    }
    console.log("Subscribed threads:", subscribedThreads);
  };

  const fetchChannel = async () => {
    try {
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      const result = await apiClient.channel.getChannel({ slug });
      console.log("Channel:", result);
      setChannel(result);
      setChannelThreads(Array.from(result.threads));
      setShowFullDescription(result.description.length <= 50);
    } catch (error) {
      console.error("Error fetching channel:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChannelPosts = async () => {
    try {
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      const result = await apiClient.channel.getPostsInChannel({ slug });
      console.log("Channel posts:", result);
      setChannelPosts(result.data);
    } catch (error) {
      console.error("Error fetching channel posts:", error);
    }
  };

  const fetchThreadsPosts = async (threadSlug) => {
    try {
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      const result = await apiClient.threads.getPostsInThread({
        channelSlug: slug,
        threadSlug,
      });
      console.log("Thread posts:", result);
      setThreadsPosts(result.data);
    } catch (error) {
      console.error("Error fetching thread posts:", error);
    }
  };

  useEffect(() => {
    fetchChannel();
    fetchChannelPosts();
  }, [slug]);

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Skeleton variant="rectangular" height={300} />
      </Container>
    );
  }

  if (!channel) {
    return (
      <Container maxWidth="xl">
        <Typography variant="h5" color="error">
          Channel not found
        </Typography>
      </Container>
    );
  }

  const StatChip = ({ icon: Icon, label, count }) => (
    <Chip
      icon={<Icon size={16} />}
      label={count + " " + label}
      variant="outlined"
      size="small"
      sx={{ mr: 1, my: 0.5, p: 1.5 }}
      color="default"
    />
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    // Check if the selected tab is a thread tab (i.e., index > 0)
    if (newValue > 0) {
        const selectedThreadSlug = channelThreads[newValue - 1].slug;
        fetchThreadsPosts(selectedThreadSlug); // Fetch posts for the selected thread
      }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: "10px" }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main" }}>
              {channel.name.charAt(0).toUpperCase()}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4">
              {channel.name}
              <Chip
                label={channel.premium ? "Premium" : "Free"}
                color={channel.premium ? "primary" : "secondary"}
                sx={{ ml: 1 }}
              />
            </Typography>
            <StatChip
              icon={AtSign}
              label="Threads"
              count={channel.threadCount}
            />
            <StatChip
              icon={Users}
              label="Subscribers"
              count={channel.subscriberCount}
            />
            <StatChip icon={Files} label="Posts" count={channelPosts.length} />
            <Typography variant="body1" color="textSecondary" paragraph>
              {showFullDescription ? channel.description : truncatedDescription}
              {channel.description?.length > 80 && (
                <Button onClick={toggleDescription} color="primary">
                  {showFullDescription ? "Show Less" : "More"}
                </Button>
              )}
            </Typography>

            {Array.from(channel.links).map((link, index) => (
              <Link
                key={index}
                href={`https://${link}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  marginRight: "10px",
                }}
              >
                {link}
              </Link>
            ))}

            {Array.from(channel.tags).length > 0 && (
              <Box sx={{ mt: 2 }}>
                {Array.from(channel.tags).map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag.name}
                    variant="outlined"
                    size="small"
                    sx={{ mr: 1, mb: 1, p: 1.5 }}
                    color="secondary"
                  />
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="channel content tabs"
        >
          <Tab label="Posts" />
          {channelThreads.length > 0 &&
            channelThreads.map((thread) => <Tab key={thread.slug} label={thread.name} />)}
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {channelPosts.length > 0 ? (
          channelPosts.map((post) => <PostCard post={post} />)
        ) : (
          <Typography variant="body2" color="textSecondary">
            No posts available
          </Typography>
        )}
      </TabPanel>

      {channelThreads.length > 0 &&
        channelThreads.map((thread, index) => (
          <TabPanel value={tabValue} index={index + 1} key={thread.slug}>
            <Card
              key={thread.slug}
              onClick={() => handleThreadClick(thread.slug)}
              sx={{
                marginBottom: 2,
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  m: 1,
                  p: 0.5,
                }}
              >
                <Chip
                  icon={<AtSign size={16} />}
                  label={thread.name}
                  variant="outlined"
                  color="default"
                />
                <Chip
                  label={thread.premium ? "Premium" : "Free"}
                  variant="outlined"
                  color={thread.premium ? "primary" : "secondary"}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubscribe(thread.slug);
                  }}
                >
                  {subscribedThreads.includes(thread.slug)
                    ? "Unsubscribe"
                    : "Subscribe"}
                </Button>
              </Box>
            </Card>

            <Divider
              sx={{
                my: 2,
              }}
            />

            {threadsPosts.length > 0 ? (
              threadsPosts.map((post) => <PostCard key={post.slug} post={post} />)
            ) : (
              <Typography variant="body2" color="textSecondary">
                No posts available for this thread
              </Typography>
            )}
          </TabPanel>
        ))}
    </Container>
  );
};

export default ChannelPage;
