import React, { useState } from 'react';
import {
  FaBars, FaBriefcase, FaWaveSquare, FaClock, FaCreditCard, FaUser, FaUserCircle, FaSignOutAlt
} from 'react-icons/fa';
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ collapsed, setCollapsed, user }) => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const toggleLogout = () => {
    setShowLogout((prev) => !prev);
  };

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/');
  };

  return (
    <aside
      className="hidden md:flex bg-[#0c142f] flex-col pl-8 pr-2 py-4 space-y-6 relative transition-all duration-300 overflow-hidden"
      style={{ width: collapsed ? 64 : 256 }}
    >
      <div className={`flex ${collapsed ? 'justify-end' : 'justify-between'} items-center mb-6 w-full`}>
        {!collapsed && (
          <h1 className="text-[#cbd5e1] font-extrabold text-xl whitespace-nowrap">AI Career Coach</h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
          className="text-[#94a3b8] hover:text-[#cbd5e1] focus:outline-none"
        >
          <FaBars className="text-2xl" />
        </button>
      </div>

      <nav className={`flex flex-col font-medium flex-1 transition-all duration-300 ${collapsed ? 'items-center space-y-6 mt-10' : 'space-y-4'}`}>
        <SidebarLink icon={<FaBriefcase />} label="Workspace" collapsed={collapsed} onClick={() => navigate('/dashboard')} />
        <SidebarLink icon={<FaWaveSquare />} label="AI Tools" collapsed={collapsed} onClick={() => navigate('/dashboard')} />
        <SidebarLink icon={<FaClock />} label="My History" collapsed={collapsed} onClick={() => navigate('/history')} />
        <SidebarLink icon={<FaCreditCard />} label="Billing" collapsed={collapsed} onClick={() => navigate('/billing')} />
        <SidebarLink icon={<FaUser />} label="Profile" collapsed={collapsed} onClick={() => {}} />
      </nav>

      {/* 👤 User Profile + Dropdown Logout Option */}
      <div className="relative mt-auto">
        <div
          onClick={toggleLogout}
          className="flex items-center space-x-3 text-lg font-medium pt-4 border-t border-[#1e293b] cursor-pointer"
        >
          <FaUserCircle className="text-4xl text-white" />
          {!collapsed && user && (
            <div>
              <p className="text-[#cbd5e1] font-semibold truncate">{user.firstName}</p>
              <p className="text-[#64748b] text-sm truncate">{user.email}</p>
            </div>
          )}
        </div>

        {/* 🔽 Logout dropdown (only visible when clicked) */}
        {!collapsed && showLogout && (
  <div
    className="absolute bottom-16 left-3 animate-fade-in bg-[#1e293b] text-white px-4 py-2 rounded-lg shadow-xl text-sm flex items-center gap-2 cursor-pointer hover:bg-[#334155] transition-all duration-200 z-50"
    onClick={handleLogout}
  >
    <FaSignOutAlt className="text-base" />
    <span className="whitespace-nowrap">Logout</span>
  </div>
)}

      </div>
    </aside>
  );
};

export default Sidebar;
