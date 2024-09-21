"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiClient, Post, Comment, User } from "@asfilab/janun-client";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  CircularProgress,
  Paper,
} from "@mui/material";
import PostCard from "../PostCard";
import CommentCard from "../CommentCard"; // Import CommentCard component

export default function PostPage({ params }: { params: { slug: string } }) {
  const [user, setUser] = useState<User | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(false);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [page, setPage] = useState(0);
  const { slug } = params;

  const router = useRouter();

  useEffect(() => {
    fetchPost();
  }, [slug]);

  useEffect(() => {
    fetchComments(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY + window.innerHeight;
      if (
        scrollTop >= scrollableHeight - 50 &&
        hasMoreComments &&
        !loadingComments
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMoreComments, loadingComments]);

  const fetchComments = async (currentPage: number) => {
    try {
      setLoadingComments(true);
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      const result = await apiClient.post.getComments({
        slug,
        page: currentPage,
        size: 5,
      });
      if (result.data && result.data.length === 0) {
        setHasMoreComments(false);
      } else {
        if (currentPage === 0) {
          setComments(result.data || []);
        } else {
          setComments((prevComments) => [
            ...prevComments,
            ...(result.data || []),
          ]);
        }
      }
      setCommentsCount(result.totalElements || 0);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  const fetchPost = async () => {
    try {
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      const user = await apiClient.auth.getUser();
      setUser(user);
      const result = await apiClient.post.getPost({ slug });
      setPost(result);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const apiUrl = "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const apiClient = new ApiClient(apiUrl, token);
      await apiClient.post.createComment({
        slug,
        commentCreateRequest: { content: newComment, anonymous },
      });
      setNewComment("");
      setPage(0);
      setComments([]);
      setCommentsCount(0);
      setHasMoreComments(true);
      fetchComments(0);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (loading) return <CircularProgress />;

  if (!post) return <Typography>Post not found</Typography>;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Box sx={{ flex: 1, p: 2 }}>
        <Button
          onClick={() => router.push("/feed")}
          color="primary"
          variant="contained"
          sx={{ mb: 2 }}
        >
          ← Back to Posts
        </Button>
        <PostCard key={post.slug} post={post} />
        {loading && <CircularProgress sx={{ mt: 2 }} />}
      </Box>
      <Paper
        sx={{
          flex: 1,
          p: 2,
          m: 2,
          backgroundColor: "background.paper",
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add a Comment
        </Typography>
        <TextField
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={anonymous}
                onChange={() => setAnonymous(!anonymous)}
                color="primary"
              />
            }
            label={anonymous ? "Anonymous" : "Public"}
            sx={{ mr: 2 }}
          />
          <Button
            onClick={handleCommentSubmit}
            color="primary"
            variant="contained"
          >
            Submit Comment
          </Button>
        </Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Comments ({commentsCount})
        </Typography>
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            username={user?.username}
          />
        ))}
        {loadingComments && <CircularProgress sx={{ mt: 2 }} />}
        {!hasMoreComments && !loadingComments && (
          <Typography>No more comments.</Typography>
        )}
      </Paper>
    </Container>
  );
}
