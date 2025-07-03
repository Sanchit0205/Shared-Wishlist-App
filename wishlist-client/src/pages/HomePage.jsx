import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const HomePage = () => {
  const [wishlists, setWishlists] = useState([]);
  const [newWishlistName, setNewWishlistName] = useState('');
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (!userEmail) {
      navigate('/');
    } else {
      fetchWishlists();
    }
  }, []);

  const fetchWishlists = async () => {
    try {
      const res = await api.get(`/wishlists?user=${userEmail}`);
      setWishlists(res.data);
    } catch (err) {
      console.error('Error fetching wishlists:', err.message);
    }
  };

  const handleCreateWishlist = async () => {
    if (!newWishlistName.trim()) return;

    try {
      const res = await api.post('/wishlists', {
        name: newWishlistName,
        owner: userEmail,
      });
      setWishlists([...wishlists, res.data]);
      setNewWishlistName('');
    } catch (err) {
      console.error('Error creating wishlist:', err.message);
    }
  };

  const goToWishlist = (id) => {
    navigate(`/wishlist/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {userEmail}</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="New Wishlist Name"
          value={newWishlistName}
          onChange={(e) => setNewWishlistName(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <button
          onClick={handleCreateWishlist}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlists.map((list) => (
          <div
            key={list._id}
            className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer transition"
            onClick={() => goToWishlist(list._id)}
          >
            <h2 className="text-lg font-semibold">{list.name}</h2>
            <p className="text-sm text-gray-500">Owner: {list.owner}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
