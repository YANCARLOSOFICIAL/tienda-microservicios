import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Cargar el token al iniciar la aplicación
  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedUser = decodeToken(token);
        if (decodedUser) {
          console.log('Usuario decodificado:', decodedUser);
          setUser(decodedUser);
        }
      }
    };
    loadUser();
  }, []);

  const login = (token) => {
    console.log('Login exitoso con token:', token);
    localStorage.setItem('token', token);
    const decodedUser = decodeToken(token);
    if (decodedUser) {
      setUser(decodedUser);
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

// Función para decodificar el JWT
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};
