import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import illustration from '../assets/login-illustration.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fade-in animation on mount
    const root = document.getElementById('login-card');
    if (root) {
      root.classList.remove('opacity-0');
      root.classList.add('opacity-100');
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !username.trim()) return;

    localStorage.setItem('userEmail', email.trim());
    localStorage.setItem('username', username.trim());
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-[#fbc89f] flex justify-center items-center px-4">
      <div
        id="login-card"
        className="bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden max-w-5xl w-full opacity-0 transition-opacity duration-700 
             transform transition-transform duration-500 hover:scale-[1.06] hover:-rotate-1 hover:shadow-2xl"
>
        {/* Left Panel */}
        <div className="md:w-1/2 bg-white flex flex-col justify-center items-center p-8">
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-extrabold text-[#f9a03f] mb-2">
              Wishlist App
            </h1>
            <p className="text-[#ceb5a7] text-sm max-w-xs mx-auto leading-relaxed">
              Share gift ideas, plan parties, or organize purchases — all in one place.
            </p>
          </div>
          <img
            src={illustration}
            alt="Login Illustration"
            className="w-4/5 rounded-lg hidden md:block"
          />
        </div>

        {/* Right Panel */}
        <div className="md:w-1/2 bg-[#fefefe] flex justify-center items-center p-8">
          <form onSubmit={handleLogin} className="w-full max-w-sm">
            <h2 className="text-2xl font-semibold text-[#0e204d] text-center mb-6">
              Login to Continue
            </h2>

            <div className="mb-4">
              <label className="block text-[#ceb5a7] text-sm mb-1">Username</label>
              <input
                type="text"
                placeholder="e.g. sanchit"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-[#ceb5a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f9a03f]"
              />
            </div>

            <div className="mb-4 relative">
            <label className="block text-[#ceb5a7] text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="e.g. sanchit@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => {
                // Auto-complete only if @ not included
                if (email && !email.includes('@')) {
                  setEmail(email + '@gmail.com');
                }
              }}
              className="w-full px-4 py-3 border border-[#ceb5a7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f9a03f] pr-28"
            />

            {/* Suggestion hint only when @ is not typed */}
            {!email.includes('@') && email && (
              <span className="absolute right-4 top-[70%] transform -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                @gmail.com
              </span>
            )}
          </div>


            <button
              type="submit"
              className="w-full bg-[#f9a03f] hover:bg-[#f89a2a] text-white text-sm md:text-base font-semibold py-3 rounded-full shadow-md transition-all duration-200"
            >
              Continue →
            </button>

            <p className="text-center text-sm text-[#ceb5a7] mt-6">
              Don't have an account?{' '}
              <span className="underline cursor-pointer">Create one</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
