import React from 'react';
import { FaRobot, FaWrench, FaRoad } from 'react-icons/fa';

const RoadmapLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex space-x-6 animate-pulse">
        <div className="flex flex-col items-center">
          <FaRobot className="text-blue-400 text-4xl animate-bounce" />
          <p className="text-sm text-gray-400 mt-1">Robot 1: Analyzing skills</p>
        </div>
        <div className="flex flex-col items-center">
          <FaWrench className="text-yellow-400 text-4xl animate-spin-slow" />
          <p className="text-sm text-gray-400 mt-1">Robot 2: Constructing roadmap</p>
        </div>
        <div className="flex flex-col items-center">
          <FaRoad className="text-green-400 text-4xl animate-bounce-slow" />
          <p className="text-sm text-gray-400 mt-1">Robot 3: Laying foundation</p>
        </div>
      </div>
      <p className="text-blue-300 text-lg font-semibold">Ai model is building your roadmap...</p>
    </div>
  );
};

export default RoadmapLoading;