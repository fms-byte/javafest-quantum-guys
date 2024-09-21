import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MediaMin, Post, TagMin, ApiClient } from "@asfilab/janun-client";
import { FaThumbsUp, FaThumbsDown, FaBell } from "react-icons/fa";

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
    router.push(`/post/${post.slug}`);
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
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden mb-4 cursor-pointer relative"
      onClick={handleClick}
    >
      {post.subscribed && (
        <div className="absolute top-2 right-2">
          <FaBell className="text-red-500 text-2xl" />
        </div>
      )}
      <div className="p-4">
        <p className="text-sm text-red-500 mb-1">
          @{post.channel?.slug}/{post.thread?.slug}
        </p>
        <h2 className="text-2xl font-bold text-red-400 mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-4">{post.content}</p>
        {post.media && post.media.length > 0 && (
          <div className="mb-4">
            {post.media.map((media: MediaMin, index: number) => (
              <img
                key={index}
                src={media.url}
                alt={`Media ${index}`}
                className="w-full h-auto mb-2 rounded-md"
              />
            ))}
          </div>
        )}
        <div className="flex justify-between items-center text-gray-600 text-sm mb-4">
          <span>{post.createdAgo}</span>
          <div className="flex space-x-4">
            <span>{post.commentsCount} Comments</span>
            <span>{post.views} Views</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReaction("like");
            }}
            className={`flex items-center space-x-1 py-2 px-4 rounded-md ${
              reactionType === "like" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
            disabled={loading}
          >
            <FaThumbsUp className="text-xl" />
            <span>{likesCount}</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReaction("dislike");
            }}
            className={`flex items-center space-x-1 py-2 px-4 rounded-md ${
              reactionType === "dislike" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
            disabled={loading}
          >
            <FaThumbsDown className="text-xl" />
            <span>{dislikesCount}</span>
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags &&
            Array.from(post.tags).map((tag: TagMin, index: number) => (
              <span
                key={index}
                className="bg-red-600 text-white text-xs font-medium rounded-full px-2 py-1"
              >
                {tag.name}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
