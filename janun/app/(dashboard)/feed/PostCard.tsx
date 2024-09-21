// PostCard.js
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import { FaThumbsUp, FaThumbsDown, FaBell } from "react-icons/fa";
import { MediaMin, Post, TagMin, ApiClient } from "@asfilab/janun-client";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();
  const [hasReacted, setHasReacted] = useState(post.reacted);
  const [reactionType, setReactionType] = useState(post.reaction || "none");
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [dislikesCount, setDislikesCount] = useState(post.dislikesCount || 0);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    router.push(`/feed/${post.slug}`);
  };

  const handleReaction = async (type: "like" | "dislike") => {
    try {
      setLoading(true);
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      if (post.slug === undefined) {
        throw new Error("Post slug is undefined");
      }
      await apiClient.post.reactToPost({ slug: post.slug, type });

      if (reactionType === "like") {
        setLikesCount((prev) => prev - 1);
      } else if (reactionType === "dislike") {
        setDislikesCount((prev) => prev - 1);
      }
      setReactionType(type);
      setHasReacted(true);

      if (type === "like") {
        setLikesCount((prev) => prev + 1);
      } else if (type === "dislike") {
        setDislikesCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error reacting to post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: "100vw",
        mb: 4,
        cursor: "pointer",
        position: "relative",
        boxShadow: 3,
      }}
      onClick={handleClick}
    >
      {post.subscribed && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "red",
          }}
        >
          <FaBell />
        </Box>
      )}
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          @{post.channel?.slug}/{post.thread?.slug}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {post.createdAgo}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1" color="textPrimary" paragraph>
          {post.content}
        </Typography>
        {post.media && post.media.length > 0 && (
          <Box
            sx={{
              mb: 2,
              display: "grid",
              gap: 1,
              gridTemplateColumns: `repeat(${Math.min(
                post.media.length,
                2
              )}, 1fr)`,
            }}
          >
            {post.media.slice(0, 4).map((media: MediaMin, index: number) => (
              <Avatar
                key={index}
                variant="rounded"
                src={media.url}
                sx={{
                  width: "100%",
                  height: "auto",
                  mb: 1,
                  gridColumn: post.media?.length === 1 ? "span 2" : "auto",
                }}
              />
            ))}
            {post.media.length > 4 && (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  gridColumn: "span 1",
                }}
              >
                <Avatar
                  variant="rounded"
                  src={post.media[4].url}
                  sx={{ width: "100%", height: "auto", opacity: 0.7 }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    fontSize: 24,
                    fontWeight: "bold",
                  }}
                >
                  +{post.media.length - 4}
                </Box>
              </Box>
            )}
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="body2" color="textSecondary">
              {post.commentsCount} Comments
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {post.views} Views
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleReaction("like");
            }}
            color={reactionType === "like" ? "primary" : "default"}
            disabled={loading}
          >
            <FaThumbsUp />
            <Typography variant="body2" color="textSecondary" ml="5px">
              {likesCount}
            </Typography>
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleReaction("dislike");
            }}
            color={reactionType === "dislike" ? "secondary" : "default"}
            disabled={loading}
          >
            <FaThumbsDown />
            <Typography variant="body2" color="textSecondary" ml="5px">
              {dislikesCount}
            </Typography>
          </IconButton>
        </Box>
        <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
          {post.tags &&
            Array.from(post.tags).map((tag: TagMin, index: number) => (
              <Typography
                key={index}
                variant="caption"
                color="white"
                sx={{
                  backgroundColor: "red",
                  borderRadius: "12px",
                  padding: "2px 6px",
                }}
              >
                {tag.name}
              </Typography>
            ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
