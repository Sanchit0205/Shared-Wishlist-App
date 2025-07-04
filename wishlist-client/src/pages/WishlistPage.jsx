import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const WishlistPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');
  const username = localStorage.getItem('username') || 'User';
//   const [wishlistName, setWishlistName] = useState(`${username}'s Wishlist`);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    imageUrl: '',
    price: ''
  });
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitedEmails, setInvitedEmails] = useState([]);

useEffect(() => {
  if (!userEmail) {
    navigate('/');
  } else {
    fetchProducts();
  }
}, [userEmail, navigate]);


  const fetchProducts = async () => {
    try {
      const res = await api.get(`/wishlists/${id}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err.message);
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.imageUrl || !newProduct.price) return;

    try {
      const res = await api.post(`/wishlists/${id}/products`, {
        ...newProduct,
        addedBy: username,
      });
      setProducts([...products, res.data]);
      setNewProduct({ name: '', imageUrl: '', price: '' });
    } catch (err) {
      console.error('Error adding product:', err.message);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await api.delete(`/wishlists/${id}/products/${productId}`);
      setProducts(products.filter((p) => p._id !== productId));
    } catch (err) {
      console.error('Error deleting product:', err.message);
    }
  };

  const handleEditProduct = async (updatedProduct) => {
    try {
      const res = await api.put(
        `/wishlists/${id}/products/${updatedProduct._id}`,
        updatedProduct
      );
      setProducts(products.map((p) => (p._id === updatedProduct._id ? res.data : p)));
    } catch (err) {
      console.error('Error editing product:', err.message);
    }
  };

  const handleMockInvite = () => {
    if (inviteEmail.trim()) {
      setInvitedEmails([...invitedEmails, inviteEmail.trim()]);
      setInviteEmail('');
    }
  };

  return (
    // inside return (
<div className="pt-24 min-h-screen bg-[#fefefe] px-4 pb-10">
  <div className="max-w-6xl mx-auto">

    {/* Greeting */}
    <h1 className="text-3xl font-bold text-[#0e204d] mb-6 text-center md:text-left">
      Welcome, <span className="text-[#f9a03f]">{username}</span> 👋
    </h1>

    {/* Add Product Section */}
    <div className="bg-[#fffaf2] p-6 rounded-xl shadow-md mb-8 border border-[#f9e0b6]">
      <h2 className="text-xl font-semibold text-[#0e204d] mb-4">Add a New Product</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="p-3 border border-[#ceb5a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f9a03f]"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.imageUrl}
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
          className="p-3 border border-[#ceb5a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f9a03f]"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="p-3 border border-[#ceb5a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f9a03f]"
        />
      </div>
      <button
        onClick={handleAddProduct}
        className="mt-5 bg-[#f9a03f] hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md font-medium transition"
      >
        Add Product
      </button>
    </div>

    {/* Product Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onDelete={handleDelete}
          onEdit={handleEditProduct}
        />
      ))}
    </div>

    {/* Invite Section (Smaller, Lighter Card) */}
    <div className="bg-[#f9f9f6] p-5 rounded-lg shadow-sm border border-[#d7ccc8] w-full max-w-xl mx-auto mt-20">


      <h2 className="text-base font-semibold text-[#0e204d] mb-3 text-center">
        Invite Others (Mock)
      </h2>

      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="email"
          placeholder="Enter friend's email"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          className="p-2 border border-[#ceb5a7] rounded-md w-full text-sm focus:outline-none focus:ring-1 focus:ring-[#f9a03f]"
        />
        <button
          onClick={handleMockInvite}
          className="bg-[#f9a03f] hover:bg-[#f89a2a] text-white px-4 py-2 rounded-md text-sm shadow-sm transition font-medium"
        >
          Send
        </button>
      </div>

      {invitedEmails.length > 0 && (
        <div className="mt-2 space-y-0.5">
          {invitedEmails.map((email, idx) => (
            <p key={idx} className="text-xs text-green-700 text-center">
              ✔️ {email} invited (mock)
            </p>
          ))}
        </div>
      )}
    </div>

  </div>
</div>
    );
    }
export default WishlistPage;
