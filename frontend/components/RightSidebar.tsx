"use client";
import Link from "next/link";
import { trendingTopics } from "@/lib/db";
import { BsFire } from "react-icons/bs";
import { MdStarBorderPurple500 } from "react-icons/md";

const RightSidebar = () => {
  return (
    <aside className="hidden w-full md:w-1/3 lg:w-1/4 lg:flex flex-col p-4 space-y-6 overflow-y-auto">
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
        <h2 className="text-xl font-semibold mb-4 mx-auto flex flex-1">
          <BsFire className="text-orange-500 mr-2" size={24} />
          Trending Topics
          </h2>
        <ul className="space-y-2 mx-auto">
          {trendingTopics.map((trendingTopic, index) => (
            <li key={index} className="flex items-center">
              <span className="text-indigo-600 mr-2">#{index + 1}</span>
              <Link href="#" className="text-gray-700 hover:text-indigo-600">
                {trendingTopic}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
        <h2 className="text-xl font-semibold mb-4 mx-auto flex flex-1">
          <MdStarBorderPurple500 className="text-orange-500 mr-2" size={26} />
          Top Channels
          </h2>
        <ul className="space-y-2 mx-auto">
          {trendingTopics.map((trendingTopic, index) => (
            <li key={index} className="flex items-center">
              <span className="text-indigo-600 mr-2">#{index + 1}</span>
              <Link href="#" className="text-gray-700 hover:text-indigo-600">
                {trendingTopic}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default RightSidebar;
