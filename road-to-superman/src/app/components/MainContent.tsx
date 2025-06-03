"use client";

import React, { useState } from 'react';

const MainContent = () => {
  const [startWeight, setStartWeight] = useState(106);
  const [startFat, setStartFat] = useState(30);
  const [targetWeight, setTargetWeight] = useState(90);
  const [targetFat, setTargetFat] = useState(15);

  return (
    <div className="container">
      {/* Setup Card */}
      <div className="setup-card fade-in">
        <h2>Personnalisez votre programme</h2>
        <p>Définissez vos paramètres de départ pour adapter le programme à votre physique</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
          <div>
            <label htmlFor="custom-start-weight">Poids initial (kg)</label>
            <input type="number" id="custom-start-weight" min="50" max="200" value={startWeight} step="0.1" onChange={(e) => setStartWeight(parseFloat(e.target.value))} />
          </div>
          <div>
            <label htmlFor="custom-start-fat">Masse grasse initiale (%)</label>
            <input type="number" id="custom-start-fat" min="5" max="50" value={startFat} step="0.1" onChange={(e) => setStartFat(parseFloat(e.target.value))} />
          </div>
          <div>
            <label htmlFor="custom-target-weight">Poids cible (kg)</label>
            <input type="number" id="custom-target-weight" min="50" max="200" value={targetWeight} step="0.1" onChange={(e) => setTargetWeight(parseFloat(e.target.value))} />
          </div>
          <div>
            <label htmlFor="custom-target-fat">Masse grasse cible (%)</label>
            <input type="number" id="custom-target-fat" min="5" max="20" value={targetFat} step="0.1" onChange={(e) => setTargetFat(parseFloat(e.target.value))} />
          </div>
        </div>
        <button className="btn-primary" style={{ marginTop: '20px' }}>
          Appliquer les paramètres
        </button>
      </div>

      {/* Progress Overview */}
      <div className="progress-grid">
        <div className="progress-card fade-in">
          <div className="card-icon">📅</div>
          <div className="card-title">Jour actuel</div>
          <div className="card-value" id="current-day">3</div>
          <div className="card-subtitle">sur 90 jours | Cliquez pour modifier</div>
        </div>
        <div className="progress-card fade-in">
          <div className="card-icon">⚖️</div>
          <div className="card-title">Poids actuel</div>
          <div className="card-value" id="current-weight">102.5 kg</div>
          <div className="card-subtitle">Objectif: <span id="target-weight-display">90</span> kg | Cliquez pour mettre à jour</div>
        </div>
        <div className="progress-card fade-in">
          <div className="card-icon">💪</div>
          <div className="card-title">Masse grasse</div>
          <div className="card-value" id="body-fat">27%</div>
          <div className="card-subtitle">Objectif: <span id="target-fat-display">15</span>% | Cliquez pour modifier</div>
        </div>
        <div className="progress-card fade-in">
          <div className="card-icon">🔥</div>
          <div className="card-title">Calories jour</div>
          <div className="card-value" id="daily-calories">2300</div>
          <div className="card-subtitle" id="phase-name">Phase 1: Force</div>
        </div>
        <div className="progress-card fade-in">
          <div className="card-icon">💧</div>
          <div className="card-title">Eau consommée</div>
          <div className="card-value" id="water-amount">1.5 L</div>
          <div className="card-subtitle">Objectif: 3 L | Cliquez pour enregistrer</div>
          <div className="water-tracker">
            <div className="water-glass filled"></div>
            <div className="water-glass filled"></div>
            <div className="water-glass filled"></div>
            <div className="water-glass"></div>
            <div className="water-glass"></div>
            <div className="water-glass"></div>
          </div>
        </div>
      </div>

      {/* Phase Selector */}
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

      {/* Nutrition Info */}
      <div className="nutrition-info fade-in">
        <div className="section-header">
          <div className="section-icon">📊</div>
          <h2 className="section-title">Macros & Objectifs Nutritionnels</h2>
        </div>
        <p>Votre programme nutritionnel est conçu pour maximiser la croissance musculaire tout en réduisant la masse graisseuse.</p>
        <div className="macros-grid">
          <div className="macro-card">
            <div className="macro-value protein" id="protein-value">180g</div>
            <div className="macro-name">Protéines</div>
            <div className="macro-subtitle">Réparation musculaire</div>
          </div>
          <div className="macro-card">
            <div className="macro-value carbs" id="carbs-value">250g</div>
            <div className="macro-name">Glucides</div>
            <div className="macro-subtitle">Énergie pour l'entraînement</div>
          </div>
          <div className="macro-card">
            <div className="macro-value fats" id="fats-value">70g</div>
            <div className="macro-name">Lipides</div>
            <div className="macro-subtitle">Hormones & santé</div>
          </div>
          <div className="macro-card">
            <div className="macro-value fiber" id="fiber-value">35g</div>
            <div className="macro-name">Fibres</div>
            <div className="macro-subtitle">Digestion & satiété</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent; 