"use client";
import { useState, useEffect } from "react";
import { feedData, FeedItem } from "@/lib/db";
import Link from "next/link";

export default function Feed() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);

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
      {feedItems.map((item) => (
        <div key={item.id} className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg md:text-xl font-semibold mb-2">{item.title}</h2>
          <p className="text-xs md:text-sm text-gray-600 mb-2">
            {item.source} • {item.date}
          </p>
          <p className="text-sm md:text-base text-gray-700">{item.summary}</p>
          <div className="mt-4 flex items-center space-x-4">
            <Link href={`/feed/${item.id}`} className="text-sm md:text-base text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
              Read more
            </Link>
            <button 
              onClick={() => handleLike(item.id)}
              title="like" 
              className="text-gray-600 hover:text-red-500 transition-colors duration-300"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button 
              onClick={() => handleShare(item.id)}
              title="share" 
              className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
