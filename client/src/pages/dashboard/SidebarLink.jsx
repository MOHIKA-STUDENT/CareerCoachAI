import React from 'react';

const SidebarLink = ({ icon, label, collapsed, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center cursor-pointer rounded-lg px-4 py-3 transition-all duration-300 whitespace-nowrap
      text-[#94a3b8] hover:text-[#cbd5e1] hover:bg-[#1e293b] hover:font-semibold
      ${collapsed ? 'justify-center' : 'space-x-3'}`}
  >
    <span className="text-2xl w-8 text-center">{icon}</span>
    {!collapsed && <span className="text-base">{label}</span>}
  </div>
);

export default SidebarLink;
