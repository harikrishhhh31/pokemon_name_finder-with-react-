import React from 'react';
import BorderGlow from './BorderGlow';
import './GameArea.css';

export default function GameArea({ currentPokemon, options, handleGuess, timeLeft, score, bestScore, isFading }) {
  if (!currentPokemon || options.length === 0) {
    return (
      <div className="game-area glass-panel loading">
        <div className="spinner"></div>
        <h2>Loading next Pokemon...</h2>
      </div>
    );
  }

  // Calculate color based on time left (green -> yellow -> red)
  const timerColor = timeLeft > 30 ? 'var(--success-color)' : timeLeft > 10 ? '#ffcc00' : 'var(--danger-color)';

  return (
    <div className="game-container">
      <div className="header glass-panel">
        <div className="score-board">
          <div className="score-item">
            <span className="label">Score</span>
            <span className="value">{score}</span>
          </div>
          <div className="timer" style={{ color: timerColor }}>
            {timeLeft}s
          </div>
          <div className="score-item">
            <span className="label">Best</span>
            <span className="value">{bestScore}</span>
          </div>
        </div>
      </div>

      <div className={`game-area glass-panel ${isFading ? 'fading' : ''}`}>
        <div className="image-container">
          <img
            src={currentPokemon.image}
            alt="Who's that Pokemon?"
            className="pokemon-image"
          />
        </div>

        <h2 className="question">Who's that Pokemon?</h2>

        <div className="options-grid">
          {options.map((option, index) => (
            <BorderGlow
              key={index}
              className="glow-option-wrapper"
              edgeSensitivity={50}
              glowColor="190 100 50"
              backgroundColor="#2a324a"
              borderRadius={12}
              glowRadius={15}
              glowIntensity={1.5}
              animated={true}
              colors={['#00e5ff', '#00ccff', '#00e5ff']}
              fillOpacity={1}
            >
              <button
                className="option-btn border-glow-btn"
                onClick={() => handleGuess(option.name)}
                disabled={isFading}
              >
                {option.name}
              </button>
            </BorderGlow>
          ))}
        </div>
      </div>
    </div>
  );
}
