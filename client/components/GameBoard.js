import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchQuarterbacks} from '../store/allQuarterbacksStore'


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
  const dispatch = useDispatch();
  const allQuarterbacks = useSelector((state) => state.allQuarterbacks);

  useEffect(() => {
    dispatch(fetchQuarterbacks());
  }, []);





  const shuffleQBsAndWRs = () => {
    // Use allQuarterbacks from the redux store instead of the hardcoded qbs array
    const shuffledQBs = [...allQuarterbacks].sort(() => 0.5 - Math.random());

    // Select first 4 QBs
    const selectedQBs = shuffledQBs.slice(0, 4);

    // Extract and shuffle WRs from the selected QBs
    const selectedWRs = selectedQBs.flatMap(qb =>
      qb.receivers.sort(() => 0.5 - Math.random()).slice(0, 4)
    ).sort(() => 0.5 - Math.random());

    setGameWords(selectedWRs.map(wr => wr.name));
  };

  // Ensure this useEffect hook is called after your component is mounted and whenever allQuarterbacks changes
  useEffect(() => {
    if (allQuarterbacks.length > 0) {
      shuffleQBsAndWRs();
    }
  }, [allQuarterbacks]);



  // useEffect(() => {
  //   shuffleQBsAndWRs();
  // }, []);

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
  //     // Find the QB for each selected WR
  //     const qbIds = Array.from(selectedWords).map(wrName => {
  //       const qb = allQuarterbacks.find(qb =>
  //         qb.receivers.some(receiver => receiver.name === wrName));
  //       return qb ? qb.id : null;
  //     });

  //     // Check if all selected WRs have the same QB
  //     const isSameQB = new Set(qbIds).size === 1;

  //     if (isSameQB) {
  //       const newSubmittedWords = [...submittedWords, ...Array.from(selectedWords)];
  //       setSubmittedWords(newSubmittedWords);

  //       const remainingWords = gameWords.filter(word => !selectedWords.has(word.name));
  //       setGameWords(remainingWords);

  //       setSelectedWords(new Set());
  //     } else {
  //       setMistakes(prev => {
  //         const newMistakes = prev + 1;
  //         if (newMistakes >= 3) {
  //           alert("You Lost!");
  //           window.location.reload();
  //           return newMistakes;
  //         }
  //         setSelectedWords(new Set());
  //         alert("WRONG");
  //         return newMistakes;
  //       });
  //     }
  //   } else {
  //     console.log("Please select exactly 4 words");
  //   }
  // };

  const handleSubmit = () => {
    if (selectedWords.size === 4) {
      const selectedWordArray = Array.from(selectedWords);
      const isSameQB = allQuarterbacks.some(qb =>
        selectedWordArray.every(wrName =>
          qb.receivers.some(receiver => receiver.name === wrName)));

      if (isSameQB) {
        // Correctly guessed all WRs from the same QB
        const newSubmittedWords = [...submittedWords, ...selectedWordArray];
        setSubmittedWords(newSubmittedWords);

        // Remove correctly guessed WRs from the game board
        const remainingWords = gameWords.filter(wrName => !selectedWords.has(wrName));
        setGameWords(remainingWords);

        setSelectedWords(new Set()); // Clear the selections
      } else {
        // Incorrect guess, handle mistake
        setMistakes(prev => prev + 1);
        if (mistakes + 1 >= 3) {
          alert("You Lost!");
          window.location.reload();
        } else {
          alert("WRONG");
          setSelectedWords(new Set());
        }
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
