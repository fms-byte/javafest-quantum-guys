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