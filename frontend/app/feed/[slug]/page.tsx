"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Posts } from "@/lib/db";
import Image from "next/image";
import ReactionComponent from "@/components/ReactionComponent";
import { Clock, SendHorizonal } from "lucide-react";
import CommentSection from "@/components/CommentSection";

const PostDetails = () => {
  const pathname = usePathname();
  const id = pathname?.split("/").pop() ?? "";
  const post = Posts.find((p) => p.slug === id.toString());

  const [votes, setVotes] = useState({
    up: post?.likesCount || 0,
    down: post?.dislikesCount || 0,
  });
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([
    "This is a great post!",
    "I really enjoyed reading this.",
  ]);

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-semibold text-gray-700">
        Post not found!
      </div>
    );
  }

  const handleVote = (type: "like" | "dislike") => {
    setVotes((prev) => ({
      ...prev,
      up: type === "like" ? prev.up + 1 : prev.up,
      down: type === "dislike" ? prev.down + 1 : prev.down,
    }));
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments((prev) => [...prev, comment]);
      setComment("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-4 p-8 border bg-white rounded-2xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{post.title}</h1>
      <div className="flex items-center justify-between mb-4 text-gray-600">
        <div className="flex items-center space-x-4">
          <span>
            {post.thread.name} | {post.channel.name} |{" "}
            {post.premium ? "Premium" : "Free"}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Updated on: {new Date(post.date).toLocaleDateString()}</span>
        </div>
      </div>
      <hr className="mb-4" />

      {post.media && post.media.length > 0 && (
        <div className="mb-8 flex justify-center">
          <Image
            src={post.media[0].url}
            alt="Post media"
            width={600}
            height={400}
            className="rounded-xl shadow-lg object-cover"
          />
        </div>
      )}

      <p className="text-gray-700 text-lg leading-relaxed mb-8">
        {post.content}
      </p>
      <div className="mt-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag.name}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      <div className="border rounded-2xl p-4 shadow-lg">
        <ReactionComponent
          likes={votes.up}
          dislikes={votes.down}
          comments={post.commentsCount}
          views={post.views}
          shares={post.sharesCount}
          reports={post.reportsCount}
          onReact={handleVote}
        />

        <div className="mt-4">
          <h2 className="font-semibold mb-2 text-gray-800">Add a Comment</h2>
          <form
            onSubmit={handleCommentSubmit}
            className="space-x-4 flex items-center justify-center "
          >
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-2xl "
              placeholder="Share your thoughts..."
              rows={4}
            />
            <button
              title="Submit comment"
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
            >
              <SendHorizonal className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
      <hr className="mt-8" />
      <CommentSection />

      
    </div>
  );
};

export default PostDetails;
