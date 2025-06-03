"use client";

import React from 'react';

const SupplementsSection = () => {
  return (
    <div className="supplements-section fade-in">
      <div className="section-header">
        <div className="section-icon">💊</div>
        <h2 className="section-title">Supplémentation du jour (ordre chronologique)</h2>
      </div>
      <div className="supplements-grid">
        <div className="supplement-card">
          <div className="supplement-icon">🔥</div>
          <div className="supplement-name">L-Carnitine</div>
          <div className="supplement-dose">1. À jeun le matin (6h30)</div>
        </div>
        <div className="supplement-card">
          <span className="supplement-badge">Essentiel</span>
          <div className="supplement-icon">☀️</div>
          <div className="supplement-name">Vitamine D3 2000IU</div>
          <div className="supplement-dose">2. Petit-déjeuner</div>
        </div>
        <div className="supplement-card">
          <div className="supplement-icon">💊</div>
          <div className="supplement-name">Multivitamines</div>
          <div className="supplement-dose">3. Petit-déjeuner</div>
        </div>
        <div className="supplement-card">
          <span className="supplement-badge">Essentiel</span>
          <div className="supplement-icon">🐟</div>
          <div className="supplement-name">Omega-3 EPA & DHA</div>
          <div className="supplement-dose">4. Matin & Soir (2 caps chaque)</div>
        </div>
        <div className="supplement-card">
          <div className="supplement-icon">⚡</div>
          <div className="supplement-name">Créatine Micronisée</div>
          <div className="supplement-dose">5. Post-entraînement</div>
        </div>
        <div className="supplement-card">
          <span className="supplement-badge">Essentiel</span>
          <div className="supplement-icon">🔵</div>
          <div className="supplement-name">Magnésium Bisglycinate</div>
          <div className="supplement-dose">6. Avant coucher (22h)</div>
        </div>
      </div>
    </div>
  );
};

export default SupplementsSection; 