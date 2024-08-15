import React, { useState } from "react";
import {
  ThumbsUp,
  MessageSquare,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type Comment = {
  id: string;
  user: string;
  content: string;
  likes: number;
  replies: Comment[];
};

const CommentItem = ({
  comment,
  onReply,
  onLike,
  depth = 0,
}: {
  comment: Comment;
  onReply: (parentId: string, replyContent: string) => void;
  onLike: (commentId: string) => void;
  depth?: number;
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showReplies, setShowReplies] = useState(false);

  const handleReplySubmit = () => {
    onReply(comment.id, replyContent);
    setReplyContent("");
    setShowReplyInput(false);
  };

  return (
    <div
      className={`border bg-slate-50 p-4 rounded-xl mb-1 ${
        depth > 0 ? "ml-4" : ""
      }`}
    >
      <div className="flex items-center mb-2">
        <User className="w-5 h-5 mr-2 text-gray-500" />
        <span className="font-semibold text-gray-700">{comment.user}</span>
      </div>
      <p className="text-gray-700 mb-3">{comment.content}</p>
      <div className="flex items-center space-x-4 mb-3">
        <button
          onClick={() => onLike(comment.id)}
          className="flex items-center text-gray-500 hover:text-blue-500 transition-colors duration-200"
        >
          <ThumbsUp className="w-4 h-4 mr-1" />
          <span>{comment.likes}</span>
        </button>
        <button
          onClick={() => setShowReplyInput(!showReplyInput)}
          className="flex items-center text-gray-500 hover:text-blue-500 transition-colors duration-200"
        >
          <MessageSquare className="w-4 h-4 mr-1" />
          <span>Reply</span>
        </button>
        {comment.replies.length > 0 && (
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="flex items-center text-gray-500 hover:text-blue-500 transition-colors duration-200"
          >
            {showReplies ? (
              <ChevronUp className="w-4 h-4 mr-1" />
            ) : (
              <ChevronDown className="w-4 h-4 mr-1" />
            )}
            <span>
              {comment.replies.length}{" "}
              {comment.replies.length === 1 ? "reply" : "replies"}
            </span>
          </button>
        )}
      </div>
      {showReplyInput && (
        <div className="mb-3">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write a reply..."
            rows={2}
          />
          <button
            onClick={handleReplySubmit}
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Submit Reply
          </button>
        </div>
      )}
      {showReplies && comment.replies.length > 0 && (
        <div className="mt-2 border-l-2 border-gray-300 pl-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onLike={onLike}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};


const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: "John Doe",
      content: "This is a great post!",
      likes: 2,
      replies: [
        {
          id: "2",
          user: "Jane Doe",
          content: "I agree with you!",
          likes: 1,
          replies: [],
        },
      ],
    },
    {
      id: "3",
      user: "Alice",
      content: "Nice post!",
      likes: 1,
      replies: [],
    },
    {
      id: "4",
      user: "Farhan",
      content: "Nice post!",
      likes: 1,
      replies: [],
    },
    {
      id: "5",
      user: "Masud",
      content: "Nice post!",
      likes: 1,
      replies: [],
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  const addComment = () => {
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        user: "Anonymous User",
        content: newComment,
        likes: 0,
        replies: [],
      };
      setComments([newCommentObj, ...comments]);
      setNewComment("");
    }
  };

  const handleReply = (parentId: string, replyContent: string) => {
    const addReplyToComment = (comment: Comment): Comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: Date.now().toString(),
              user: "Anonymous User",
              content: replyContent,
              likes: 0,
              replies: [],
            },
          ],
        };
      }
      return {
        ...comment,
        replies: comment.replies.map(addReplyToComment),
      };
    };

    setComments(comments.map(addReplyToComment));
  };

  const handleLike = (commentId: string) => {
    const likeComment = (comment: Comment): Comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return {
        ...comment,
        replies: comment.replies.map(likeComment),
      };
    };

    setComments(comments.map(likeComment));
  };

  const visibleComments = showAllComments ? comments : comments.slice(0, 3);

  return (
    <div className="mt-2 mb-8">
      <h2 className="font-semibold mb-4 text-gray-800">{showAllComments? "All " : "Latest "}Comments</h2>
      <div className="bg-gray-200 rounded-2xl p-1">
        {visibleComments.length > 0 ? (
          visibleComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              onLike={handleLike}
            />
          ))
        ) : (
          <p className="text-gray-500 italic p-4">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
      {!showAllComments && comments.length > 3 && (
        <button
          onClick={() => setShowAllComments(true)}
          className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          Show All Comments ({comments.length})
        </button>
      )}

      {showAllComments && (
        <button
            onClick={() => setShowAllComments(false)}
            className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
            Hide All Comments
        </button>
      )}
    </div>
  );
};

export default CommentSection;
