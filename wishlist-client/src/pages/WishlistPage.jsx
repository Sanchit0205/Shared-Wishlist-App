import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';


const WishlistPage = () => {
  const { id } = useParams(); // Wishlist ID from URL
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');
  const [wishlistName, setWishlistName] = useState('My Wishlist');
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
  }, []);

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
      addedBy: userEmail,
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
    const res = await api.put(`/wishlists/${id}/products/${updatedProduct._id}`, updatedProduct);
    setProducts(
      products.map((p) => (p._id === updatedProduct._id ? res.data : p))
    );
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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">{wishlistName}</h1>

     <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Invite Others (Mock)</h2>
        <div className="flex gap-4 flex-col md:flex-row">
            <input
            type="email"
            placeholder="Enter friend's email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            />
            <button
            onClick={handleMockInvite}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
            Send Invite
            </button>
        </div>

        <div className="mt-3 space-y-1">
            {invitedEmails.map((email, idx) => (
            <p key={idx} className="text-sm text-green-700">
                ✔️ {email} invited (mock)
            </p>
            ))}
        </div>
        </div>

      <div className="bg-white rounded p-4 shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          onClick={handleAddProduct}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Product
        </button>
      </div>

      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
            <ProductCard
            key={product._id}
            product={product}
            onDelete={handleDelete}
            onEdit={handleEditProduct}
            />

        ))}

      </div>
    </div>
  );
};

export default WishlistPage;
