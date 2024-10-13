import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../config/axiosConfig';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    if (auth.token) {
      axiosInstance.get('/users/profile', {
        headers: { Authorization: `Bearer ${auth.token}` }
      })
        .then(response => {
          setAuth({
            ...auth,
            isAuthenticated: true,
            user: response.data,
          });
        })
        .catch(() => {
          setAuth({
            ...auth,
            isAuthenticated: false,
            user: null,
          });
        });
    }
  }, [auth.token]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({ ...auth, token, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
