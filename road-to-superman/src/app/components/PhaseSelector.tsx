"use client";

import React from 'react';

const PhaseSelector = () => {
  return (
    <div className="phase-tabs fade-in">
      <div className="phase-tab active">
        <div className="phase-name">Phase 1</div>
        <div className="phase-desc">Force & Hypertrophie (J1-30)</div>
      </div>
      <div className="phase-tab">
        <div className="phase-name">Phase 2</div>
        <div className="phase-desc">Recomposition (J31-60)</div>
      </div>
      <div className="phase-tab">
        <div className="phase-name">Phase 3</div>
        <div className="phase-desc">Définition (J61-90)</div>
      </div>
    </div>
  );
};

export default PhaseSelector; 