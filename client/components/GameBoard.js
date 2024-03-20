import React, { useState, useEffect } from 'react';
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
  const [gameWords, setGameWords] = useState([]);

  // const allWords = ['GUESS', 'CHARADE', 'KING', 'WIND', 'TEST', 'TRY', 'GOOF', 'TROOP', 'THINGS', 'GUESS', 'CHARADE', 'KING', 'WIND', 'TEST', 'TRY', 'GOOF', 'TROOP', 'THINGS'];

  const allWords = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

  const shuffleWords = () => {
    const shuffled = [...allWords].sort(() => 0.5 - Math.random());
    setGameWords(shuffled.slice(0, 16));

  };

  // Shuffle words on component mount
  useEffect(() => {
    shuffleWords();
  }, []);

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
    setGameWords(gameWords.sort(() => 0.5 - Math.random()));
    setSelectedWords(new Set()); // This will clear the selection
  };

  const handleDeselectAll = () => {
    setSelectedWords(new Set());
  };

  return (
    <div>
      <div className="game-board">
      {gameWords.map((word, index) => (
          <WordCard
            key={index}
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
