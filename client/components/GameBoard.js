import React, { useState } from 'react';
// import './Game.css'; // Assume you have a CSS file for styling

// Individual word card component
const WordCard = ({ word, onSelect, isSelected }) => {
  return (
    <div
      className={`word-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(word)}
    >
      {word}
    </div>
  );
};

// Main game board component
const GameBoard = () => {
  const [selectedWords, setSelectedWords] = useState(new Set());
  const [mistakes, setMistakes] = useState(0);

  const words = ['GUESS', 'CHARADE', 'KING', 'WIND', 'TEST', 'TRY', 'GOOF', 'TROOP', 'THINGS'];

  const toggleSelectWord = (word) => {
    const newSelection = new Set(selectedWords);
    if (newSelection.has(word)) {
      newSelection.delete(word);
    } else {
      newSelection.add(word);
    }
    setSelectedWords(newSelection);
  };

  const handleSubmit = () => {
    // Logic to check if selected words form a correct group
    // Update mistakes count if necessary
  };

  const handleShuffle = () => {
    // Logic to shuffle the words array
  };

  const handleDeselectAll = () => {
    setSelectedWords(new Set());
  };

  return (
    <div>
      <div className="game-board">
        {words.map((word) => (
          <WordCard
            key={word}
            word={word}
            isSelected={selectedWords.has(word)}
            onSelect={toggleSelectWord}
          />
        ))}
      </div>
      <div className="control-panel">
        <button onClick={handleShuffle}>Shuffle</button>
        <button onClick={handleDeselectAll}>Deselect all</button>
        <button onClick={handleSubmit}>Submit</button>
        <div className="mistakes">
          Mistakes remaining: {5 - mistakes}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
