// PostCard.js
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Avatar,
  Box,
  Chip,
  Divider,
  Modal,
  Button,
} from "@mui/material";
import { FaThumbsUp, FaThumbsDown, FaBell } from "react-icons/fa";
import { MediaMin, Post, TagMin, ApiClient } from "@asfilab/janun-client";
import { format } from "date-fns";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [hasReacted, setHasReacted] = useState(post.reacted);
  const [reactionType, setReactionType] = useState(post.reaction || "none");
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [dislikesCount, setDislikesCount] = useState(post.dislikesCount || 0);
  const [loading, setLoading] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const isInDetailsPage = pathname.startsWith('/feed/');

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

  const toggleShowAllImages = (e: React.MouseEvent) => {
    e.stopPropagation();
    if(isInDetailsPage) {
      setShowAllImages(!showAllImages);
    } else {
      handleClick();
    }    
  };

  const handleImageClick = (e: React.MouseEvent, imageUrl: string) => {
    e.stopPropagation();
    setSelectedImage(imageUrl);
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
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
          {/* {post.createdAgo} */}
          {format(new Date(post.createdAt), "MMMM d, yyyy 'at' h:mm a")}
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
              gridTemplateColumns: `repeat(${Math.min(post.media.length, 2)}, 1fr)`,
            }}
          >
            {/* Show all images logic */}
            {showAllImages ? (
              post.media.map((media: MediaMin, index: number) => (
                <Avatar
                  key={index}
                  variant="rounded"
                  src={media.url}
                  sx={{ width: "100%", height: "auto" }}
                  onClick={(e) => handleImageClick(e, media.url)}
                />
              ))
            ) : (
              // Show only one image initially
              <>
                {post.media.slice(0, 1).map((media: MediaMin, index: number) => (
                  <Avatar
                    key={index}
                    variant="rounded"
                    src={media.url}
                    sx={{
                      width: "100%",
                      height: "auto",
                      mb: 1,
                      gridColumn: post.media.length === 1 ? "span 2" : "auto",
                    }}
                    onClick={(e) => handleImageClick(e, media.url)}
                  />
                ))}
              </>
            )}

            {/* Button to toggle images and show the second image with + count */}
            {post.media.length > 1 && !showAllImages && (
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
                  src={post.media[1].url}
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
                    cursor: "pointer",
                  }}
                  onClick={toggleShowAllImages}
                >
                  +{post.media.length - 1}
                </Box>
              </Box>
            )}

            {/* Hide/Show images button */}
            {showAllImages && post.media.length > 1 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 1,
                  gridColumn: "span 2",
                }}
              >
                <Button
                  onClick={toggleShowAllImages}
                  sx={{ mt: 1 }}
                  variant="outlined"
                  size="small"
                >
                  {showAllImages ? "Hide Images" : `Show All (${post.media.length})`}
                </Button>
              </Box>
            )}
          </Box>
        )}


        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
          {post.tags &&
            Array.from(post.tags).map((tag: TagMin, index: number) => (
              <Chip
                key={index}
                label={tag.name}
                size="small"
                color="secondary"
              />
            ))}
        </Box>

        <Divider />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="body2" color="textSecondary">
              {post.commentsCount} Comments
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {post.views} Views
            </Typography>
          </Box>
        </Box>

      </CardContent>

      <Modal
        open={openImageModal}
        onClose={handleCloseImageModal}
        aria-labelledby="image-modal"
        aria-describedby="full-size-image"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "90%",
            maxHeight: "90%",
          }}
        >
          {/* <img
            src={selectedImage}
            alt="Full size"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            /> */}
          <Avatar
            variant="rounded"
            src={selectedImage}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
      </Modal>
    </Card>
  );
};

export default PostCard;
