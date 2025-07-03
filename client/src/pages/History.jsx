import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ to navigate to specific chat

const History = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [featureHistory, setFeatureHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`
        };

        const [chatRes, featureRes] = await Promise.allSettled([
          axios.get('/api/chat/history', { headers }),
          axios.get('/api/feature-history/my-history', { headers })
        ]);

        if (chatRes.status === 'fulfilled') {
          setChatHistory([...chatRes.value.data].reverse());
        } else {
          console.error('Error fetching chat history:', chatRes.reason);
        }

        if (featureRes.status === 'fulfilled') {
          setFeatureHistory(featureRes.value.data.history || []);
        } else {
          console.error('Error fetching feature history:', featureRes.reason);
        }
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('Failed to load history data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllHistory();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown time';
    const parsed = new Date(dateString);
    return isNaN(parsed.getTime()) ? 'Unknown time' : parsed.toLocaleString();
  };

  const groupBySession = (messages, gapMinutes = 30) => {
    if (!messages.length) return [];

    const sessions = [];
    let currentSession = [messages[0]];
    let lastTime = new Date( messages[0].createdAt);

    for (let i = 1; i < messages.length; i++) {
      const msg = messages[i];
      const currentTime = new Date( msg.createdAt);
      const diff = (currentTime - lastTime) / (1000 * 60);

      if (diff > gapMinutes) {
        sessions.push(currentSession);
        currentSession = [msg];
      } else {
        currentSession.push(msg);
      }

      lastTime = currentTime;
    }

    if (currentSession.length) sessions.push(currentSession);
    return sessions;
  };

  const groupedSessions = groupBySession(chatHistory || []);

  const clearChatHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('/api/chat/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChatHistory([]);
    } catch (err) {
      console.error('Error clearing chat history:', err);
      setError('Failed to clear chat history');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c142f] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c142f] text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
            My History
          </h1>
          <p className="mt-3 text-gray-300">Review your past conversations and AI tool usage</p>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex justify-center">
          <div className="bg-[#1e1e2f] rounded-lg p-1 flex">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'chat'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Chat History ({chatHistory.length})
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === 'features'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Feature History ({featureHistory.length})
            </button>
          </div>
        </div>

        {activeTab === 'chat' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-purple-400">Chat Messages</h2>
              {chatHistory.length > 0 && (
                <button
                  onClick={clearChatHistory}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Clear Chat History
                </button>
              )}
            </div>

            {groupedSessions.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💬</div>
                <p className="text-gray-400 text-lg">No chat history found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {groupedSessions.map((session, index) => (
                  <div
                    key={index}
                    className="bg-[#1e1e2f] border border-purple-600/20 p-4 rounded-xl"
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => setExpandedIndex(index === expandedIndex ? null : index)}
                    >
                      <div>
                        <h3 className="text-sm font-semibold text-purple-400">
                          Conversation {groupedSessions.length - index}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {formatDate(session[0].time || session[0].createdAt)}
                        </p>
                        <p className="text-gray-300 text-sm mt-1 line-clamp-1">
                          {session.find((m) => m.type === 'user')?.text?.slice(0, 100) || ''}
                        </p>
                      </div>
                      <button
                        className="bg-purple-700 hover:bg-purple-800 text-white text-xs px-3 py-1 rounded-full"
                        onClick={() => navigate('/chat-history', { state: { session } })} // ✅ redirect
                      >
                        Open
                      </button>
                    </div>

                    {expandedIndex === index && (
                      <div className="mt-3 space-y-3">
                        {session.map((msg, i) => (
                          <div
                            key={i}
                            className={`p-3 rounded-md ${
                              msg.type === 'user'
                                ? 'bg-[#1e1e2f] border-l-4 border-blue-500'
                                : 'bg-[#2a1f3d] border-l-4 border-purple-500'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span
                                className={`font-semibold text-xs ${
                                  msg.type === 'user' ? 'text-blue-400' : 'text-purple-400'
                                }`}
                              >
                                {msg.type === 'user' ? '👤 You' : '🤖 AI Assistant'}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDate(msg.time || msg.createdAt)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-300">{msg.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
  <h2 className="text-2xl font-semibold text-purple-400">AI Tool Usage</h2>
  {featureHistory.length > 0 && (
    <button
      onClick={async () => {
        try {
          const token = localStorage.getItem('token');
          await axios.delete('/api/feature-history/my-history', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setFeatureHistory([]);
        } catch (err) {
          console.error('Error clearing feature history:', err);
          setError('Failed to clear feature history');
        }
      }}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
    >
      Clear Feature History
    </button>
  )}
</div>

            {featureHistory.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛠️</div>
                <p className="text-gray-400 text-lg">No feature history found.</p>
              </div>
            ) : (
              <div className="grid gap-4">
              {featureHistory.map((item, i) => {
                const isExpanded = expandedIndex === i;
                return (
                  <div
                    key={i}
                    className="bg-[#1e1e2f] p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors"
                  >
                    <div
                      className="flex justify-between items-start mb-3 cursor-pointer"
                      onClick={() => setExpandedIndex(isExpanded ? null : i)}
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-purple-400">{item.featureName}</h3>
                        <p className="text-sm text-gray-400">{formatDate(item.createdAt)}</p>
                      </div>
                      <button className="bg-purple-700 hover:bg-purple-800 text-white text-xs px-3 py-1 rounded-full">
                        {isExpanded ? 'Hide' : 'Show'}
                      </button>
                    </div>
            
                    {isExpanded && (
                      <div className="bg-[#0c142f] p-4 rounded-lg mt-3">
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Result:</h4>
                        <div className="text-gray-200 text-sm overflow-x-auto">
                          {typeof item.result === 'string' ? (
                            <p className="whitespace-pre-wrap">{item.result}</p>
                          ) : (
                            <pre className="whitespace-pre-wrap">{JSON.stringify(item.result, null, 2)}</pre>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
