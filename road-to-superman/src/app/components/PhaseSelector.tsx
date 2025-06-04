"use client";

import React from 'react';
import { useApp } from '../context/AppContext';

const PhaseSelector = () => {
  const { currentPhase, setCurrentPhase } = useApp();

  const selectPhase = (phase: number) => {
    setCurrentPhase(phase);
  };

  return (
    <div className="phase-tabs fade-in">
      <div className={`phase-tab ${currentPhase === 1 ? 'active' : ''}`} onClick={() => selectPhase(1)}>
        <div className="phase-name">Phase 1</div>
        <div className="phase-desc">Force & Hypertrophie (J1-30)</div>
      </div>
      <div className={`phase-tab ${currentPhase === 2 ? 'active' : ''}`} onClick={() => selectPhase(2)}>
        <div className="phase-name">Phase 2</div>
        <div className="phase-desc">Recomposition (J31-60)</div>
      </div>
      <div className={`phase-tab ${currentPhase === 3 ? 'active' : ''}`} onClick={() => selectPhase(3)}>
        <div className="phase-name">Phase 3</div>
        <div className="phase-desc">Définition (J61-90)</div>
      </div>
    </div>
  );
};

export default PhaseSelector; 