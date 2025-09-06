import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Check if a token exists in local storage
  const token = localStorage.getItem('token');
  
  // If the token exists, render the child route (e.g., the Dashboard)
  // If not, redirect the user to the login page
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;