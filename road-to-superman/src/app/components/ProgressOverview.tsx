"use client";

import React, { useState } from 'react';
import { 
  CalendarDaysIcon, 
  ScaleIcon, 
  UserIcon, 
  FireIcon, 
  BeakerIcon 
} from '@heroicons/react/24/outline';
import { useApp } from '../context/AppContext';
import DayModal from './modals/DayModal';
import WeightModal from './modals/WeightModal';
import BodyFatModal from './modals/BodyFatModal';
import WaterModal from './modals/WaterModal';
import CaloriesInfoModal from './modals/CaloriesInfoModal';

const ProgressOverview = () => {
  const { userData, getCurrentCalories } = useApp();
  const [isDayModalOpen, setDayModalOpen] = useState(false);
  const [isWeightModalOpen, setWeightModalOpen] = useState(false);
  const [isBodyFatModalOpen, setBodyFatModalOpen] = useState(false);
  const [isWaterModalOpen, setWaterModalOpen] = useState(false);
  const [isCaloriesModalOpen, setCaloriesModalOpen] = useState(false);

  return (
    <div className="progress-grid">
      <div className="progress-card fade-in" onClick={() => setDayModalOpen(true)}>
        <div className="card-icon">
          <CalendarDaysIcon className="w-10 h-10 text-blue-500" />
        </div>
        <div className="card-title">Jour actuel</div>
        <div className="card-value">{userData.currentDay}</div>
        <div className="card-subtitle">sur 90 jours | Cliquez pour modifier</div>
      </div>
      <div className="progress-card fade-in" onClick={() => setWeightModalOpen(true)}>
        <div className="card-icon">
          <ScaleIcon className="w-10 h-10 text-blue-500" />
        </div>
        <div className="card-title">Poids actuel</div>
        <div className="card-value">{userData.currentWeight} kg</div>
        <div className="card-subtitle">Objectif: {userData.targetWeight} kg | Cliquez pour mettre à jour</div>
      </div>
      <div className="progress-card fade-in" onClick={() => setBodyFatModalOpen(true)}>
        <div className="card-icon">
          <UserIcon className="w-10 h-10 text-blue-500" />
        </div>
        <div className="card-title">Masse grasse</div>
        <div className="card-value">{userData.bodyFat}%</div>
        <div className="card-subtitle">Objectif: {userData.targetFat}% | Cliquez pour modifier</div>
      </div>
      <div className="progress-card fade-in" onClick={() => setCaloriesModalOpen(true)}>
        <div className="card-icon">
          <FireIcon className="w-10 h-10 text-orange-500" />
        </div>
        <div className="card-title">Calories jour</div>
        <div className="card-value">{getCurrentCalories()}</div>
        <div className="card-subtitle">Phase 1: Force</div>
      </div>
      <div className="progress-card fade-in" onClick={() => setWaterModalOpen(true)}>
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

      {/* Modals */}
      <DayModal isOpen={isDayModalOpen} onOpenChange={setDayModalOpen} />
      <WeightModal isOpen={isWeightModalOpen} onOpenChange={setWeightModalOpen} />
      <BodyFatModal isOpen={isBodyFatModalOpen} onOpenChange={setBodyFatModalOpen} />
      <WaterModal isOpen={isWaterModalOpen} onOpenChange={setWaterModalOpen} />
      <CaloriesInfoModal isOpen={isCaloriesModalOpen} onOpenChange={setCaloriesModalOpen} />
    </div>
  );
};

export default ProgressOverview; 