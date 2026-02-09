import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="loader">
          <div className="coffee-cup">
            <div className="cup"></div>
            <div className="handle"></div>
            <div className="steam">
              <div className="steam-1"></div>
              <div className="steam-2"></div>
              <div className="steam-3"></div>
            </div>
          </div>
          <div className="loader-text">
            <h2>Santorini Café</h2>
            <p>Preparing your experience...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;