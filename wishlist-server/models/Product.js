const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    wishlistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist' },
    name: { type: String, required: true },
    imageUrl: { type: String },
    price: { type: Number, required: true },
    addedBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
