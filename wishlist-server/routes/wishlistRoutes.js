const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // ✅ ADD THIS

const {
  getWishlists,
  createWishlist,
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  renameWishlist,
  deleteWishlist
} = require('../controllers/wishlistController');

// Wishlist routes
router.get('/', getWishlists);
router.post('/', createWishlist);
router.put('/:id', renameWishlist);
router.delete('/:id', deleteWishlist);

// Product routes
router.get('/:id/products', getProducts);
router.post('/:id/products', addProduct);
router.delete('/:id/products/:productId', deleteProduct);
router.put('/:id/products/:productId', updateProduct);

// ✅ Emoji Reaction Route
router.patch('/:id/products/:productId/react', async (req, res) => {
  const { emoji, user } = req.body;

  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Sanitize key (dots not allowed in Mongo keys)
    const safeUserKey = user.replace(/\./g, '_');

    // Initialize reactions/maps if missing
    if (!product.reactions) product.reactions = new Map();
    if (!product.userReactions) product.userReactions = new Map();

    // Remove previous reaction
    const prev = product.userReactions.get(safeUserKey);
    if (prev && product.reactions.get(prev)) {
      product.reactions.set(prev, Math.max(product.reactions.get(prev) - 1, 0));
    }

    // Add new reaction
    product.userReactions.set(safeUserKey, emoji);
    product.reactions.set(emoji, (product.reactions.get(emoji) || 0) + 1);

    // Force mongoose to track changes in Map fields
    product.markModified('reactions');
    product.markModified('userReactions');

    // Debug logs (optional)
    console.log('Reactions:', Object.fromEntries(product.reactions));
    console.log('UserReactions:', Object.fromEntries(product.userReactions));

    await product.save();
    res.json(product);
  } catch (err) {
    console.error('Emoji reaction error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST /wishlists/:id/products/:productId/comment
router.post('/:id/products/:productId/comment', async (req, res) => {
  const { user, text } = req.body;

  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const newComment = { user, text };
    product.comments.push(newComment);

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('Comment error:', err.message);
    res.status(500).json({ error: err.message });
  }
});





module.exports = router;
