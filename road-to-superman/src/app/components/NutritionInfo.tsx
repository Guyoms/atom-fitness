"use client";

import React from 'react';
import { useApp } from '../context/AppContext';

const NutritionInfo = () => {
  const { currentPhase, getCurrentMacros, getCurrentCalories, userData } = useApp();
  
  const macros = getCurrentMacros();
  const calories = getCurrentCalories();

  const getPhaseDescription = (phase: number) => {
    switch (phase) {
      case 1:
        return `Votre programme nutritionnel est conçu pour maximiser la croissance musculaire tout en réduisant la masse graisseuse.\nDépart: ${userData.startWeight}kg, ${userData.startFat}% MG | Objectif: ${userData.targetWeight}kg, ${userData.targetFat}% MG.`;
      case 2:
        return `Phase de recomposition corporelle : perdre du gras tout en maintenant la masse musculaire acquise.\nDépart: ${userData.startWeight}kg, ${userData.startFat}% MG | Objectif: ${userData.targetWeight}kg, ${userData.targetFat}% MG.`;
      case 3:
        return `Phase de définition : révéler votre physique en éliminant les dernières réserves de graisse.\nDépart: ${userData.startWeight}kg, ${userData.startFat}% MG | Objectif: ${userData.targetWeight}kg, ${userData.targetFat}% MG.`;
      default:
        return `Votre programme nutritionnel est conçu pour maximiser la croissance musculaire tout en réduisant la masse graisseuse.\nDépart: ${userData.startWeight}kg, ${userData.startFat}% MG | Objectif: ${userData.targetWeight}kg, ${userData.targetFat}% MG.`;
    }
  };

  return (
    <div className="nutrition-info fade-in">
      <div className="section-header">
        <div className="section-icon">📊</div>
        <h2 className="section-title">Macros & Objectifs Nutritionnels - Phase {currentPhase}</h2>
      </div>
      <p>{getPhaseDescription(currentPhase)}</p>
      <p style={{ marginTop: '10px', color: 'var(--text-secondary)' }}>
        Poids actuel: <span style={{ color: 'var(--accent-blue)', fontWeight: 'bold' }}>{userData.currentWeight} kg</span> | Masse grasse actuelle: <span style={{ color: 'var(--accent-blue)', fontWeight: 'bold' }}>{userData.bodyFat}%</span>
      </p>
      <p style={{ marginTop: '10px', color: 'var(--text-secondary)' }}>
        Calories journalières: <span style={{ color: 'var(--accent-blue)', fontWeight: 'bold' }}>{calories} kcal</span>
      </p>
      
      <div className="macros-grid">
        <div className="macro-card">
          <div className="macro-value protein">{macros.protein}g</div>
          <div className="macro-name">Protéines</div>
          <div className="macro-subtitle">Réparation musculaire</div>
        </div>
        <div className="macro-card">
          <div className="macro-value carbs">{macros.carbs}g</div>
          <div className="macro-name">Glucides</div>
          <div className="macro-subtitle">Énergie pour l&apos;entraînement</div>
        </div>
        <div className="macro-card">
          <div className="macro-value fats">{macros.fats}g</div>
          <div className="macro-name">Lipides</div>
          <div className="macro-subtitle">Hormones & santé</div>
        </div>
        <div className="macro-card">
          <div className="macro-value fiber">{macros.fiber}g</div>
          <div className="macro-name">Fibres</div>
          <div className="macro-subtitle">Digestion & satiété</div>
        </div>
      </div>
      <p>L&apos;objectif est de maintenir un déficit calorique</p>
    </div>
  );
};

export default NutritionInfo; 