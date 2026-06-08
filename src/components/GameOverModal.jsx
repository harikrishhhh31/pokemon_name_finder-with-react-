import React from 'react';
import './GameOverModal.css';

export default function GameOverModal({ score, bestScore, onRestart }) {
  const isNewBest = score > 0 && score >= bestScore;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <h2 className="game-over-title">Time's Up!</h2>
        
        {isNewBest && <div className="new-best-badge">New Best Score! 🏆</div>}
        
        <div className="final-stats">
          <div className="stat-box">
            <span className="stat-label">Your Score</span>
            <span className="stat-value highlight">{score}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Best Score</span>
            <span className="stat-value">{bestScore}</span>
          </div>
        </div>
        
        <button className="restart-btn" onClick={onRestart}>Play Again</button>
      </div>
    </div>
  );
}
