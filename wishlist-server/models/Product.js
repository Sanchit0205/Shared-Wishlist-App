// wishlist-server\models\Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    wishlistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist' },
    name: { type: String, required: true },
    imageUrl: { type: String },
    price: { type: Number, required: true },
    addedBy: { type: String, required: true },
    reactions: {
      type: Map,
      of: Number,
      default: {},
    },
    userReactions: {
      type: Map,
      of: String,
      default: {},
    },
    comments: [
      {
        user: String,
        text: String,
        timestamp: {
          type: Date,
          default: Date.now
        }
      }
    ]


  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
