"use client";
import Link from "next/link";
import { trendingTopics } from "@/lib/db";
import { BsFire } from "react-icons/bs";
import { MdStarBorderPurple500 } from "react-icons/md";
import { useAuthProvider } from "@/lib/contexts/AuthContext";

const RightSidebar = () => {
  const { logout } = useAuthProvider();
  return (
    <aside className="hidden lg:flex flex-col p-4 space-y-6 h-full overflow-y-auto stylish-scrollbar">
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BsFire className="text-orange-500 mr-2" size={24} />
          Trending Topics
        </h2>
        <ul className="space-y-2">
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
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <MdStarBorderPurple500 className="text-orange-500 mr-2" size={26} />
          Top Channels
        </h2>
        <ul className="space-y-2">
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

      <button onClick={logout} className="text-sm text-red-500">
        Logout
      </button>
    </aside>
  );
};

export default RightSidebar;