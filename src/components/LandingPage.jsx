import React from 'react';
import Galaxy from './Galaxy';
import './LandingPage.css';

export default function LandingPage({ onStart }) {
  return (
    <div className="landing-page-container">
      <div className="galaxy-bg">
        <Galaxy 
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.5}
          saturation={0}
        />
      </div>
      <div className="landing-page glass-panel">
        <div className="logo-container">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
            alt="Pokemon Logo"
            className="logo"
          />
        </div>
        <h1 className="title">POKEFINDER</h1>
        <p className="subtitle">Test your knowledge about pokemon .</p>
        <button onClick={onStart} className="start-btn">Play Now</button>
      </div>
    </div>
  );
}
