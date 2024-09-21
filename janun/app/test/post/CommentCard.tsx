import React from "react";
import { Comment } from "@asfilab/janun-client";

interface CommentCardProps {
  comment: Comment;
  username?: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, username }) => {
  const isOwnComment = comment.user?.username === username;

  return (
    <div
      key={comment.id}
      className={`mb-4 p-2 border rounded-md ${isOwnComment ? "bg-blue-100" : ""}`}
    >
      <p className="font-bold text-gray-600">
        {comment.anonymous ? (
          "Anonymous"
        ) : (
          <a
            href={comment.user ? `/user/${comment.user.username}` : undefined}
            className="text-red-500"
          >
            @{comment.user?.username}
          </a>
        )}
      </p>
      <p className="text-xs text-gray-400">{comment.createdAgo}</p>
      <p className="text-gray-600">{comment.content}</p>
    </div>
  );
};

export default CommentCard;
