const axios = require('axios');

const OLLAMA_API_URL = 'http://localhost:11434/api/generate';

const queryOllama = async (prompt) => {
  try {
    const response = await axios.post(OLLAMA_API_URL, {
      model: 'llama3',
      prompt,
      stream: false,
      options: {
        temperature: 0.2, // or 0 for deterministic response
      },
    }, {
      timeout: 0, // ⬅️ NO TIMEOUT — waits as long as needed
    });

    return response.data.response.trim();
  } catch (err) {
    console.error('❌ Ollama API error:', err.message);
    throw new Error(`Ollama API error: ${err.message}`);
  }
};

module.exports = { queryOllama };
