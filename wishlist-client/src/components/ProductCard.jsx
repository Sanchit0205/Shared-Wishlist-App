import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const ProductCard = ({
  product,
  onEdit,
  onDelete,
  wishlistId,
  activeCommentProductId,
  setActiveCommentProductId,
}) => {
  const [editing, setEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);
  const [showPicker, setShowPicker] = useState(false);
  const [commentText, setCommentText] = useState('');

  const user = localStorage.getItem('userEmail');
  const safeUserKey = user?.replace(/\./g, '_'); // Gmail-safe for Mongo
  const currentEmoji = product.userReactions?.[safeUserKey];
  const emojis = ['👍', '❤️', '🔥', '😂', '😮'];

  const handleSave = () => {
    onEdit(editedProduct);
    setEditing(false);
  };

  const handleEmojiSelect = async (emoji) => {
    if (!user) return;
    try {
      const res = await api.patch(
        `/wishlists/${wishlistId}/products/${product._id}/react`,
        { emoji, user }
      );
      onEdit(res.data, true);
    } catch (err) {
      console.error('Error reacting with emoji:', err.message);
    }
    setShowPicker(false);
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await api.post(
        `/wishlists/${wishlistId}/products/${product._id}/comment`,
        { user, text: commentText.trim() }
      );
      onEdit(res.data);
      setCommentText('');
    } catch (err) {
      console.error('Error adding comment:', err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
      layout
      className="relative group w-full bg-[#fde0c4] p-4 rounded-3xl border border-[#e8d9c4] shadow-sm hover:shadow-lg hover:scale-[1.06] hover:border-[#f9a03f] transition-all duration-300 mt-5"
    >
      {/* Top-left Owner */}
      <div className="absolute bg-white top-3 left-4 text-xs text-[#a0846a] rounded-full px-2 py-1 shadow-sm">
        🧑‍🎨{product.addedBy}
      </div>
      {/* Top-right Edit/Delete Buttons */}
      {!editing && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 flex gap-2 transition-opacity duration-300 z-30">
          <button
            onClick={() => setEditing(true)}
            className="bg-[#fef3e7] border border-[#f3dec7] text-[#c28840] px-2 py-1 rounded-md shadow-sm hover:bg-[#f9e1c6] transition text-sm font-semibold"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="bg-[#fdeaea] border border-[#f3bcbc] text-red-500 px-2 py-1 rounded-md shadow-sm hover:bg-[#fcd3d3] transition text-sm font-semibold"
          >
            🗑️
          </button>
        </div>
      )}

      {/* Product Image */}
      <img
        src={product.imageUrl}
        // alt={product.name}
        className="w-full h-40 object-cover rounded-xl mb-3 mt-8 border border-[#f4e3c9]"
      />

      {/* Info Row: Name/Price left, Emoji/Comment right */}
      {!editing ? (
        <div className="flex justify-between items-end">
          <div className="flex flex-col ml-2">
            <h3 className="font-semibold text-lg text-[#0e204d] mb-1 truncate">
              {product.name}
            </h3>
            <p className="font-semibold text-sm text-[#4d3c30] ml-0.5">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative z-20">
              <button
                onClick={() => setShowPicker(!showPicker)}
                className="text-xl hover:scale-110 transition-transform"
                title={currentEmoji ? 'Change Reaction' : 'React'}
              >
                {currentEmoji || '♡'}
              </button>
              {currentEmoji && product.reactions?.[currentEmoji] > 0 && (
                <span className="text-sm text-gray-700">{product.reactions[currentEmoji]}</span>
              )}

              <AnimatePresence>
                {showPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="absolute bottom-8 right-0 bg-white border border-[#f3dec7] rounded-xl shadow-lg p-2 flex gap-2 z-50"
                  >
                    {emojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleEmojiSelect(emoji)}
                        className="text-xl hover:scale-125 transition-all duration-150"
                      >
                        {emoji}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => {
                const isOpen = activeCommentProductId === product._id;
                setActiveCommentProductId(isOpen ? null : product._id);
              }}
              className="text-sm text-[#444] border border-[#f3dec7] rounded-full px-2 hover:bg-[#fff1e6] shadow"
              title="Toggle Comments"
            >
              💬
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 mt-2">
          <input
            value={editedProduct.name}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, name: e.target.value })
            }
            className="p-2 border border-[#e8d9c4] rounded bg-white text-sm"
            placeholder="Product Name"
          />
          <input
            value={editedProduct.imageUrl}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, imageUrl: e.target.value })
            }
            className="p-2 border border-[#e8d9c4] rounded bg-white text-sm"
            placeholder="Image URL"
          />
          <input
            type="number"
            value={editedProduct.price}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, price: e.target.value })
            }
            className="p-2 border border-[#e8d9c4] rounded bg-white text-sm"
            placeholder="Price"
          />
          <div className="flex gap-2 mt-1">
            <button
              onClick={handleSave}
              className="bg-[#5e9b8a] text-white px-4 py-1 rounded hover:bg-[#4d897a] text-sm"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard;