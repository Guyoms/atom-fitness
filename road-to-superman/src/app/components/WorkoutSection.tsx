"use client";

import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useApp } from '../context/AppContext';

const WorkoutSection = () => {
  const { currentPhase, currentDay, setCurrentDay, getCurrentExercises, userData, updateUserData } = useApp();

  const workoutDays = [
    { label: 'LUN', type: 'Push', class: 'training' },
    { label: 'MAR', type: 'Legs', class: 'training' },
    { label: 'MER', type: 'Cardio', class: 'cardio' },
    { label: 'JEU', type: 'Pull', class: 'training' },
    { label: 'VEN', type: 'Legs', class: 'training' },
    { label: 'SAM', type: 'HIIT', class: 'hiit' },
    { label: 'DIM', type: 'Repos', class: 'rest' }
  ];

  const currentExercises = getCurrentExercises();

  const toggleExerciseCheck = (index: number) => {
    const key = `${currentPhase}-${currentDay}-${index}`;
    const newCompletedExercises = {
      ...userData.completedExercises,
      [key]: !userData.completedExercises[key]
    };
    updateUserData({ completedExercises: newCompletedExercises });
  };

  const selectDay = (dayIndex: number) => {
    setCurrentDay(dayIndex);
  };

  return (
    <div className="section-card fade-in">
      <div className="section-header">
        <div className="section-icon">🏋️</div>
        <h2 className="section-title">Entraînement - Phase {currentPhase}</h2>
        <div className="add-btn">
          <PlusIcon className="w-5 h-5" />
        </div>
      </div>

      <div className="workout-days">
        {workoutDays.map((day, index) => (
          <div
            key={index}
            className={`workout-day ${day.class} ${index === currentDay ? 'active' : ''}`}
            onClick={() => selectDay(index)}
          >
            <div className="day-label">{day.label}</div>
            <div className="day-type">{day.type}</div>
          </div>
        ))}
      </div>

      <h3 style={{ 
        marginBottom: '20px', 
        color: 'var(--text-primary)', 
        fontSize: '1.3em',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{ 
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: workoutDays[currentDay].class === 'training' ? '#3b82f6' : 
                     workoutDays[currentDay].class === 'cardio' ? '#10b981' :
                     workoutDays[currentDay].class === 'hiit' ? '#f59e0b' : '#6b7280'
        }}></span>
        Séance du jour - {workoutDays[currentDay].type}
      </h3>
      
      {currentExercises.length > 0 ? (
        <div className="exercise-list">
          {currentExercises.map((exercise, index) => {
            const exerciseKey = `${currentPhase}-${currentDay}-${index}`;
            const isChecked = userData.completedExercises[exerciseKey] || false;
            
            return (
              <div key={index} className="exercise-item">
                <div 
                  className={`exercise-check ${isChecked ? 'checked' : ''}`}
                  onClick={() => toggleExerciseCheck(index)}
                ></div>
                <div>
                  <div className="exercise-name">{exercise.name}</div>
                  <div className="exercise-details">{exercise.details}</div>
                </div>
                <div className="exercise-actions">
                  <div className="exercise-btn">
                    ✏️
                  </div>
                  <div className="exercise-btn">
                    📊
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: 'var(--text-secondary)',
          background: 'var(--bg-card)',
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ fontSize: '2em', marginBottom: '10px' }}>🛌</div>
          <h4 style={{ marginBottom: '5px', color: 'var(--text-primary)' }}>Jour de repos</h4>
          <p>Profitez de cette journée pour récupérer et vous ressourcer !</p>
        </div>
      )}
    </div>
  );
};

export default WorkoutSection; 