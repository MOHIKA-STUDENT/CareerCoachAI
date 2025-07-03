import React, { useEffect, useState } from 'react';
import Sidebar from '../pages/dashboard/Sidebar'; // path to your Sidebar.jsx
import axios from 'axios';

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    axios.get('http://localhost:5000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setUser(res.data.user))
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-[#cbd5e1] font-['Inter']">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} user={user} />
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
