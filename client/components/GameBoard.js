import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchQuarterbacks} from '../store/allQuarterbacksStore'


// Individual word card component
const WordCard = ({ word, onSelect, isSelected, image }) => {
  return (
    <div  className={`word-card ${isSelected ? 'selected' : ''}`} onClick={() => onSelect(word)}>
       {image && <img src={image} alt={word} style={{ width: '80px', height: '80px' }} />} {/* Render the image if available */}
      <div >{word}</div>
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



  const handleSubmit = () => {
    if (selectedWords.size === 4) {
      const selectedWordArray = Array.from(selectedWords);

      const qbImages = [];
      const matchingQBs = [];

      // Check if there is a quarterback that matches three out of four receivers
      const isSameQB = allQuarterbacks.some((qb) => {
        const matchingWRs = selectedWordArray.filter((wrName) =>
          qb.receivers.some((receiver) => receiver.name === wrName)
        );

        if (matchingWRs.length === 3) {
          matchingQBs.push(qb.name);
        }

        const allWrMatch = matchingWRs.length === 4;

        if (allWrMatch) {
          qbImages.push(qb.imagePath); // Capture the QB's image path when a match is found
        }

        return allWrMatch;
      });

      if (isSameQB) {
        // Correctly guessed all WRs from the same QB
        const newSubmittedWords = [...submittedWords, ...selectedWordArray.map((wrName, idx) => ({ name: wrName, qbImagePath: qbImages[idx] }))];
        setSubmittedWords(newSubmittedWords);
        console.log("gamewords", gameWords)
        console.log("selectedwords", selectedWords)
        // Remove correctly guessed WRs from the game board
        const remainingWords = gameWords.filter((wr) => !selectedWords.has(wr));

        console.log("remaining", remainingWords)
        setGameWords(remainingWords);

        setSelectedWords(new Set()); // Clear the selections
      } else {
        // Incorrect guess, handle mistake
        setMistakes((prev) => prev + 1);
        if (mistakes + 1 >= 3) {
          alert('You Lost!');
          window.location.reload();
        } else {
          // Check if there is only one quarterback matching three out of four receivers
          if (matchingQBs.length === 1) {
            alert('Wrong! (But One Away!)');
          } else {
            alert('WRONG');
          }
          setSelectedWords(new Set());
        }
      }
    } else {
      console.log('Please select exactly 4 words');
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
      {/* <div className={`submitted-words ${submittedWords.length === 4 ? 'first-row' : submittedWords.length === 8 ? 'second-row' : submittedWords.length === 12 ? 'third-row' : submittedWords.length === 16 ? 'winner' : ''}`}>
        {submittedWords.map((word, index) => (
          <WordCard
            key={`submitted-${index}`}
            word={word.name}
            onSelect={() => {}}
            isSelected={false}
            image={word.qbImagePath} // Pass the QB's image path
          />
        ))}
      </div> */}
{/* Render submitted words first */}
<div className={`submitted-words ${submittedWords.length === 4 ? 'first-row' : submittedWords.length === 8 ? 'second-row' : submittedWords.length === 12 ? 'third-row' : submittedWords.length === 16 ? 'winner' : ''}`}>
  {/* Iterate over each submitted word */}
  {submittedWords.map((word, index) => (
    <React.Fragment key={`submitted-${index}`}>
      {/* Render the quarterback image */}
      {(index % 8 === 0 || index % 8 === 6) && (
        <div className="qb-image-container">
          <img src={word.qbImagePath} alt="Quarterback" className="qb-image" />
        </div>
      )}

      {/* Render the word card */}
      <WordCard
        word={word.name}
        onSelect={() => {}}
        isSelected={false}
        image={word.qbImagePath} // Pass the QB's image path
      />
    </React.Fragment>
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
