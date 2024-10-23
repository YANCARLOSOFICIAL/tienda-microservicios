import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Cart } from 'react-bootstrap-icons'; // Importamos el ícono del carrito
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css'; // Estilos personalizados

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Clicky Shop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <Cart size={24} /> {/* Ícono del carrito */}
              </Link>
            </li>
            {auth.isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/profile">Perfil</Link>
                </li>
                <li className="nav-item">
                  <button onClick={logout} className="btn btn-outline-secondary ms-2">
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Registrarse</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
