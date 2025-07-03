const express = require('express');
const router = express.Router();
const {
  getWishlists,
  createWishlist,
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct // ✅ add this
} = require('../controllers/wishlistController');



// Wishlists
router.get('/', getWishlists);
router.post('/', createWishlist);

// Products
router.get('/:id/products', getProducts);
router.post('/:id/products', addProduct);
router.delete('/:id/products/:productId', deleteProduct);
router.put('/:id/products/:productId', updateProduct);


module.exports = router;
