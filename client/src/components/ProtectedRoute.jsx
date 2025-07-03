import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
 

  // Side effect: show toast only once if not logged in
  useEffect(() => {
    if (!token) {
      toast('Please log in to access the dashboard', {
        icon: '🔒',
        style: {
          background: '#fbbf24',
          color: '#000',
        },
      });
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
