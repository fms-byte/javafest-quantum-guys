"use client";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { Bell } from "lucide-react";
import { ChannelCard } from "./ChannelCard";
import { useEffect, useState } from "react";
import { ApiClient, Channel } from "@asfilab/janun-client";
import { useRouter, useSearchParams } from "next/navigation";
import WhatshotIcon from "@mui/icons-material/Whatshot";

export default function ChannelPage() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const searchParams = useSearchParams();

  const loadChannels = async (currentPage: number) => {
    try {
      setLoading(true);
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      const result = await apiClient.channel.getChannels({
        page: currentPage,
        size: 2,
      });
      console.log(result);
      if (result.data && result.data.length === 0) {
        setHasMore(false);
      } else {
        setChannels(result.data || []);
      }
      setLoading(false);      

    } catch (error) {
      console.error("Error fetching channels:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const queryPage = Number(searchParams.get("page")) || 1;
    setPage(queryPage);
  }, [searchParams]);

  useEffect(() => {
    if (page > 0) {
      router.push(`?page=${page}`, { scroll: true });
    }
    loadChannels(page);
  }, [page, router]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY + window.innerHeight;
      if (scrollTop >= scrollableHeight - 100 && !loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <Container sx={{ padding: 4 }}>
      {/* Header buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 1,
          marginBottom: 2,
          borderRadius: "full",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "50px", // Make the button rounded
            padding: "8px 16px",  // Adjust padding for a pill-shaped look
          }}
        >
          All
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={
            <WhatshotIcon
            />
          }
          sx={{
            borderRadius: "50px",
            padding: "8px 16px",
          }}
        >
          Trending
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={
            <Bell
              size={22}
            />
          }
          sx={{
            borderRadius: "50px",
            padding: "8px 16px",
          }}
        >
          Subscribed
        </Button>
      </Box>

      {channels.length === 0 && !loading && (
        <Typography>No channels found</Typography>
      )}
      {channels.map((channel) => (
        <ChannelCard key={channel.slug} channel={channel} />
      ))}
      {loading && <CircularProgress />}
    </Container>
  );
}
