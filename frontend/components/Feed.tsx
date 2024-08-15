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
    <div className="bg-gray-50 border rounded-lg border-gray-300 h-full overflow-y-auto lg:overflow-y-visible stylish-scrollbar">
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the feed
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Here are some of the latest news and posts from our feed
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {Posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}