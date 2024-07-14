import React from 'react';
import Image from 'next/image';
import { PostDataProps } from '@/lib/db';

interface PostCardProps {
  post: PostDataProps;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {post.media && post.media[0] && (
        <div className="relative h-48">
          <Image 
            src={post.media[0].url} 
            alt={post.title} 
            layout="fill" 
            objectFit="cover"
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.content.substring(0, 100)}...</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{post.views} views</span>
          <span>{post.likesCount} likes</span>
          <span>{post.commentsCount} comments</span>
        </div>
        <div className="mt-2 flex flex-wrap">
          {post.tags.map((tag, index) => (
            <span key={index} className="bg-gray-200 rounded-full px-2 py-1 text-xs mr-2 mb-2">
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;