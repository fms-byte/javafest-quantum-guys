import Link from "next/link";
import { trendingTopics } from "@/lib/db";

export default function TrendingTopics() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Trending Topics</h2>
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
  );
}
