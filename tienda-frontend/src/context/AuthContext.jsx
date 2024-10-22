import React, { createContext, useState, useContext, useEffect } from 'react';
import * as jwtDecode from 'jwt-decode'; // Importación del módulo completo

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Cargar el token desde localStorage y decodificarlo al iniciar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token); // Usar la función directamente
        console.log('Usuario decodificado:', decodedUser);
        setUser(decodedUser);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }, []);

  const login = (token) => {
    console.log('Login exitoso con token:', token);
    try {
      localStorage.setItem('token', token);
      const decodedUser = jwtDecode(token); // Usar la función directamente
      console.log('Usuario decodificado durante login:', decodedUser);
      setUser(decodedUser);
    } catch (error) {
      console.error('Error al decodificar el token durante login:', error);
    }
  };

  const logout = () => {
    console.log('Cerrando sesión');
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ auth: { isAuthenticated: !!user, user }, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
