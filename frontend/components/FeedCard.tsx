import React from "react";
import Image from "next/image";
import { PostDataProps } from "@/lib/db";

interface PostCardProps {
  post: PostDataProps;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article
      key={post.slug}
      className="flex max-w-xl flex-col items-start justify-between bg-white shadow-md rounded-lg p-4 border border-gray-300"
    >
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={post.date} className="text-gray-500">
          {post.date}
        </time>
        <a
          href={post.media[0].url}
          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          {post.media[0].type}
        </a>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a href={`/feed/${post.slug}`}>
            <span className="absolute inset-0" />
            {post.title}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {post.content}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <img
          alt=""
          src={"via.placeholder.com/150"}
          className="h-10 w-10 rounded-full bg-gray-50"
        />
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <a href={"#"}>
              <span className="absolute inset-0" />
              {post.channel.name}
            </a>
          </p>
          <p className="text-gray-600">{post.channel.premium}</p>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
