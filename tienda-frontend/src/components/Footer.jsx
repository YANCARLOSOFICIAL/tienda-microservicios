import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Cart } from 'react-bootstrap-icons'; // Íconos de redes sociales y carrito
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="custom-footer py-4">
      <div className="container">
        <div className="row">
          {/* Información */}
          <div className="col-md-4">
            <h5>Acerca de Nosotros</h5>
            <p>
              Clicky Shop es tu tienda online de confianza, ofreciendo productos de calidad con entrega rápida y soporte dedicado.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div className="col-md-4">
            <h5>Enlaces Rápidos</h5>
            <ul className="footer-links">
              <li>
                <Link to="/">
                  <span>Inicio</span>
                </Link>
              </li>
              <li>
                <Link to="/products">
                  <span>Productos</span>
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <Cart size={20} /> {/* Ícono del carrito */}
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <span>Iniciar Sesión</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="col-md-4">
            <h5>Síguenos</h5>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-4">
          <p>© 2024 Clicky Shop. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
