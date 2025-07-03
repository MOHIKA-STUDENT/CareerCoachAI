import React, { useState, useEffect, useRef } from 'react';

const words = ['career', 'future', 'AI', 'roadmap', 'goal', 'skills', 'coach', 'tech'];

const MiniTypingGame = () => {
  const [word, setWord] = useState('');
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [status, setStatus] = useState('');
  const timerRef = useRef(null);

  // Set new word
  const setNewWord = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    setWord(newWord);
    setInput('');
    setTimeLeft(5);
    setStatus('');
  };

  useEffect(() => {
    setNewWord();
  }, [score]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft === 0) {
      setStatus('⏰ Time\'s up!');
      setInput('');
      setTimeout(() => setNewWord(), 1000);
      return;
    }

    timerRef.current = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timerRef.current);
  }, [timeLeft]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim().toLowerCase() === word.toLowerCase()) {
      setScore(score + 1);
    }
  };

  return (
    <div className="mt-6 text-center">
      <h2 className="text-lg font-bold text-yellow-300 mb-2">🚀 Quick Typing Game!</h2>
      <p className="text-gray-400 mb-2">Type the word: <span className="text-white font-semibold">{word}</span></p>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="p-2 rounded bg-[#2b2b40] text-white border border-blue-500"
        placeholder="Start typing..."
        disabled={timeLeft === 0}
      />
      <p className="mt-2 text-green-400">Score: {score}</p>
      <p className={`mt-1 ${timeLeft <= 2 ? 'text-red-400' : 'text-blue-400'}`}>Time left: {timeLeft}s</p>
      {status && <p className="text-yellow-400 font-semibold mt-2">{status}</p>}
    </div>
  );
};

export default MiniTypingGame;
