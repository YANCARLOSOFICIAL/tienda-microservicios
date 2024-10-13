import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-white">Home</Link></li>
        <li><Link to="/products" className="text-white">Products</Link></li>
        <li><Link to="/cart" className="text-white">Cart</Link></li>
        {auth.isAuthenticated ? (
          <>
            <li><Link to="/orders" className="text-white">Orders</Link></li>
            <li><Link to="/user/profile" className="text-white">Profile</Link></li>
            <li><button onClick={logout} className="text-white">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="text-white">Login</Link></li>
            <li><Link to="/register" className="text-white">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
