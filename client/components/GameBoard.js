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

    // Check if the word is already selected, if so, remove it from the selection
    if (newSelection.has(word)) {
      newSelection.delete(word);
    } else {
      // Only add the new word if less than 4 are already selected
      if (newSelection.size < 4) {
        newSelection.add(word);
      } else {
        // Optionally, you can handle the error here, such as showing an alert or a message
        console.log("Cannot select more than 4 words");
      }
    }
    setSelectedWords(newSelection);
  };

  const handleSubmit = () => {
    if (selectedWords.size === 4) {
      // Create a new array where the selected words are at the beginning
      const selectedWordsArray = Array.from(selectedWords);
      const newGameWords = selectedWordsArray.concat(gameWords.filter(word => !selectedWords.has(word)));

      setGameWords(newGameWords); // Update the gameWords state
      setSelectedWords(new Set(selectedWordsArray)); // Keep the selected words selected
    } else {
      // Handle the case where fewer or more than 4 words are selected, e.g., show an error
      console.log("Please select exactly 4 words");
    }
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
      <div className={`game-board ${gameWords.length === 12 ? 'adjusted' : ''}`}>
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
