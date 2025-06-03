"use client";

import React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';

const NutritionInfo = () => {
  return (
    <div className="nutrition-info fade-in">
      <div className="section-header">
        <div className="section-icon">
          <ChartBarIcon className="w-8 h-8 text-blue-500" />
        </div>
        <h2 className="section-title">Macros & Objectifs Nutritionnels</h2>
      </div>
      <p>Votre programme nutritionnel est conçu pour maximiser la croissance musculaire tout en réduisant la masse graisseuse.</p>
      <div className="macros-grid">
        <div className="macro-card protein">
          <div className="macro-value protein">180g</div>
          <div className="macro-name">Protéines</div>
          <div className="macro-subtitle">Réparation musculaire</div>
        </div>
        <div className="macro-card carbs">
          <div className="macro-value carbs">250g</div>
          <div className="macro-name">Glucides</div>
          <div className="macro-subtitle">Énergie pour l'entraînement</div>
        </div>
        <div className="macro-card fats">
          <div className="macro-value fats">70g</div>
          <div className="macro-name">Lipides</div>
          <div className="macro-subtitle">Hormones & santé</div>
        </div>
        <div className="macro-card fiber">
          <div className="macro-value fiber">35g</div>
          <div className="macro-name">Fibres</div>
          <div className="macro-subtitle">Digestion & satiété</div>
        </div>
      </div>
    </div>
  );
};

export default NutritionInfo; 