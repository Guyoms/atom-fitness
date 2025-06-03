"use client";

import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface Exercise {
  name: string;
  details: string;
}

const WorkoutSection = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [checkedExercises, setCheckedExercises] = useState<{[key: string]: boolean}>({});

  const workoutDays = [
    { label: 'LUN', type: 'Push', active: true, class: 'training' },
    { label: 'MAR', type: 'Legs', active: false, class: 'training' },
    { label: 'MER', type: 'Cardio', active: false, class: 'cardio' },
    { label: 'JEU', type: 'Pull', active: false, class: 'training' },
    { label: 'VEN', type: 'Legs', active: false, class: 'training' },
    { label: 'SAM', type: 'HIIT', active: false, class: 'hiit' },
    { label: 'DIM', type: 'Repos', active: false, class: 'rest' }
  ];

  const exercisesByDay: Record<number, Exercise[]> = {
    0: [ // Lundi - Push
      { name: 'Développé couché', details: '4 séries × 6 reps • Repos 2-3 min' },
      { name: 'Développé militaire', details: '3 séries × 8 reps • Repos 2 min' },
      { name: 'Écartés inclinés', details: '3 séries × 12 reps • Repos 1.5 min' },
      { name: 'Élévations latérales', details: '4 séries × 15 reps • Repos 1 min' },
      { name: 'Dips triceps', details: '3 séries × 10-12 reps • Repos 1.5 min' },
      { name: 'Extensions poulie', details: '3 séries × 15 reps • Repos 1 min' }
    ],
    1: [ // Mardi - Legs
      { name: 'Squat arrière', details: '4 séries × 6 reps • Repos 2-3 min' },
      { name: 'Soulevé de terre', details: '3 séries × 5 reps • Repos 2-3 min' },
      { name: 'Presse à cuisses', details: '3 séries × 8 reps • Repos 2 min' },
      { name: 'Leg curl', details: '3 séries × 10 reps • Repos 1.5 min' },
      { name: 'Mollets', details: '4 séries × 8-10 reps • Repos 1.5 min' }
    ],
    2: [ // Mercredi - Cardio
      { name: 'Échauffement', details: '5 min marche rapide ou vélo léger' },
      { name: 'Cardio modéré', details: '30 min vélo/elliptique à 65-70% FCM' },
      { name: 'Étirements actifs', details: '10 min mobilité articulaire' },
      { name: 'Gainage', details: '3 × 30 sec planche • Repos 30 sec' }
    ],
    6: [] // Dimanche - Repos
  };

  const currentExercises = exercisesByDay[selectedDay] || exercisesByDay[0];

  const toggleExerciseCheck = (index: number) => {
    setCheckedExercises(prev => ({
      ...prev,
      [`${selectedDay}-${index}`]: !prev[`${selectedDay}-${index}`]
    }));
  };

  const selectDay = (dayIndex: number) => {
    setSelectedDay(dayIndex);
  };

  return (
    <div className="section-card fade-in">
      <div className="section-header">
        <div className="section-icon">🏋️</div>
        <h2 className="section-title">Entraînement</h2>
        <div className="add-btn">
          <PlusIcon className="w-5 h-5" />
        </div>
      </div>

      <div className="workout-days">
        {workoutDays.map((day, index) => (
          <div
            key={index}
            className={`workout-day ${day.class} ${index === selectedDay ? 'active' : ''}`}
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
          background: workoutDays[selectedDay].class === 'training' ? '#3b82f6' : 
                     workoutDays[selectedDay].class === 'cardio' ? '#10b981' :
                     workoutDays[selectedDay].class === 'hiit' ? '#f59e0b' : '#6b7280'
        }}></span>
        Séance du jour - {workoutDays[selectedDay].type}
      </h3>
      
      {currentExercises.length > 0 ? (
        <div className="exercise-list">
          {currentExercises.map((exercise: Exercise, index: number) => (
            <div key={index} className="exercise-item">
              <div 
                className={`exercise-check ${checkedExercises[`${selectedDay}-${index}`] ? 'checked' : ''}`}
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
          ))}
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