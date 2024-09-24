"use client";
import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import StarsIcon from "@mui/icons-material/Stars";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { ApiClient, Channel } from "@asfilab/janun-client";

export const ChannelCard = ({ channel }: { channel: Channel }) => {
  const [channelData, setChannelData] = useState<Channel>(channel);
  const [isSubscribed, setSubscribed] = useState(channelData.subscribed);
  const [channelName, setChannelName] = useState(channelData.name);
  const [channelSlug, setChannelSlug] = useState(channelData.slug);
  const [channelSubscribers, setChannelSubscribers] = useState(
    channelData.subscriberCount
  );
  const [channelLogo, setChannelLogo] = useState(channelData.logo);
  const [isPremium, setIsPremium] = useState(channelData.premium);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (type: "subscribe" | "unsubscribe") => {
    try {
      setLoading(true);
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      if (channel.slug === undefined) {
        throw new Error("Post slug is undefined");
      }
      if (type === "subscribe") {
        await apiClient.channel.subscribeChannel({ slug: channel.slug });
        setChannelSubscribers(channelSubscribers + 1);
        setSubscribed(true);
      } else {
        await apiClient.channel.unsubscribeChannel({ slug: channel.slug });
        setChannelSubscribers(channelSubscribers - 1);
        setSubscribed(false);
      }
    } catch (error) {
      console.error("Error subscribing to channel:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        marginBottom: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 50,
            height: 50,
            marginRight: 2,
          }}
          src={channelLogo || ""}
        />
        <CardContent>
          <Typography variant="h6">
            {channelName} <StarsIcon />
          </Typography>
          <Typography variant="body2" color="textSecondary">
            @{channelSlug} {channelSubscribers} subscribers
          </Typography>
        </CardContent>
      </Box>
      <Box>
        {isSubscribed ? (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => {
                e.stopPropagation();
                handleSubscribe("unsubscribe");
              }}
              disabled={loading}
              sx={{ marginRight: 1 }}
            >
              Subscribed
            </Button>
            <IconButton color="primary">
              <NotificationsActiveIcon />
            </IconButton>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              handleSubscribe("subscribe");
            }}
            disabled={loading}
          >
            Subscribe
          </Button>
        )}
      </Box>
    </Card>
  );
};
