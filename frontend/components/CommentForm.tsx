import React, { useState } from 'react';

interface CommentFormProps {
  itemId: string;
  parentCommentId?: string;
  onSubmit: (content: string) => void;
  placeholder?: string;
}

export default function CommentForm({ itemId, parentCommentId, onSubmit, placeholder = "Write a comment..." }: CommentFormProps) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 border rounded resize-y min-h-[100px]"
        placeholder={placeholder}
      />
      <button 
        type="submit" 
        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200 ease-in-out"
      >
        Post
      </button>
    </form>
  );
}


{/* <div className="mt-6">
<h3 className="text-lg font-semibold">Comments</h3>
{item.comments.map((comment) => (
  <CommentItem
    key={comment.id}
    comment={comment}
    itemId={item.id}
  />
))}
<CommentForm
  itemId={item.id}
  onSubmit={(content) => addComment(item.id, content)}
/>
</div> 


const addComment = (
    itemId: string,
    content: string,
    parentCommentId?: string
  ) => {
    setFeedItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          const newComment: Comment = {
            id: Date.now().toString(),
            user: "Current User", // Replace with actual user name
            content,
            replies: [],
          };

          if (parentCommentId) {
            return {
              ...item,
              comments: item.comments.map((comment) =>
                comment.id === parentCommentId
                  ? { ...comment, replies: [...comment.replies, newComment] }
                  : comment
              ),
            };
          } else {
            return {
              ...item,
              comments: [...item.comments, newComment],
            };
          }
        }
        return item;
      })
    );
  };

  const CommentItem = ({
    comment,
    itemId,
  }: {
    comment: Comment;
    itemId: string;
  }) => (
    <div className="mt-4 pl-4 border-l-2 border-gray-200">
      <p className="font-semibold">{comment.user}</p>
      <p>{comment.content}</p>
      {comment.replies.map((reply) => (
        <CommentItem key={reply.id} comment={reply} itemId={itemId} />
      ))}
      <CommentForm
        itemId={itemId}
        parentCommentId={comment.id}
        onSubmit={(content) => addComment(itemId, content, comment.id)}
        placeholder="Write a reply..."
      />
    </div>
  );


*/}