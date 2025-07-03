import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ToolCard = ({ icon, title, description, color, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) navigate(route);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="relative  p-[2px] rounded-lg transition-all duration-300 hover:bg-gradient-to-r  hover:from-[#4f8aff] hover:to-[#a55af7] group"
    >
      <div className="bg-[#0c142f] rounded-lg p-8 space-y-3 cursor-pointer group-hover:shadow-[0_0_20px_rgba(79,138,255,0.5)] transition-all duration-300" >
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-lg" style={{ backgroundColor: color }}>
            <span className="text-white text-2xl">{icon}</span>
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-[#94a3b8] text-base max-w-md">{description}</p>
      </div>
    </motion.div>
  );
};

export default ToolCard;
