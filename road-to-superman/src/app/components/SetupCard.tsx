"use client";

import React, { useState } from 'react';
import { ScaleIcon, UserIcon } from '@heroicons/react/24/outline';

const SetupCard = () => {
  const [startWeight, setStartWeight] = useState(106);
  const [startFat, setStartFat] = useState(30);
  const [targetWeight, setTargetWeight] = useState(90);
  const [targetFat, setTargetFat] = useState(15);

  return (
    <div className="setup-card fade-in">
      <h2>Personnalisez votre programme</h2>
      <p>Définissez vos paramètres de départ pour adapter le programme à votre physique</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
        <div>
          <label htmlFor="custom-start-weight">Poids initial (kg)</label>
          <div className="input-with-icon">
            <ScaleIcon className="input-icon" />
            <input type="number" id="custom-start-weight" min="50" max="200" value={startWeight} step="0.1" onChange={(e) => setStartWeight(parseFloat(e.target.value))} />
          </div>
        </div>
        <div>
          <label htmlFor="custom-start-fat">Masse grasse initiale (%)</label>
          <div className="input-with-icon">
            <UserIcon className="input-icon" />
            <input type="number" id="custom-start-fat" min="5" max="50" value={startFat} step="0.1" onChange={(e) => setStartFat(parseFloat(e.target.value))} />
          </div>
        </div>
        <div>
          <label htmlFor="custom-target-weight">Poids cible (kg)</label>
          <div className="input-with-icon">
            <ScaleIcon className="input-icon" />
            <input type="number" id="custom-target-weight" min="50" max="200" value={targetWeight} step="0.1" onChange={(e) => setTargetWeight(parseFloat(e.target.value))} />
          </div>
        </div>
        <div>
          <label htmlFor="custom-target-fat">Masse grasse cible (%)</label>
          <div className="input-with-icon">
            <UserIcon className="input-icon" />
            <input type="number" id="custom-target-fat" min="5" max="20" value={targetFat} step="0.1" onChange={(e) => setTargetFat(parseFloat(e.target.value))} />
          </div>
        </div>
      </div>
      <button className="btn-primary" style={{ marginTop: '20px' }}>
        Appliquer les paramètres
      </button>
    </div>
  );
};

export default SetupCard; 