"use client";
import { useState, useEffect } from "react";
import { feedData, FeedItemProps, PostDataProps, Posts } from "@/lib/db";
import Link from "next/link";
import PostCard from "./FeedCard";

export default function Feed() {
  const [feedItems, setFeedItems] = useState<FeedItemProps[]>([]);

  useEffect(() => {
    setFeedItems(feedData);
  }, []);

  const handleLike = (id: string) => {
    // Implement like functionality
  };

  const handleShare = (id: string) => {
    // Implement share functionality
  };

  return (
    <div className="flex flex-col mx-auto w-full md:w-2/3 lg:w-1/2 p-2 md:p-4 space-y-4 md:space-y-6 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
