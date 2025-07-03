// Updated AiQaChat.jsx to support file preview before sending
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaUser, FaPaperPlane, FaRedoAlt, FaPaperclip } from 'react-icons/fa';
import MiniGame from './minigame';
import { jwtDecode } from 'jwt-decode';

const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.id;
  } catch (err) {
    console.error('Invalid token', err);
    return null;
  }
};

const AiQaChat = () => {
  const initialBotMessage = {
    type: 'bot',
    text: `Hello! I'm your AI Career Counselor. You can chat with me or upload your resume for analysis.`,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  const [messages, setMessages] = useState([initialBotMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();

  const handleSend = async (e) => {
    e.preventDefault();
    if ((!input.trim() && !selectedFile) || isLoading) return;

    const userId = getUserIdFromToken();
    if (!userId) {
      alert('Please log in to use the chat.');
      return;
    }

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [
      ...prev,
      { type: 'user', text: input || `[Uploaded: ${selectedFile?.name}]`, time: now },
      { type: 'thinking', time: now },
    ]);

    setInput('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      let botResponse = '';

      if (selectedFile) {
        const formData = new FormData();
        formData.append('resume', selectedFile);
        formData.append('description', input);

        const uploadRes = await fetch('http://localhost:5000/api/resume/analyze-ai', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const result = await uploadRes.json();

        if (!uploadRes.ok) throw new Error(result.error || 'Resume upload failed');

        botResponse = `📄 Resume Summary\n\n📝 ${result.summary}\n\n📊 Score: ${result.score}/100 (${result.label})\n\n🔧 Improvement Tips:\n- ${result.tips.replace(/\n/g, '\n- ')}\n\n🧠 Skills:\n${Object.entries(result.skills)
          .map(([skill, info]) => `• ${skill}: ${info.score}/100 – ${info.comment}`)
          .join('\n')}`;
      } else {
        const response = await fetch('http://localhost:5000/api/ai/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ question: input }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Chat failed');

        botResponse = (data.answer || '🤖 Sorry, I could not find an answer.')
          .replace(/\*\*/g, '')
          .replace(/\*/g, '')
          .replace(/\+/g, '•')
          .replace(/\n/g, '\n');
      }

      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        return [...updated, { type: 'bot', text: botResponse, time: botTime }];
      });

      setSelectedFile(null);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        return [
          ...updated,
          {
            type: 'bot',
            text: `⚠️ Error: ${error.message}.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        ...initialBotMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setInput('');
    setSelectedFile(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [
        ...prev,
        {
          type: 'user-file',
          fileName: file.name,
          fileType: file.type,
          time: now,
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto px-2 sm:px-4 min-h-[calc(100vh-4rem)]">
      <header className="mb-4 border-b border-[#1f2a4a] pb-3 flex justify-between items-center">
        <div>
          <h1 className="text-[#7ea6ff] font-semibold text-3xl">AI Career Q&A Chat</h1>
          <p className="text-[#a0aec0] text-base max-w-xl">
            Chat with AI or upload your resume for tailored career feedback.
          </p>
        </div>
        <button
          onClick={handleNewChat}
          disabled={isLoading}
          className="text-sm flex items-center gap-2 text-[#7ea6ff] border border-[#2a3a6d] px-4 py-2 rounded-lg hover:bg-[#1a2236] transition-all disabled:opacity-50"
        >
          <FaRedoAlt /> New Chat
        </button>
      </header>

      <section className="flex-grow space-y-6 overflow-y-auto pr-1">
        {messages.map((msg, idx) =>
          msg.type === 'bot' ? (
            <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="flex items-start space-x-4 max-w-[95%] sm:max-w-[600px]">
              <div className="flex-shrink-0 mt-1">
                <div className="bg-gradient-to-tr from-[#6b5bff] to-[#a33dff] rounded-full w-10 h-10 flex items-center justify-center">
                  <FaRobot className="text-white text-sm" />
                </div>
              </div>
              <div className="bg-gradient-to-tr from-[#4a8aff] to-[#a33dff] rounded-xl p-4 text-white text-[18px] leading-relaxed whitespace-pre-wrap">
                <p>{msg.text}</p>
                <time className="block text-[#142342] text-xs mt-2">{msg.time}</time>
              </div>
            </motion.div>
          ) : msg.type === 'thinking' ? (
            <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="flex items-start space-x-4 max-w-[95%] sm:max-w-[600px]">
              <div className="flex-shrink-0 mt-1">
                <div className="bg-gradient-to-tr from-[#6b5bff] to-[#a33dff] rounded-full w-10 h-10 flex items-center justify-center">
                  <FaRobot className="text-white text-sm" />
                </div>
              </div>
              <div className="bg-[#4a8aff] rounded-xl p-4 text-white text-[17px] leading-relaxed">
                <MiniGame />
                <time className="block text-[#142342] text-xs mt-2">{msg.time}</time>
              </div>
            </motion.div>
          ) : msg.type === 'user-file' ? (
            <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="flex justify-end max-w-[95%] sm:max-w-[600px] ml-auto space-x-2 items-center">
              <div className="bg-[#1a2236] rounded-xl p-3 text-[#a0aec0] text-[17px] break-words">
                📎 {msg.fileName}
                <time className="block text-[#7ea6ff] text-[10px] mt-1">{msg.time}</time>
              </div>
              <div className="bg-[#2a334d] rounded-full w-10 h-10 flex items-center justify-center">
                <FaUser className="text-[#a0aec0] text-lg" />
              </div>
            </motion.div>
          ) : (
            <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="flex justify-end max-w-[95%] sm:max-w-[600px] ml-auto space-x-2 items-center">
              <div className="bg-[#1a2236] rounded-xl p-3 text-[#a0aec0] text-[17px] break-words">
                {msg.text}
                <time className="block text-[#7ea6ff] text-[10px] mt-1">{msg.time}</time>
              </div>
              <div className="bg-[#2a334d] rounded-full w-10 h-10 flex items-center justify-center">
                <FaUser className="text-[#a0aec0] text-lg" />
              </div>
            </motion.div>
          )
        )}
      </section>

      <footer className="border-t border-[#1f2a4a] pt-4 mt-6 w-full">
        <form onSubmit={handleSend} className="flex items-center gap-2 w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question or describe the job role..."
            disabled={isLoading}
            className="flex-grow bg-[#0c1533] border border-[#2a3a6d] rounded-lg py-3 px-4 text-white placeholder:text-[#7ea6ff] focus:outline-none focus:ring-2 focus:ring-[#6b5bff] text-base disabled:opacity-50"
          />
          <button
            type="button"
            onClick={triggerFileInput}
            disabled={isLoading}
            className="bg-[#2a3a6d] hover:bg-[#3b4b7d] rounded-lg p-3 text-white"
          >
            <FaPaperclip />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.webp"
            className="hidden"
            onChange={handleFileSelect}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-tr from-[#6b5bff] to-[#a33dff] rounded-lg p-4 flex items-center justify-center text-white hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <FaPaperPlane />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default AiQaChat;
