import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('username');
    navigate('/');
  };

  const username = localStorage.getItem('username');

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] bg-[#f9a03f] text-white py-4 px-6 shadow-lg rounded-xl z-50 transition-all duration-300">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        {/* Brand Logo */}
        <h1 className="text-2xl font-bold flex items-center gap-2 tracking-tight">
          <span>Wishlist App</span>
        </h1>

        {/* User Info + Logout */}
        <div className="flex items-center gap-4">
          <p className="text-sm font-medium hidden sm:block text-white">
            Hello, {username || 'Guest'}
          </p>
          <button
            onClick={handleLogout}
            className="bg-white text-[#f9a03f] px-4 py-1.5 rounded-full hover:bg-[#f7d488] transition font-semibold shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
