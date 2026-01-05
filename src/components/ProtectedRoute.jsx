import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    alert('Log in 1st!');

    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
