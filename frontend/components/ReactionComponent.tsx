"use client";
import React, { useState } from "react";
import { ThumbsUp, Heart, Laugh, AlertCircle, Frown, Flame, Send } from "lucide-react";

type Reaction = "like" | "love" | "haha" | "wow" | "sad" | "angry" | null;

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

const ReactionButton: React.FC<{ 
  icon: React.ReactNode, 
  label: string, 
  isActive: boolean, 
  onClick: () => void 
}> = ({ icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center p-2 rounded transition-colors ${
      isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
    }`}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
);

const ReactionFeedback: React.FC = () => {
  const [reaction, setReaction] = useState<Reaction>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleReaction = (newReaction: Reaction) => {
    setReaction(prev => prev === newReaction ? null : newReaction);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: "Current User", // In a real app, get this from authentication
        content: newComment,
        timestamp: new Date(),
      };
      setComments(prev => [...prev, comment]);
      setNewComment("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="flex justify-between border-b pb-4">
        <ReactionButton 
          icon={<ThumbsUp size={24} />} 
          label="Like" 
          isActive={reaction === "like"}
          onClick={() => handleReaction("like")}
        />
        <ReactionButton 
          icon={<Heart size={24} color="red" />} 
          label="Love" 
          isActive={reaction === "love"}
          onClick={() => handleReaction("love")}
        />
        <ReactionButton 
          icon={<Laugh size={24} color="yellow" />} 
          label="Haha" 
          isActive={reaction === "haha"}
          onClick={() => handleReaction("haha")}
        />
        <ReactionButton 
          icon={<AlertCircle size={24} color="yellow" />} 
          label="Wow" 
          isActive={reaction === "wow"}
          onClick={() => handleReaction("wow")}
        />
        <ReactionButton 
          icon={<Frown size={24} color="yellow" />} 
          label="Sad" 
          isActive={reaction === "sad"}
          onClick={() => handleReaction("sad")}
        />
        <ReactionButton 
          icon={<Flame size={24} color="orange" />} 
          label="Angry" 
          isActive={reaction === "angry"}
          onClick={() => handleReaction("angry")}
        />
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-lg mb-2">Comments</h3>
        {comments.map(comment => (
          <div key={comment.id} className="bg-gray-50 rounded p-3 mb-2">
            <div className="font-semibold">{comment.author}</div>
            <div>{comment.content}</div>
            <div className="text-xs text-gray-500 mt-1">
              {comment.timestamp.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleComment} className="mt-4">
        <div className="flex">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReactionFeedback;