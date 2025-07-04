// src/components/CommentBox.jsx
import { useState } from 'react';
import api from '../services/api';

const CommentBox = ({ product, onCommentAdded }) => {
  const [commentText, setCommentText] = useState('');
  const user = localStorage.getItem('userEmail');

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await api.post(
        `/wishlists/${product.wishlistId}/products/${product._id}/comment`,
        { user, text: commentText }
      );
      onCommentAdded(res.data);
      setCommentText('');
    } catch (err) {
      console.error('Error posting comment:', err.message);
    }
  };

  return (
    <div className="bg-white border border-[#ceb5a7] rounded-xl p-4 mt-2 w-full max-w-2xl mx-auto shadow">
      <h4 className="text-lg font-semibold text-[#0e204d] mb-3">Comments</h4>

      <div className="max-h-40 overflow-y-auto space-y-2 mb-3">
        {(product.comments || []).slice().reverse().map((cmt, idx) => (
          <div key={idx} className="bg-[#fff8f1] p-2 rounded shadow-sm text-sm">
            <p className="text-[#a0846a] font-semibold">{cmt.user}</p>
            <p className="text-gray-800">{cmt.text}</p>
            <p className="text-[10px] text-right text-gray-400">
              {new Date(cmt.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-grow p-2 border rounded border-[#d9c4b4] text-sm"
          placeholder="Write a comment..."
        />
        <button
          onClick={handleAddComment}
          className="bg-[#f9a03f] hover:bg-[#f89a2a] text-white text-sm px-4 rounded transition"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
