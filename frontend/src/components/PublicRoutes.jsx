import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function PublicRoute ({ children }){
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');

  // If tokens exist, redirect to home or dashboard (protected page)
  if (accessToken && refreshToken) {
    return <Navigate to="/users" replace />;
  }

  // Otherwise, allow access to public route (login/register)
  return children;
};


export default PublicRoute;