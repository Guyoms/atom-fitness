"use client";

import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '@heroui/button';

export default function SetupCard() {
  const { userData, applyCustomSettings, saveData } = useApp();

  const [startWeight, setStartWeight] = useState(userData.startWeight);
  const [startFat, setStartFat] = useState(userData.startFat);
  const [targetWeight, setTargetWeight] = useState(userData.targetWeight);
  const [targetFat, setTargetFat] = useState(userData.targetFat);
  const [isApplying, setIsApplying] = useState(false);

  // Update local state when userData changes
  useEffect(() => {
    setStartWeight(userData.startWeight);
    setStartFat(userData.startFat);
    setTargetWeight(userData.targetWeight);
    setTargetFat(userData.targetFat);
  }, [userData.startWeight, userData.startFat, userData.targetWeight, userData.targetFat]);

  const handleApplySettings = async () => {
    setIsApplying(true);

    try {
      console.log('Applying settings:', { startWeight, startFat, targetWeight, targetFat });

      // Apply the custom settings through the context
      await applyCustomSettings({
        startWeight,
        startFat,
        targetWeight,
        targetFat
      });

      // Force save to localStorage
      await saveData();

      console.log('Settings applied successfully');

      // Show success feedback
      alert('Paramètres appliqués avec succès !');
    } catch (error) {
      console.error('Error applying settings:', error);
      alert('Erreur lors de l\'application des paramètres');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="setup-card fade-in">
      <h2>Personnalisez votre programme</h2>
      <p>Définissez vos paramètres de départ pour adapter le programme à votre physique</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px',
        marginTop: '20px'
      }}>
        <div>
          <label htmlFor="custom-start-weight">Poids initial (kg)</label>
          <input
            type="number"
            id="custom-start-weight"
            min="0"
            max="200"
            value={startWeight}
            step="0.1"
            onChange={(e) => setStartWeight(parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="custom-start-fat">Masse grasse initiale (%)</label>
          <input
            type="number"
            id="custom-start-fat"
            min="0"
            max="100"
            value={startFat}
            step="0.1"
            onChange={(e) => setStartFat(parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="custom-target-weight">Poids cible (kg)</label>
          <input
            type="number"
            id="custom-target-weight"
            min="0"
            max="200"
            value={targetWeight}
            step="0.1"
            onChange={(e) => setTargetWeight(parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="custom-target-fat">Masse grasse cible (%)</label>
          <input
            type="number"
            id="custom-target-fat"
            min="0"
            max="100"
            value={targetFat}
            step="0.1"
            onChange={(e) => setTargetFat(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <Button
        className="btn-primary"
        style={{ marginTop: '20px' }}
        onPress={handleApplySettings}
        disabled={isApplying}
      >
        {isApplying ? 'Application...' : 'Appliquer les paramètres'}
      </Button>

      {/* Debug info */}
      <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
        <p>Debug: Current values - Poids: {userData.startWeight}kg, Masse grasse: {userData.startFat}%</p>
      </div>
    </div>
  );
} 