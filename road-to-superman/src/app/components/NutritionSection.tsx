"use client";

import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

const NutritionSection = () => {
  const [mealChoices, setMealChoices] = useState<{[key: number]: 'A' | 'B'}>({
    0: 'A',
    1: 'A', 
    2: 'A',
    3: 'A',
    4: 'A',
    5: 'A'
  });

  const meals = [
    {
      name: 'Petit-déjeuner',
      options: {
        A: { foods: '3 œufs brouillés + 60g flocons d\'avoine + 1 banane', calories: 450 },
        B: { foods: '100g fromage blanc 0% + 40g muesli + 30g amandes + 1 kiwi', calories: 420 }
      }
    },
    {
      name: 'Collation',
      options: {
        A: { foods: '30g whey protéine + 1 pomme', calories: 200 },
        B: { foods: '1 yaourt grec + 20g noix + 1 poire', calories: 220 }
      }
    },
    {
      name: 'Déjeuner',
      options: {
        A: { foods: '150g poulet + 100g riz basmati + ½ avocat', calories: 650 },
        B: { foods: '150g steak haché 5% + 200g patate douce + légumes verts', calories: 620 }
      }
    },
    {
      name: 'Post-training',
      options: {
        A: { foods: 'Shake whey + créatine + miel', calories: 150 },
        B: { foods: 'Shake protéiné + 1 banane', calories: 180 }
      }
    },
    {
      name: 'Dîner',
      options: {
        A: { foods: '180g saumon + 300g patates douces + champignons', calories: 550 },
        B: { foods: '200g cabillaud + 150g quinoa + brocoli', calories: 520 }
      }
    },
    {
      name: 'Avant coucher',
      options: {
        A: { foods: '150g fromage blanc 0% + 15g amandes + fruits rouges', calories: 300 },
        B: { foods: 'Omelette 2 œufs + épinards + 30g fromage de chèvre', calories: 280 }
      }
    }
  ];

  const selectMealOption = (mealIndex: number, option: 'A' | 'B') => {
    setMealChoices(prev => ({
      ...prev,
      [mealIndex]: option
    }));
  };

  return (
    <div className="section-card fade-in">
      <div className="section-header">
        <div className="section-icon">🍽️</div>
        <h2 className="section-title">Nutrition du jour</h2>
        <div className="add-btn">
          <PlusIcon className="w-5 h-5" />
        </div>
      </div>

      <div className="meal-list">
        {meals.map((meal, index) => {
          const selectedOption = mealChoices[index] || 'A';
          const currentMeal = meal.options[selectedOption];
          
          return (
            <div key={index} className="meal-item">
              <div className="meal-info">
                <h4>{meal.name}</h4>
                <p className="meal-desc">{currentMeal.foods}</p>
              </div>
              <div className="meal-calories">{currentMeal.calories} kcal</div>
              
              <div className="meal-options">
                <div
                  className={`meal-option-btn ${selectedOption === 'A' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectMealOption(index, 'A');
                  }}
                >
                  A
                </div>
                <div
                  className={`meal-option-btn ${selectedOption === 'B' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectMealOption(index, 'B');
                  }}
                >
                  B
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NutritionSection; 