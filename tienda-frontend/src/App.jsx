import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/CartPage';

import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfilePage';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './context/AuthContext';
import Footer from './components/Footer'; // Footer component añadido

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App d-flex flex-column min-vh-100">
          {/* Navbar */}
          <Navbar />

          {/* Contenido principal */}
          <main className="flex-grow-1">
            <div className="container py-4">
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rutas protegidas */}
                <Route element={<PrivateRoute />}>
                  
                  <Route path="/user/profile" element={<UserProfile />} />
                </Route>
              </Routes>
            </div>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
