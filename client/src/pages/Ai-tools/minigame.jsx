import React, { useState, useEffect } from 'react';

const emojiList = ['🐶', '🐱', '🦊', '🐻', '🐼', '🦁', '🐮', '🐵'];

const shuffledEmojis = () => {
  const pairs = [...emojiList, ...emojiList];
  return pairs.sort(() => Math.random() - 0.5).map((emoji, i) => ({
    id: i,
    emoji,
    flipped: false,
    matched: false
  }));
};

const MiniGame = () => {
  const [cards, setCards] = useState(shuffledEmojis());
  const [flippedIndices, setFlippedIndices] = useState([]);

  // Match checking
  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [i1, i2] = flippedIndices;
      if (cards[i1].emoji === cards[i2].emoji) {
        const updated = cards.map((card, i) =>
          i === i1 || i === i2 ? { ...card, matched: true } : card
        );
        setCards(updated);
        setFlippedIndices([]);
      } else {
        setTimeout(() => {
          const updated = cards.map((card, i) =>
            i === i1 || i === i2 ? { ...card, flipped: false } : card
          );
          setCards(updated);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  }, [flippedIndices, cards]);

  // Handle card flip
  const handleFlip = (index) => {
    if (flippedIndices.length < 2 && !cards[index].flipped && !cards[index].matched) {
      const updated = cards.map((card, i) =>
        i === index ? { ...card, flipped: true } : card
      );
      setCards(updated);
      setFlippedIndices((prev) => [...prev, index]);
    }
  };

  const isAllMatched = cards.every(card => card.matched);

  // Auto-restart game after win
  useEffect(() => {
    if (isAllMatched) {
      const timeout = setTimeout(() => {
        setCards(shuffledEmojis());
        setFlippedIndices([]);
      }, 3000); // 3 seconds before restart
      return () => clearTimeout(timeout);
    }
  }, [isAllMatched]);

  return (
    <div className="text-white mt-3 text-center">
      <p className="text-sm mb-1">🤖 Until I’m thinking..., you can play this game 👇</p>
      <p className="text-sm mb-2">🎴 Flip and Match the Emojis!</p>
      <div className="grid grid-cols-4 gap-2 w-[260px] mx-auto">
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => handleFlip(index)}
            className={`w-14 h-14 flex items-center justify-center text-2xl rounded-md border transition-all duration-300 cursor-pointer ${
              card.flipped || card.matched ? 'bg-[#2a3a6d]' : 'bg-[#0c1533]'
            }`}
          >
            {card.flipped || card.matched ? card.emoji : '🎴'}
          </div>
        ))}
      </div>
      {isAllMatched && <p className="mt-4 text-green-400">🎉 You matched all pairs! Restarting...</p>}
    </div>
  );
};

export default MiniGame;
