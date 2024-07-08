"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { feedData, FeedItem } from "@/lib/db";
import { ArrowUpCircle, ArrowDownCircle, MessageCircle } from "lucide-react";
import ReactionFeedback from "@/components/ReactionComponent";

const PostDetails = () => {
  const pathname = usePathname();
  const id = pathname?.split("/").pop() ?? "";
  const post = feedData.find((p) => p.id === id.toString());
  
  const [votes, setVotes] = useState({ up: 0, down: 0 });
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  if (!post) {
    return <div className="text-center p-4 text-gray-700">Post not found!</div>;
  }

  const handleVote = (type: 'up' | 'down') => {
    setVotes(prev => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments(prev => [...prev, comment]);
      setComment("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <span>{post.source}</span>
        <span>{new Date(post.date).toLocaleDateString()}</span>
      </div>
      <p className="text-gray-700 mb-6">{post.summary}</p>
      <ReactionFeedback />
    </div>
  );
};

export default PostDetails;