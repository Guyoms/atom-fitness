"use client";

import React from 'react';
import { 
  CalendarDaysIcon, 
  ScaleIcon, 
  UserIcon, 
  FireIcon, 
  BeakerIcon 
} from '@heroicons/react/24/outline';
import { useApp } from '../context/AppContext';

const ProgressOverview = () => {
  const { userData, getCurrentCalories } = useApp();
  return (
    <div className="progress-grid">
      <div className="progress-card fade-in">
        <div className="card-icon">
          <CalendarDaysIcon className="w-10 h-10 text-blue-500" />
        </div>
        <div className="card-title">Jour actuel</div>
        <div className="card-value">{userData.currentDay}</div>
        <div className="card-subtitle">sur 90 jours | Cliquez pour modifier</div>
      </div>
      <div className="progress-card fade-in">
        <div className="card-icon">
          <ScaleIcon className="w-10 h-10 text-blue-500" />
        </div>
        <div className="card-title">Poids actuel</div>
        <div className="card-value">{userData.currentWeight} kg</div>
        <div className="card-subtitle">Objectif: {userData.targetWeight} kg | Cliquez pour mettre à jour</div>
      </div>
      <div className="progress-card fade-in">
        <div className="card-icon">
          <UserIcon className="w-10 h-10 text-blue-500" />
        </div>
        <div className="card-title">Masse grasse</div>
        <div className="card-value">{userData.bodyFat}%</div>
        <div className="card-subtitle">Objectif: {userData.targetFat}% | Cliquez pour modifier</div>
      </div>
      <div className="progress-card fade-in">
        <div className="card-icon">
          <FireIcon className="w-10 h-10 text-orange-500" />
        </div>
        <div className="card-title">Calories jour</div>
        <div className="card-value">{getCurrentCalories()}</div>
        <div className="card-subtitle">Phase 1: Force</div>
      </div>
      <div className="progress-card fade-in">
        <div className="card-icon">
          <BeakerIcon className="w-10 h-10 text-blue-500" />
        </div>
        <div className="card-title">Eau consommée</div>
        <div className="card-value">{userData.waterAmount} L</div>
        <div className="card-subtitle">Objectif: 3 L | Cliquez pour enregistrer</div>
        <div className="water-tracker">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`water-glass${i < Math.round(userData.waterAmount) ? ' filled' : ''}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview; 