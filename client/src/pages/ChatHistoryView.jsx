import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ChatHistoryView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const session = location.state?.session || [];

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown time';
    const parsed = new Date(dateString);
    return isNaN(parsed.getTime()) ? 'Unknown time' : parsed.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-[#0c142f] text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-400">Conversation View</h1>
          <button
            className="bg-purple-700 hover:bg-purple-800 text-white text-xs px-3 py-1 rounded-full"
            onClick={() => navigate(-1)}
          >
            ← Back to History
          </button>
        </div>

        {session.length === 0 ? (
          <p className="text-gray-400">No conversation found.</p>
        ) : (
          session.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg mb-3 ${
                msg.type === 'user'
                  ? 'bg-[#1e1e2f] border-l-4 border-blue-500'
                  : 'bg-[#2a1f3d] border-l-4 border-purple-500'
              }`}
            >
              <div className="flex justify-between mb-1">
                <span
                  className={`text-xs font-semibold ${
                    msg.type === 'user' ? 'text-blue-400' : 'text-purple-400'
                  }`}
                >
                  {msg.type === 'user' ? '👤 You' : '🤖 AI Assistant'}
                </span>
                <span className="text-xs text-gray-500">{formatDate(msg.time || msg.createdAt)}</span>
              </div>
              <p className="text-sm text-gray-200">{msg.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatHistoryView;
