"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiClient, Post, Comment, User } from "@asfilab/janun-client";
import { Pacifico } from "next/font/google";
import PostCard from "../PostCard";
import CommentCard from "../CommentCard"; // Import CommentCard component

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
});

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
      console.log("fetching comments " + currentPage);
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

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className={`flex flex-col lg:flex-row min-h-screen bg-gray-100`}>
      <div className="w-full lg:w-2/3 p-4">
<<<<<<< HEAD:app/test/post/[slug]/page.tsx
        <a href="/test/post" className=" text-red-500 font-bold mb-8">
=======
        <a href="/timeline" className=" text-red-500 font-bold mb-8">
>>>>>>> b2e842f92f9a9f4f6a7d2ea53ff32f0d2aa58c0e:app/post/[slug]/page.tsx
          ← Back to Posts
        </a>
        <PostCard key={post.slug} post={post} />
        {loading && <p>Loading...</p>}
      </div>
      <aside className="w-full lg:w-1/3 p-4 bg-white shadow-md text-red-500">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Add a Comment</h2>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full h-24 p-2 border rounded-md mb-4"
          />

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={() => setAnonymous(!anonymous)}
                  className="sr-only"
                />
                <div
                  className={`block w-14 h-8 rounded-full ${
                    anonymous ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <div
                  className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full transition-transform ${
                    anonymous ? "translate-x-6" : ""
                  }`}
                ></div>
              </div>
              <span className="ml-3 text-gray-700">
                {anonymous ? "Anonymous" : "Public"}
              </span>
            </label>

            <button
              onClick={handleCommentSubmit}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Submit Comment
            </button>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">Comments ({commentsCount})</h2>
        <div className="mb-4">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              username={user?.username}
            /> // Use CommentCard component
          ))}
          {loadingComments && <p>Loading comments...</p>}
          {!hasMoreComments && !loadingComments && <p>No more comments.</p>}
        </div>
      </aside>
    </div>
  );
}
