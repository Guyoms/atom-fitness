import React from 'react';

const Header = () => {
  return (
    <header className="header fade-in">
      <div className="logo-text">
        <span className="road-to">ROAD TO</span>
        <span className="superman">SUPERMAN</span>
      </div>
      <p className="subtitle">De <span id="start-weight">106</span>kg à <span id="target-weight">90</span>kg | <span id="start-fat">30</span>% → <span id="target-fat">15</span>% MG</p>
      <div className="progress-bar">
        <div className="progress-fill" id="progress-fill"></div>
      </div>
    </header>
  );
};

export default Header; 