const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// GET /api/wishlists?user=email
exports.getWishlists = async (req, res) => {
  const { user } = req.query;
  const lists = await Wishlist.find({ owner: user });
  res.json(lists);
};

// POST /api/wishlists
exports.createWishlist = async (req, res) => {
  const { name, owner } = req.body;
  const newList = await Wishlist.create({ name, owner });
  res.status(201).json(newList);
};

// GET /api/wishlists/:id/products
exports.getProducts = async (req, res) => {
  const products = await Product.find({ wishlistId: req.params.id });
  res.json(products);
};

// POST /api/wishlists/:id/products
exports.addProduct = async (req, res) => {
  const { name, imageUrl, price, addedBy } = req.body;
  const newProduct = await Product.create({
    wishlistId: req.params.id,
    name,
    imageUrl,
    price,
    addedBy
  });
  res.status(201).json(newProduct);
};

// DELETE /api/wishlists/:id/products/:productId
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.productId);
  res.json({ message: 'Product deleted' });
};

exports.updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    { new: true }
  );
  res.json(updated);
};


// PUT /api/wishlists/:id
exports.renameWishlist = async (req, res) => {
  try {
    const updated = await Wishlist.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to rename wishlist' });
  }
};

// DELETE /api/wishlists/:id
exports.deleteWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    await Product.deleteMany({ wishlistId: req.params.id }); // also clean related products
    res.json({ message: 'Wishlist deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete wishlist' });
  }
};

