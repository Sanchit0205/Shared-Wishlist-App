import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const RenameModal = ({ visible, currentName, onClose, onSave }) => {
  const [name, setName] = useState(currentName || '');

  useEffect(() => {
    if (visible) setName(currentName || '');
  }, [visible, currentName]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-[#fffaf2] border border-[#f3dec7] p-6 rounded-xl shadow-xl w-full max-w-sm">
        <h3 className="text-lg font-semibold text-[#d39e61] mb-4 text-center">Rename Wishlist</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new name"
          className="w-full p-3 border border-[#ceb5a7] rounded-lg mb-4 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#f9a03f]"
        />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-sm">Cancel</button>
          <button onClick={() => onSave(name)} className="bg-[#f9a03f] text-white px-4 py-2 rounded hover:bg-[#f89a2a] text-sm font-semibold">Save</button>
        </div>
      </div>
    </div>
  );
};

const DeleteModal = ({ visible, onClose, onConfirm }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-[#fffaf2] border border-[#f3dec7] p-6 rounded-xl shadow-xl w-full max-w-sm text-center">
        <h3 className="text-lg font-semibold text-red-600 mb-4">Confirm Deletion</h3>
        <p className="text-[#9c7e6b] mb-6">Are you sure you want to delete this wishlist? This action cannot be undone.</p>
        <div className="flex justify-center gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-sm font-medium">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium">Delete</button>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [wishlists, setWishlists] = useState([]);
  const [newWishlistName, setNewWishlistName] = useState('');
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [activeList, setActiveList] = useState(null);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem('userEmail');
  const username = localStorage.getItem('username') || 'User';

  const fetchWishlists = useCallback(async () => {
    try {
      const res = await api.get(`/wishlists?user=${userEmail}`);
      setWishlists(res.data);
    } catch (err) {
      console.error('Error fetching wishlists:', err.message);
    }
  }, [userEmail]);

  useEffect(() => {
    if (!userEmail) {
      navigate('/');
    } else {
      fetchWishlists();
    }
  }, [userEmail, navigate, fetchWishlists]);

  const handleCreateWishlist = async () => {
    if (!newWishlistName.trim()) return;
    try {
      const res = await api.post('/wishlists', { name: newWishlistName, owner: userEmail });
      setWishlists((prev) => [...prev, res.data]);
      setNewWishlistName('');
    } catch (err) {
      console.error('Error creating wishlist:', err.message);
    }
  };

  const handleRenameClick = (list) => {
    setActiveList(list);
    setRenameModalVisible(true);
  };

  const handleRenameSave = async (newName) => {
    if (!newName.trim() || newName === activeList.name) return;
    try {
      const res = await api.put(`/wishlists/${activeList._id}`, { name: newName });
      setWishlists((prev) => prev.map((w) => (w._id === activeList._id ? { ...w, name: res.data.name } : w)));
    } catch (err) {
      console.error('Error renaming wishlist:', err.message);
    } finally {
      setRenameModalVisible(false);
      setActiveList(null);
    }
  };

  const handleDeleteClick = (list) => {
    setActiveList(list);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/wishlists/${activeList._id}`);
      setWishlists((prev) => prev.filter((w) => w._id !== activeList._id));
    } catch (err) {
      console.error('Error deleting wishlist:', err.message);
    } finally {
      setDeleteModalVisible(false);
      setActiveList(null);
    }
  };

  const goToWishlist = (id) => {
    navigate(`/wishlist/${id}`);
  };

  return (
    <div className="pt-24 min-h-screen bg-[#fefefe] px-4 pb-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0e204d] mb-6 text-center md:text-left">
          Welcome, <span className="text-[#f9a03f]">{username}</span> 👋
        </h1>

        <div className="mb-10 bg-[#fffaf2] p-6 rounded-xl shadow-sm border border-[#f9e0b6] flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Enter wishlist name"
            value={newWishlistName}
            onChange={(e) => setNewWishlistName(e.target.value)}
            className="w-full p-3 border border-[#ceb5a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f9a03f] transition text-sm"
          />
          <button
            onClick={handleCreateWishlist}
            className="bg-[#f9a03f] hover:bg-[#f89a2a] text-white px-6 py-3 rounded-lg shadow-md font-semibold text-sm transition"
          >
            Create
          </button>
        </div>

        {wishlists.length === 0 ? (
          <div className="text-center text-[#ceb5a7] text-sm italic">
            No wishlists found. Start by creating one above!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlists.map((list) => (
              <div
                key={list._id}
                className="bg-[#fdf8ed] border border-[#f3dec7] p-5 rounded-2xl shadow-md hover:shadow-xl transition-all"
              >
                <div onClick={() => goToWishlist(list._id)} className="cursor-pointer">
                  <h2 className="text-xl font-semibold text-[#f9a03f] mb-1">{list.name}</h2>
                  <p className="text-sm text-[#a18372]">👤 Owner: {username}</p>
                </div>
                <div className="mt-4 flex justify-end gap-4 text-sm">
                  <button
                    onClick={() => handleRenameClick(list)}
                    className="text-[#c28840] opacity-60 hover:opacity-100 hover:underline font-semibold transition"
                  >
                    ✏️ Rename
                  </button>
                  <button
                    onClick={() => handleDeleteClick(list)}
                    className="text-red-500 opacity-60 hover:opacity-100 hover:underline font-semibold transition"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <RenameModal
          visible={renameModalVisible}
          currentName={activeList?.name}
          onClose={() => setRenameModalVisible(false)}
          onSave={handleRenameSave}
        />

        <DeleteModal
          visible={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
};

export default HomePage;