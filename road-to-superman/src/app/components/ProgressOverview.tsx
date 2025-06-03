"use client";

import React from 'react';
import { 
  CalendarDaysIcon, 
  ScaleIcon, 
  UserIcon, 
  FireIcon, 
  BeakerIcon 
} from '@heroicons/react/24/outline';

const ProgressOverview = () => {
  return (
    <div className="progress-grid">
      <div className="progress-card fade-in">
        <div className="card-icon">
          <CalendarDaysIcon className="w-10 h-10 text-blue-500" />
        </div>
        <div className="card-title">Jour actuel</div>
        <div className="card-value">3</div>
        <div className="card-subtitle">sur 90 jours | Cliquez pour modifier</div>
      </div>
      <div className="progress-card fade-in">
        <div className="card-icon">
          <ScaleIcon className="w-10 h-10 text-blue-500" />
        </div>
        <div className="card-title">Poids actuel</div>
        <div className="card-value">102.5 kg</div>
        <div className="card-subtitle">Objectif: 90 kg | Cliquez pour mettre à jour</div>
      </div>
      <div className="progress-card fade-in">
        <div className="card-icon">
          <UserIcon className="w-10 h-10 text-blue-500" />
        </div>
        <div className="card-title">Masse grasse</div>
        <div className="card-value">27%</div>
        <div className="card-subtitle">Objectif: 15% | Cliquez pour modifier</div>
      </div>
      <div className="progress-card fade-in">
        <div className="card-icon">
          <FireIcon className="w-10 h-10 text-orange-500" />
        </div>
        <div className="card-title">Calories jour</div>
        <div className="card-value">2350</div>
        <div className="card-subtitle">Phase 1: Force</div>
      </div>
      <div className="progress-card fade-in">
        <div className="card-icon">
          <BeakerIcon className="w-10 h-10 text-blue-500" />
        </div>
        <div className="card-title">Eau consommée</div>
        <div className="card-value">1.5 L</div>
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
  );
};

export default ProgressOverview; 