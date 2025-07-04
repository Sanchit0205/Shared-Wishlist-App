import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import WishlistPage from './pages/WishlistPage';
import ProductPage from './pages/ProductPage';
import Header from './components/Header';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('userEmail');
  return isLoggedIn ? children : <Navigate to="/" />;
};

const AppLayout = () => {
  const location = useLocation();
  const hideHeader = location.pathname === '/';

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<WishlistPage />} />       
        <Route path="/wishlist/:id" element={<ProductPage />} /> 
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
