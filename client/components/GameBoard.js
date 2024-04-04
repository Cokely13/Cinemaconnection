import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchActors} from '../store/allActorsStore'
import { Button, Modal } from 'react-bootstrap';
import WinModal from './WinModal';
import LossModal from './LossModal';
import ErrorModal from './ErrorModal';
import Error2Modal from './Error2Modal';
import OneAwayModal from './OneAwayModal';
import WrongModal from './WrongModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import Confetti from 'react-confetti';



// Individual word card component
const WordCard = ({ word, onSelect, isSelected, image }) => {
  return (
    <div  className={`word-card ${isSelected ? 'selected' : ''}`} onClick={() => onSelect(word)}>
      <div >{word}</div>
    </div>
  );
};

// const WordCard = ({ word, onSelect, isSelected, image }) => {
//   const [imageSrc, setImageSrc] = useState(null);

//   useEffect(() => {
//     setImageSrc(require(`../images${image}`));
//   }, [image]);

//   return (
//     <div className={`word-card ${isSelected ? 'selected' : ''}`} onClick={() => onSelect(word)}>
//       <div>{word}</div>
//       {imageSrc && <img src={imageSrc} alt="actor" />}
//     </div>
//   );
// };

const movieIcons = Array.from({ length: 5 }, (_, index) => (
  <FontAwesomeIcon key={index} icon={faFilm} style={{ marginRight: '5px' }} />
));




// Main game board component
const GameBoard = () => {
  const [selectedWords, setSelectedWords] = useState(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [submittedWords, setSubmittedWords] = useState([]);
  const [gameWords, setGameWords] = useState([]);
  const [picture, setPicture] = useState([]);
  const [row3, setRow3] = useState();
  const [row1, setRow1] = useState();
  const [row2, setRow2] = useState();
  const [row4, setRow4] = useState();
  const dispatch = useDispatch();
  const [showHowToPlayModal, setShowHowToPlayModal] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showLossModal, setShowLossModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showError2Modal, setShowError2Modal] = useState(false);
  const [showOneAwayModal, setShowOneAwayModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const allActors = useSelector((state) => state.allActors);



  useEffect(() => {
    dispatch(fetchActors());
  }, []);

  const handleClose = () => setShowHowToPlayModal(false);
  const handleShow = () => {
    setPicture(allActors[0].imagePath)
    setShowHowToPlayModal(true)
    console.log("pictures", picture)
  }

    const handleTest = () =>{
      console.log("pictures", picture)
    }
  const handleWin = () => {

    setShowWinModal(true);
    setShowConfetti(true);
  };

  const handlleConfetti = () => {
    setShowConfetti(true);
  }

  // Function to handle losing condition
  const handleLoss = () => {
    setShowLossModal(true);
  };

  const handleError = () => {
    setShowErrorModal(true);

  };

  const handleError2 = () => {
    setShowError2Modal(true);
  };

  const handleOneAway= () => {
    setShowOneAwayModal(true);
  };



  const handleWrong= () => {
    setShowWrongModal(true);
  };



  const shuffleActorsAndMovies = () => {
    // Use allActors from the redux store instead of the hardcoded qbs array
    const shuffledActors = [...allActors].sort(() => 0.5 - Math.random());

    // Select first 4 QBs
    const selectedActors = shuffledActors.slice(0, 4);

    // Extract and shuffle WRs from the selected QBs
    const selectedMovies = selectedActors.flatMap(actor =>
      actor.movies.sort(() => 0.5 - Math.random()).slice(0, 4)
    ).sort(() => 0.5 - Math.random());

    setGameWords(selectedMovies.map(movie => movie.name));
  };

  // Ensure this useEffect hook is called after your component is mounted and whenever allActors changes
  useEffect(() => {
    if (allActors.length > 0) {
      shuffleActorsAndMovies();
    }
  }, [allActors]);



  useEffect(() => {
    // Check if the user has submitted 4 sets of 4 words
    if (submittedWords.length === 16) {
        handleWin(); // Show win modal
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
        handleError()
      }
    }
    setSelectedWords(newSelection);
  };

  const handlePlayAgain = () => {
    // Reset the game state here
    setMistakes(0);
    setSubmittedWords([]);
    setGameWords([]);
    setPicture([]);
    setRow1(false);
    setRow2(false);
    setRow3(false);
    setRow4(false);
    setSelectedWords(new Set());
    setShowConfetti(false)
    shuffleActorsAndMovies();
  };

  const handleSubmit = () => {
    if (selectedWords.size === 4) {
      const selectedWordArray = Array.from(selectedWords);

      const actorImages = [];
      const matchingActors = [];

      // Check if there is a quarterback that matches three out of four receivers
      const isSameActor = allActors.some((actor) => {
        const matchingMovies = selectedWordArray.filter((movieName) =>
        actor.movies.some((movie) => movie.name === movieName)
        );

        if (matchingMovies.length === 3) {
          matchingActors.push(actor.name);
        }

        const allMovieMatch = matchingMovies.length === 4;

        if (allMovieMatch) {
          actorImages.push(actor.imagePath); // Capture the QB's image path when a match is found
        }

        return allMovieMatch;
      });

      if (isSameActor) {
        // Correctly guessed all WRs from the same QB
        const newSubmittedWords = [...submittedWords, ...selectedWordArray.map((movieName, idx) => ({ name: movieName, actorImagePath: actorImages[idx] }))];
        setRow1(true)
        setSubmittedWords(newSubmittedWords);
        const images = [...picture]


        images.push(actorImages)
        setPicture(images)
          console.log("pictures", picture)
        if (submittedWords.length === 4){
          setRow2(true)
        }

        if (submittedWords.length === 8){
          setRow3(true)
        }

        if (submittedWords.length === 12){
          setRow4(true)

          handleWin(); // Show win modal
        }

        // Remove correctly guessed WRs from the game board
        const remainingWords = gameWords.filter((movie) => !selectedWords.has(movie));

        setGameWords(remainingWords);

        setSelectedWords(new Set()); // Clear the selections
      } else {
        // Incorrect guess, handle mistake
        setMistakes((prev) => prev + 1);
        if (mistakes + 1 >= 5) {
          handleLoss(); // Show loss modal
        } else {
          // Check if there is only one quarterback matching three out of four receivers
          if (matchingActors.length === 1) {
            handleOneAway()
          } else {
            handleWrong()
          }
          setSelectedWords(new Set());
        }
      }
    } else {
      // Show a popup message if less than 4 words are selected
      handleError2()

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
       <div >
    <div style={{ textAlign: 'center', margin: '20px' }}>
        <Button variant="link" onClick={handleShow} style={{ color: 'black' }}>
          <h3>How To Play</h3>
        </Button>
      </div>

      <div style={{ textAlign: 'center', margin: '20px' }}>
        <Button variant="link" onClick={handleTest} style={{ color: 'black' }}>
          <h3>test</h3>
        </Button>
      </div>

      {allActors ? allActors.name ? <div>{allActors[0].name}</div> : <div>work</div> :<div>TEST</div>}

      <div className="confetti-container">
  {showConfetti && <Confetti />}
</div>
      {/* How To Play Modal */}
      <Modal show={showHowToPlayModal} onHide={handleClose} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>How To Play</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Select 4 Movies from the same actor.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Render submitted words first */}
      {row1 ?
       <div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px 0' }}>
          <h2>1st:</h2>
          <img src={picture[0]} alt="1st" className="picture-container" />
        </div>
      <div className='submitted-words first-row'>
  {/* Map over the first 4 words in submittedWords */}
  {submittedWords.slice(0, 4).map((word, index) => (
    <WordCard
      key={`submitted-${index}`}
      word={word.name}
      onSelect={() => {}}
      isSelected={false}
      image={word.actorImagePath} // Pass the QB's image path
    />
  ))}
</div></div>: <div></div>}
      {row2 ?     <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px 0' }}>
      <h2>2nd:</h2>
      <img src={picture[0][1]} alt="1st" className="picture-container" />

    </div>
      <div className='submitted-words second-row'>
  {submittedWords.slice(4, 8).map((word, index) => (
    <WordCard
      key={`submitted-${index}`}
      word={word.name}
      onSelect={() => {}}
      isSelected={false}
      image={word.actorImagePath} // Pass the QB's image path
    />
  ))}</div></div>: <div></div>}
       {row3 ?   <div> <div style={{ display: 'flex', flexDirection: 'column',  alignItems: 'center', margin: '10px 0' }}>
      <h2>3rd:</h2>
      <img src={picture[0][2]} alt="1st" className="picture-container" />
    </div>  <div className='submitted-words third-row'>
  {submittedWords.slice(8, 12).map((word, index) => (
    <WordCard
      key={`submitted-${index}`}
      word={word.name}
      onSelect={() => {}}
      isSelected={false}
      image={word.actorImagePath} // Pass the QB's image path
    />
  ))}</div></div>: <div></div>}

       {row4 ?  <div>
       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px 0' }}>
       <h2>4th:</h2>
       <img src={picture[0][3]} alt="1st" className="picture-container" />
     </div>
          <div className='submitted-words winner'>
  {submittedWords.slice(12, 16).map((word, index) => (
    <WordCard
      key={`submitted-${index}`}
      word={word.name}
      onSelect={() => {}}
      isSelected={false}
      image={word.actorImagePath} // Pass the QB's image path
    />
  ))}</div></div>: <div></div>}
<div>
    {/* Render submitted words first */}

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

    {submittedWords.length === 16 || mistakes == 5 ?  <div className="control-panel">
          <button style={{marginBottom: '20px'}} className="btn btn-primary" onClick={handlePlayAgain}>Play Again</button>
        </div> : <div className="control-panel">
        <button className="btn btn-warning" onClick={handleShuffle}>Shuffle</button>
        <button className="btn btn-info" onClick={handleDeselectAll}>Deselect all</button>
        <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
        <h1 className="mistakes">
      Mistakes remaining: {movieIcons.slice(0, 5 - mistakes)}
    </h1>
      </div>}
    </div>
    <WinModal show={showWinModal} onHide={() => setShowWinModal(false)} />
      <LossModal show={showLossModal} onHide={() => setShowLossModal(false)} />
      <ErrorModal show={showErrorModal} onHide={() => setShowErrorModal(false)} />
      <Error2Modal show={showError2Modal} onHide={() => setShowError2Modal(false)} />
      <OneAwayModal show={showOneAwayModal} onHide={() => setShowOneAwayModal(false)} />
      <WrongModal show={showWrongModal} onHide={() => setShowWrongModal(false)} />
    </div>
  );
};

export default GameBoard;
