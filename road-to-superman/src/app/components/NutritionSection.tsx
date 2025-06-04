"use client";

import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useApp } from '../context/AppContext';

interface MealOption {
  foods: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
  };
  benefits: string[];
}

interface Meal {
  name: string;
  options?: {
    [key: string]: MealOption;
  };
  foods?: string;
  calories?: number;
  macros?: {
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
  };
  benefits?: string[];
}

const NutritionSection = () => {
  const { currentPhase, getCurrentMeals, selectMealOption, userData } = useApp();
  
  const meals = getCurrentMeals();

  const handleMealOptionClick = (mealIndex: number, option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    selectMealOption(mealIndex, option);
  };

  const getCurrentMealOption = (meal: Meal, mealIndex: number) => {
    if (meal.options) {
      const choice = userData.mealChoices[currentPhase]?.[mealIndex] || 'optionA';
      return meal.options[choice];
    }
    return meal;
  };

  return (
    <div className="section-card fade-in">
      <div className="section-header">
        <div className="section-icon">🍽️</div>
        <h2 className="section-title">Nutrition du jour - Phase {currentPhase}</h2>
        <div className="add-btn">
          <PlusIcon className="w-5 h-5" />
        </div>
      </div>

      <div className="meal-list">
        {meals.map((meal, index) => {
          const mealOption = getCurrentMealOption(meal, index);
          const isOptionMeal = !!meal.options;
          
          return (
            <div key={index} className="meal-item">
              <div className="meal-info">
                <h4>{meal.name}</h4>
                <p className="meal-desc">{mealOption.foods}</p>
              </div>
              <div className="meal-calories">{mealOption.calories} kcal</div>
              
              {isOptionMeal && (
                <div className="meal-options">
                  <div 
                    className={`meal-option-btn ${userData.mealChoices[currentPhase]?.[index] === 'optionA' || !userData.mealChoices[currentPhase]?.[index] ? 'active' : ''}`}
                    onClick={(e) => handleMealOptionClick(index, 'optionA', e)}
                  >
                    A
                  </div>
                  <div 
                    className={`meal-option-btn ${userData.mealChoices[currentPhase]?.[index] === 'optionB' ? 'active' : ''}`}
                    onClick={(e) => handleMealOptionClick(index, 'optionB', e)}
                  >
                    B
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NutritionSection; 