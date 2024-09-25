"use client";

import { ApiClient, Channel, Post, Tag } from "@asfilab/janun-client";
import {
  Box,
  Chip,
  Container,
  Grid,
  Paper,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { AtSign, Files, Hash, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import PostCard from "../../feed/PostCard";
import { ChannelCard } from "../../channel/ChannelCard";

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

const TabDetailsPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const [tag, setTag] = useState<Tag | null>(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [tagPosts, setTagPosts] = useState<Post[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [tagChannel, setTagChannel] = useState<Channel[]>([]);

  const fetchTag = async () => {
    try {
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      const result = await apiClient.tag.getTag({ slug });
      console.log("Tag:", result);
      setTag(result);
    } catch (error) {
      console.error("Error fetching channel:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      const result = await apiClient.post.getPosts();
      console.log("All Posts:", result);
      setPosts(result.data);
    } catch (error) {
      console.error("Error fetching tag posts:", error);
    }
  };

  const fetchChannels = async () => {
    try {
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      const result = await apiClient.channel.getChannels();
      console.log("All Channels:", result);
      setChannels(result.data);
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  };

  const filterTagPosts = () => {
    const filteredPosts = posts.filter((post) =>
      Array.from(post.tags)
        .map((tag) => tag.name)
        .includes(slug)
    );
    console.log("Filtered Posts:", filteredPosts);
    setTagPosts(filteredPosts);
  };

  const filterChannels = () => {
    const filteredChannels = channels.filter((channel) =>
      Array.from(channel.tags)
        .map((tag) => tag.name)
        .includes(slug)
    );
    console.log("Filtered Channels:", filteredChannels);
    setTagChannel(filteredChannels);
  };

  useEffect(() => {
    fetchTag();
    fetchPosts();
    fetchChannels();
  }, [slug]);

  useEffect(() => {
    filterTagPosts();
  }, [posts]);

  useEffect(() => {
    filterChannels();
  }, [channels]);

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Skeleton variant="rectangular" height={300} />
      </Container>
    );
  }

  if (!tag) {
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
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: "10px" }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs>
            <Typography variant="h4">{tag.name}</Typography>
            <StatChip icon={Hash} label="Channels" count={tag.channelCount} />
            <StatChip icon={AtSign} label="Threads" count={tag.threadCount} />
            <StatChip icon={Files} label="Posts" count={tag.postCount} />
            <Typography variant="body1" sx={{ mt: 2 }}>
              {tag.description}
            </Typography>
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
          <Tab label="Channels" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {tagPosts.length > 0 ? (
          tagPosts.map((post) => <PostCard post={post} />)
        ) : (
          <Typography variant="body2" color="textSecondary">
            No posts available
          </Typography>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {tagChannel.length > 0 ? (
          tagChannel.map((channel) => <ChannelCard channel={channel} />)
        ) : (
          <Typography variant="body2" color="textSecondary">
            No channels available
          </Typography>
        )}
      </TabPanel>
    </Container>
  );
};

export default TabDetailsPage;
