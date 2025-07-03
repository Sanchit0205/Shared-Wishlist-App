const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner: { type: String, required: true }, // email
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wishlist', wishlistSchema);
