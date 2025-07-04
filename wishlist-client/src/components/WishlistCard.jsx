// src/components/WishlistCard.jsx
import { motion } from 'framer-motion';

const WishlistCard = ({ list, username, onGoTo, onRename, onDelete }) => {
  return (
    <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -10 }}
        transition={{
            duration: 0.3,
            ease: "linear" 
        }}
        className="bg-[#fde0c4] border border-[#f3dec7] rounded-2xl shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col justify-between h-48 w-full aspect-square"
        >   
      {/* Wishlist Name (centered) */}
      <div
        onClick={() => onGoTo(list._id)}
        className="cursor-pointer flex-grow flex flex-col justify-center items-center text-center"
      >
        <h2 className="text-lg font-semibold text-[#b36f22] truncate">
          {list.name}
        </h2>
      </div>

      {/* Footer Row */}
      <div className="flex items-center justify-between mt-3 text-sm">
        {/* 👤 Owner on left */}
        <p className="text-[#a18372] truncate">🧑‍🎨 {username}</p>
        {/* ✏️ 🗑️ Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onRename(list)}
            className="text-[#c28840] opacity-60 hover:opacity-100 hover:underline font-semibold transition"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(list)}
            className="text-red-500 opacity-60 hover:opacity-100 hover:underline font-semibold transition"
          >
            🗑️
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default WishlistCard;
