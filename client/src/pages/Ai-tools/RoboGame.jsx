import React, { useEffect, useState } from 'react';

const tasks = [
  { emoji: '📝', label: 'Resume', type: 'task' },
  { emoji: '📧', label: 'Email', type: 'task' },
  { emoji: '🎤', label: 'Interview', type: 'task' },
  { emoji: '📱', label: 'Phone', type: 'distraction' },
  { emoji: '🍕', label: 'Snack', type: 'distraction' },
  { emoji: '🐱', label: 'YouTube', type: 'distraction' },
];

const TimeManagerGame = () => {
  const [activeSlot, setActiveSlot] = useState(null);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Start Game
  const startGame = () => {
    setScore(0);
    setMissed(0);
    setGameOver(false);
    setGameStarted(true);
  };

  // Slot update loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const interval = setInterval(() => {
      const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
      const randomSlot = {
        ...randomTask,
        id: Date.now(),
      };
      setActiveSlot(randomSlot);

      // Auto-miss if player doesn’t click task in time
      const missTimeout = setTimeout(() => {
        if (randomSlot.type === 'task') {
          setMissed((m) => {
            if (m + 1 >= 5) setGameOver(true);
            return m + 1;
          });
        }
        setActiveSlot(null);
      }, 1200);

      return () => clearTimeout(missTimeout);
    }, 1500);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  const handleClick = () => {
    if (!activeSlot || gameOver) return;

    if (activeSlot.type === 'task') {
      setScore((s) => s + 1);
    } else {
      // Clicked distraction
      setGameOver(true);
    }

    setActiveSlot(null);
  };

  return (
    <div className="text-center mt-6">
      <h2 className="text-xl font-bold text-purple-300 mb-2">🧠 Time Management Simulator</h2>

      {!gameStarted && (
        <button
          onClick={startGame}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Start Game
        </button>
      )}

      {gameOver && (
        <div className="text-red-400 font-semibold mt-2">
          Game Over! Final Score: {score}
          <br />
          <button
            onClick={startGame}
            className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Restart Game
          </button>
        </div>
      )}

      {gameStarted && !gameOver && (
        <>
          <div className="text-white mb-1">✅ Score: {score} | ❌ Missed: {missed}/5</div>

          <div className="w-[300px] h-[200px] mx-auto bg-[#0f172a] border border-gray-600 rounded-xl flex items-center justify-center mt-4">
            {activeSlot ? (
              <button
                className={`text-4xl p-4 rounded transition-all duration-200 ${
                  activeSlot.type === 'task' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-600'
                }`}
                onClick={handleClick}
              >
                {activeSlot.emoji}
              </button>
            ) : (
              <p className="text-gray-500">Waiting for task...</p>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-2">Click only ✅ tasks (📝, 📧, 🎤). Avoid ❌ distractions (📱, 🐱, 🍕)!</p>
        </>
      )}
    </div>
  );
};

export default TimeManagerGame;
