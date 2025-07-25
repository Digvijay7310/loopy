// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProtectedRoute({ children }) {
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');

  if (!accessToken || !refreshToken) {
    return <Navigate to="/users/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
