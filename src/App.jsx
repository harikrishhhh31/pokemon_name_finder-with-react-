import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import GameArea from './components/GameArea';
import GameOverModal from './components/GameOverModal';

const GAME_DURATION = 60; // 60 seconds

function App() {
  const [gameState, setGameState] = useState('landing'); // 'landing', 'playing', 'gameover'
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [options, setOptions] = useState([]);
  const [isFading, setIsFading] = useState(false);

  // Timer logic
  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameState('playing');
    fetchNextRound();
  };

  const endGame = () => {
    setGameState('gameover');
    if (score > bestScore) {
      setBestScore(score);
    }
  };

  const getRandomId = () => Math.floor(Math.random() * 1025) + 1;

  const fetchNextRound = async () => {
    setIsFading(true);
    try {
      const ids = Array.from({length: 4}, getRandomId);
      const promises = ids.map(id => 
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
      );
      const results = await Promise.all(promises);
      
      const optionsData = results.map(p => ({
        name: p.name.replace('-', ' '), // clean up names
        image: p.sprites.other['official-artwork'].front_default || p.sprites.front_default
      }));
      
      // Shuffle options
      const shuffledOptions = [...optionsData].sort(() => Math.random() - 0.5);
      // Target is randomly selected from the fetched 4
      const target = shuffledOptions[Math.floor(Math.random() * shuffledOptions.length)];
      
      setOptions(shuffledOptions);
      setCurrentPokemon(target);
    } catch (error) {
      console.error("Failed to fetch pokemon", error);
    } finally {
      setIsFading(false);
    }
  };

  const handleGuess = (guessedName) => {
    if (guessedName === currentPokemon.name) {
      // Correct!
      setScore(prev => prev + 1);
      fetchNextRound();
    } else {
      // Wrong! Shake effect could be added here
      // For now, just skip to next if wrong, or maybe we don't let them skip?
      // Let's deduct time or just load a new one to keep it fast-paced.
      // Easiest penalty is fetching a new one without points.
      fetchNextRound();
    }
  };

  return (
    <>
      {gameState === 'landing' && <LandingPage onStart={startGame} />}
      
      {gameState === 'playing' && (
        <GameArea 
          currentPokemon={currentPokemon}
          options={options}
          handleGuess={handleGuess}
          timeLeft={timeLeft}
          score={score}
          bestScore={bestScore}
          isFading={isFading}
        />
      )}

      {gameState === 'gameover' && (
        <GameOverModal 
          score={score} 
          bestScore={bestScore} 
          onRestart={startGame} 
        />
      )}
    </>
  );
}

export default App;
