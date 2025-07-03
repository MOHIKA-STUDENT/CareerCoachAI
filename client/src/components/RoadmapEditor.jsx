// RoadmapEditor.jsx
import React from 'react';

const RoadmapEditor = ({ roadmapText, setRoadmapText }) => {
  return (
    <div className="mt-6">
      <label className="block mb-2 text-lg font-semibold text-white">Edit Roadmap</label>
      <textarea
        className="w-full p-4 text-sm bg-[#2b2b40] text-white rounded-xl border border-gray-500 focus:outline-none"
        rows={10}
        value={roadmapText}
        onChange={(e) => setRoadmapText(e.target.value)}
        placeholder="You can edit the roadmap steps here..."
      />
    </div>
  );
};

export default RoadmapEditor;
