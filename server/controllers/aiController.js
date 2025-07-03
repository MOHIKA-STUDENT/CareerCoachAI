const axios = require('axios');
const ChatMessage = require('../models/ChatMessage');
const mongoose = require('mongoose');

const chatWithAI = async (req, res) => {
  try {
    const { question, sessionId: incomingSessionId } = req.body;
    const userId = req.user?.id;

    if (!question?.trim()) return res.status(400).json({ error: 'Question must be non-empty' });
    if (!userId) return res.status(401).json({ error: 'User authentication failed' });

    // ✅ Check if Ollama is running
    try {
      await axios.get('http://localhost:11434/api/tags', { timeout: 5000 });
    } catch (e) {
      return res.status(503).json({ error: 'Ollama not running. Please start with `ollama serve`' });
    }

    // ✅ Create or reuse sessionId
    const sessionId = incomingSessionId || new mongoose.Types.ObjectId().toString();

    // ✅ Load past messages for that session
    const previous = await ChatMessage.find({ userId, sessionId }).sort({ createdAt: 1 }).limit(10);

    const chatHistory = [
      {
        role: 'system',
        content: 'You are a helpful AI career counselor. Provide guidance in a clear, short, and helpful way.'
      },
      ...previous.map(m => ({
        role: m.type === 'user' ? 'user' : 'assistant',
        content: m.text
      })),
      { role: 'user', content: question }
    ];

    const payload = {
      model: 'llama3',
      messages: chatHistory,
      stream: false,
      options: { temperature: 0.3, top_p: 0.8, max_tokens: 300 }
    };

    const response = await axios.post('http://localhost:11434/api/chat', payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 60000
    });

    const aiReply = response.data?.message?.content;
    if (!aiReply) return res.status(500).json({ error: 'Empty response from AI' });

    // ✅ Save both messages with sessionId
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    await ChatMessage.insertMany([
      { userId, type: 'user', text: question, time, sessionId },
      { userId, type: 'bot', text: aiReply, time, sessionId }
    ]);

    // ✅ Return sessionId so frontend can continue the thread
    res.status(200).json({ answer: aiReply, sessionId });
  } catch (err) {
    console.error('chatWithAI error:', err);
    res.status(500).json({ error: 'Unexpected server error: ' + err.message });
  }
};

module.exports = { chatWithAI };
