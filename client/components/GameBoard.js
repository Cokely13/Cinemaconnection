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
  const [submittedWords, setSubmittedWords] = useState([]);
  const [gameWords, setGameWords] = useState([]);

  // const allWords = ['GUESS', 'CHARADE', 'KING', 'WIND', 'TEST', 'TRY', 'GOOF', 'TROOP', 'THINGS', 'GUESS', 'CHARADE', 'KING', 'WIND', 'TEST', 'TRY', 'GOOF', 'TROOP', 'THINGS'];

  const allWords = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

  const qbs= [
    {
      "quarterback": "QB1",
      "receivers": ["WR1", "WR2", "WR3", "WR4"]
    },
    {
      "quarterback": "QB2",
      "receivers": ["WR5", "WR6", "WR7", "WR8"]
    },
    {
      "quarterback": "QB3",
      "receivers": ["WR9", "WR10", "WR11", "WR12"]
    },
    {
      "quarterback": "QB4",
      "receivers": ["WR13", "WR14", "WR15", "WR16"]
    },
    {
      "quarterback": "QB5",
      "receivers": ["WR17", "WR18", "WR19", "WR20"]
    }
  ]

  // const shuffleWords = () => {
  //   const shuffled = [...allWords].sort(() => 0.5 - Math.random());
  //   setGameWords(shuffled.slice(0, 16));

  // };

  const shuffleQBsAndWRs = () => {
    // Shuffle QBs
    const shuffledQBs = [...qbs].sort(() => 0.5 - Math.random());

    // Select first 4 QBs
    const selectedQBs = shuffledQBs.slice(0, 4);

    // Extract and shuffle WRs from the selected QBs
    const selectedWRs = selectedQBs.flatMap(qb => qb.receivers).sort(() => 0.5 - Math.random());

    setGameWords(selectedWRs);
  };

  // Shuffle words on component mount
  // useEffect(() => {
  //   shuffleWords();
  // }, []);

  useEffect(() => {
    shuffleQBsAndWRs();
  }, []);

  useEffect(() => {
    // Check if the user has submitted 4 sets of 4 words
    if (submittedWords.length === 16) {
      alert("You Won!");
    }
  }, [submittedWords]);

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

  // const handleSubmit = () => {
  //   if (selectedWords.size === 4) {
  //     // Create a new array where the selected words are at the beginning
  //     const selectedWordsArray = Array.from(selectedWords);
  //     const newGameWords = selectedWordsArray.concat(gameWords.filter(word => !selectedWords.has(word)));

  //     setGameWords(newGameWords); // Update the gameWords state
  //     setSelectedWords(new Set(selectedWordsArray)); // Keep the selected words selected
  //   } else {
  //     // Handle the case where fewer or more than 4 words are selected, e.g., show an error
  //     console.log("Please select exactly 4 words");
  //   }
  // };

  // const handleSubmit = () => {
  //   if (selectedWords.size === 4) {
  //     // Add the selected words to the submittedWords array
  //     setSubmittedWords([...submittedWords, ...selectedWords]);

  //     // Filter out the selected words from the gameWords array
  //     setGameWords(gameWords.filter(word => !selectedWords.has(word)));

  //     // Clear the selected words
  //     setSelectedWords(new Set());
  //   } else {
  //     console.log("Please select exactly 4 words");
  //   }
  // };

  // const handleSubmit = () => {
  //   if (selectedWords.size === 4) {
  //     // Find if all selected WRs are from the same QB
  //     const isSameQB = qbs.some(qb => {
  //       return Array.from(selectedWords).every(wr => qb.receivers.includes(wr));
  //     });

  //     if (isSameQB) {
  //       // Move the selected words to the submittedWords array and clear selections
  //       setSubmittedWords(prev => [...prev, ...selectedWords]);
  //       setSelectedWords(new Set());
  //     } else {
  //       // Wrong selection, increment mistakes and clear selections
  //       setMistakes(prev => prev + 1);
  //       setSelectedWords(new Set());
  //       alert("WRONG");
  //     }

  //     // Optionally, shuffle remaining WRs or take other actions
  //   } else {
  //     console.log("Please select exactly 4 words");
  //   }
  // };

  const handleSubmit = () => {
    if (selectedWords.size === 4) {
      const isSameQB = qbs.some(qb => {
        return Array.from(selectedWords).every(wr => qb.receivers.includes(wr));
      });

      if (isSameQB) {
        const newSubmittedWords = [...submittedWords, ...Array.from(selectedWords)];
        setSubmittedWords(newSubmittedWords);

        // Remove the correctly guessed words from the gameWords array
        const remainingWords = gameWords.filter(word => !selectedWords.has(word));
        setGameWords(remainingWords);

        setSelectedWords(new Set()); // Clear the selections
      } else {
        // Wrong selection, increment mistakes and clear selections
        setMistakes(prev => {
          const newMistakes = prev + 1;
          if (newMistakes >= 3) { // Assuming 5 is the max number of allowed mistakes
            alert("You Lost!");
            window.location.reload();
            return newMistakes; // Return here to prevent further execution and showing "WRONG" alert
          }
          setSelectedWords(new Set());
          alert("WRONG");
          return newMistakes;
        });
      }
    } else {
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
      {/* Render submitted words first */}
      <div className={`submitted-words ${submittedWords.length === 4 ? 'first-row' : ''}`}>
        {submittedWords.map((word, index) => (
          <WordCard key={`submitted-${index}`} word={word} onSelect={() => {}} isSelected={false} />
        ))}
      </div>
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
          Mistakes remaining: {3 - mistakes}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
