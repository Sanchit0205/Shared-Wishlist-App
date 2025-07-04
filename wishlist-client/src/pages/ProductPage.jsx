import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import CommentBox from '../components/CommentBox';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');
  const username = localStorage.getItem('username') || 'User';
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    imageUrl: '',
    price: ''
  });
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitedEmails, setInvitedEmails] = useState([]);
  const [activeCommentProductId, setActiveCommentProductId] = useState(null);

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

  const handleEditProduct = async (updatedProduct, isReactionOnly = false) => {
    if (isReactionOnly) {
      setProducts((prev) =>
        prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
      );
    } else {
      try {
        const res = await api.put(
          `/wishlists/${id}/products/${updatedProduct._id}`,
          updatedProduct
        );
        setProducts((prev) =>
          prev.map((p) => (p._id === updatedProduct._id ? res.data : p))
        );
      } catch (err) {
        console.error('Error editing product:', err.message);
      }
    }
  };

  const handleMockInvite = () => {
    if (inviteEmail.trim()) {
      setInvitedEmails([...invitedEmails, inviteEmail.trim()]);
      setInviteEmail('');
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-[#fbc89f] px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Add Product Section */}
        <div className="bg-[#fbc89f] p-3 rounded-xl mb-9 mt-14 w-full max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-[#0e204d] mb-3">Add a New Product</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
          <div className="flex justify-center">
            <button
              onClick={handleAddProduct}
              className="mt-4 bg-[#f9a03f] hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md font-medium transition"
            >
              Add Product
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {products.map((product) => (
            <div key={product._id} className="mb-6">
              <ProductCard
                product={product}
                wishlistId={id}
                onEdit={handleEditProduct}
                onDelete={handleDelete}
                activeCommentProductId={activeCommentProductId}
                setActiveCommentProductId={setActiveCommentProductId}
              />
              {activeCommentProductId === product._id && (
                <CommentBox
                  product={product}
                  onCommentAdded={(updatedProduct) => {
                    setProducts((prev) =>
                      prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
                    );
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Invite Section */}
        <div className="bg-[#fbc89f] p-17 rounded-lg w-full max-w-xl mx-auto mt-20">
          <h2 className="text-base font-semibold text-[#0e204d] mb-3 text-center">
            Invite Others
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
};

export default ProductPage;