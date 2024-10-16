import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { auth } = useContext(AuthContext);

  return auth.isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
