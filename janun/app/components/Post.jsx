import { useState } from "react";

import { useRouter } from "next/navigation";

export default function PostCard({ children, Liker, Disliker }) {
  const [subStat, setSubStat] = useState(children.subscribed);
  const liked = children.reacted && children.reaction == "like";
  const disliked = children.reacted && children.reaction == "dislike";
  const router = useRouter();
  // console.log(likeCount);

  return (
    <div className="m-auto my-7 z-0 relative max-w-screen-md p-4 bg-white shadow-xl rounded-lg m-4 ">
      <div className="flex items-center space-x-4 ">
        <img className="w-12 h-12 rounded-full" src="p.jpg" alt="User Avatar" />
        <div>
          <h2 className="text-gray-900 font-medium">{children.channel.name}</h2>
          <p className="text-sm text-gray-500">{children.updatedAgo}</p>
        </div>
        <div className="ml-auto absolute right-7">
          <img
            className="h-5 w-5"
            src={children.subscribed ? "subbed.svg" : "unsubbed.svg"}
          />
        </div>
      </div>
      <div className="mt-4 flex flex-row justify-between max-w-2xl">
        <div className="max-w-xl">
          <p className="text-gray-700">{children.content}</p>
          <a href="#" className="text-blue-500 hover:underline">
            Read More →
          </a>
        </div>
        <img className="max-w-52" src="p2.jpeg" alt="Post pic" />
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={() => {
              Liker(children.slug, liked);
            }}
            className={`flex items-center space-x-1 ${
              liked ? "bg-blue-300" : "bg-blue-100"
            }  hover:bg-blue-200 hover:cursor-pointer rounded-xl px-2 text-gray-500`}
          >
            <img className=" h-7 w-7" src="like.svg" />
            <span>{children.likesCount} likes</span>
          </button>
          <button
            onClick={() => {
              Disliker(children.slug, disliked);
            }}
            className={`flex items-center space-x-1 ${
              disliked ? "bg-red-300" : "bg-red-50"
            }  hover:bg-red-100 hover:cursor-pointer px-2 rounded-xl text-gray-500`}
          >
            <img className=" h-7 w-7" src="dislike.svg" />
            <span>{children.dislikesCount} dislikes</span>
          </button>
        </div>
        <div className="flex space-x-4">
          <button
            className="flex items-center space-x-1 bg-green-50 hover:bg-green-200 px-2 hover:cursor-pointer rounded-xl text-gray-500"
            onClick={() => router.push(`post/${children.slug}`)}
          >
            <img className=" h-7 w-7" src="comment.svg" />
            <span>{children.commentsCount} comments</span>
          </button>
          <span className="flex items-center space-x-1 text-gray-500">
            <img className=" h-7 w-7" src="view.svg" />
            <span>{children.views} views</span>
          </span>
        </div>
      </div>
    </div>
  );
}
