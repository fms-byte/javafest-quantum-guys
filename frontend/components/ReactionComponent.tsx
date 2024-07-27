// components/ReactionComponent.tsx
import React from 'react';
import { MessageCircle, Eye, Share2, Flag, ThumbsUp, ThumbsDown } from "lucide-react";

interface ReactionComponentProps {
  likes: number;
  dislikes: number;
  comments: number;
  views: number;
  shares: number;
  reports: number;
  onReact: (type: 'like' | 'dislike') => void;
}

const ReactionComponent: React.FC<ReactionComponentProps> = ({
  likes,
  dislikes,
  comments,
  views,
  shares,
  reports,
  onReact
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center bg-gray-100 rounded-full shadow-inner">
        <button 
          title='Like'
          onClick={() => onReact('like')} 
          className="flex items-center space-x-2 text-gray-600 rounded-l-full px-4 py-1 hover:bg-green-200 hover:text-green-600 transition-colors duration-200"
        >
          <ThumbsUp className="w-6 h-6"/>
          <span className="font-semibold">{likes}</span>
        </button>
        <button 
          title='Dislike'
          onClick={() => onReact('dislike')} 
          className="flex items-center space-x-2 text-gray-600 rounded-r-full px-4 py-1 hover:bg-red-200 hover:text-red-600 transition-colors duration-200"
        >
          <ThumbsDown className="w-6 h-6" />
          <span className="font-semibold">{dislikes}</span>
        </button>
      </div>
      <div className="flex items-center space-x-6 bg-gray-100 px-4 py-1 rounded-full shadow-inner text-gray-600">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5" />
          <span>{comments}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Eye className="w-5 h-5" />
          <span>{views}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Share2 className="w-5 h-5" />
          <span>{shares}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Flag className="w-5 h-5" />
          <span>{reports}</span>
        </div>
      </div>
    </div>
  );
};

export default ReactionComponent;