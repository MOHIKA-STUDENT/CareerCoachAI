import React, { useEffect, useRef, useState } from 'react';
import { LazyMotion, domAnimation, motion } from 'framer-motion';
import Sidebar from './dashboard/Sidebar';
import ToolsSection from './dashboard/ToolsSection';
import axios from 'axios';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toolsRef = useRef(null);
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return toast.error("You are not logged in.");

    axios.get('http://localhost:5000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setUser(res.data.user))
    .catch((err) => toast.error('Error fetching user'));

   
  }, []);

  const scrollToTools = () => toolsRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-[#0f172a] text-[#cbd5e1] flex overflow-x-hidden font-['Inter']">
        

        <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto overflow-auto">
          <header className="text-center mb-10 px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#7c8af7]">
              AI Career <span className="text-[#a55af7]">Coach Agent</span>
            </h1>
            <p className="mt-4 text-[#64748b] text-base sm:text-lg max-w-xl mx-auto">
              {user ? `Welcome back, ${user.firstName}!` : 'Loading user...'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTools}
              className="mt-6 px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#4f8aff] to-[#a55af7]"
            >
              Let's Get Started
            </motion.button>
          </header>

          <ToolsSection toolsRef={toolsRef} />
         
        </main>
      </div>
    </LazyMotion>
  );
};

export default Dashboard;
