"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// Types
interface MacroData {
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

interface MealOption {
  foods: string;
  calories: number;
  macros: MacroData;
  benefits: string[];
}

interface Meal {
  name: string;
  options?: {
    [key: string]: MealOption;
  };
  foods?: string;
  calories?: number;
  macros?: MacroData;
  benefits?: string[];
}

interface Exercise {
  name: string;
  details: string;
}

interface UserData {
  currentDay: number;
  currentWeight: number;
  bodyFat: number;
  waterAmount: number;
  startWeight: number;
  startFat: number;
  targetWeight: number;
  targetFat: number;
  completedExercises: { [key: string]: boolean };
  dailyNotes: { [key: number]: string };
  customExercises: { [phase: number]: { [day: number]: Exercise[] } };
  customMeals: { [phase: number]: Meal[] };
  mealChoices: { [phase: number]: { [mealIndex: number]: string } };
  weightHistory: Array<{ date: string; value: number }>;
  bodyFatHistory: Array<{ date: string; value: number }>;
}

interface AppContextType {
  // State
  currentPhase: number;
  currentDay: number;
  userData: UserData;
  
  // Actions
  setCurrentPhase: (phase: number) => void;
  setCurrentDay: (day: number) => void;
  updateUserData: (data: Partial<UserData>) => void;
  
  // Computed values
  getCurrentMacros: () => MacroData;
  getCurrentMeals: () => Meal[];
  getCurrentExercises: () => Exercise[];
  getCurrentCalories: () => number;
  
  // Meal choices
  selectMealOption: (mealIndex: number, option: string) => void;
  
  // Custom settings
  applyCustomSettings: (settings: {
    startWeight: number;
    startFat: number;
    targetWeight: number;
    targetFat: number;
  }) => Promise<void>;
  
  // Save/Load
  saveData: () => Promise<void>;
  loadUserData: () => void;
  syncToSupabase: () => Promise<void>;
  syncFromSupabase: () => Promise<void>;
}

// Base nutrition data (for 106kg reference weight)
const nutritionDataBase: { [phase: number]: { meals: Meal[] } } = {
  1: {
    meals: [
      { 
        name: 'Petit-déjeuner', 
        options: {
          optionA: {
            foods: '3 œufs brouillés + 60g flocons d\'avoine + 1 banane', 
            calories: 450,
            macros: { protein: 30, carbs: 60, fats: 15, fiber: 8 },
            benefits: [
              'Protéines pour la récupération musculaire',
              'Glucides complexes pour une énergie durable',
              'Potassium pour la fonction musculaire',
              'Fibres pour la digestion'
            ]
          },
          optionB: {
            foods: '100g fromage blanc 0% + 40g muesli + 30g amandes + 1 kiwi', 
            calories: 420,
            macros: { protein: 28, carbs: 45, fats: 16, fiber: 9 },
            benefits: [
              'Protéines de fromage blanc pour une digestion lente',
              'Muesli pour les glucides complexes',
              'Amandes pour les graisses saines',
              'Kiwi pour la vitamine C'
            ]
          }
        }
      },
      { 
        name: 'Collation', 
        options: {
          optionA: {
            foods: '30g whey protéine + 1 pomme', 
            calories: 200,
            macros: { protein: 25, carbs: 20, fats: 2, fiber: 4 },
            benefits: [
              'Protéines rapides pour la synthèse musculaire',
              'Vitamines et antioxydants',
              'Récupération rapide entre les repas'
            ]
          },
          optionB: {
            foods: '1 yaourt grec + 20g noix + 1 poire', 
            calories: 220,
            macros: { protein: 20, carbs: 18, fats: 10, fiber: 5 },
            benefits: [
              'Protéines de yaourt grec',
              'Graisses saines des noix',
              'Fibres pour la satiété'
            ]
          }
        }
      },
      { 
        name: 'Déjeuner', 
        options: {
          optionA: {
            foods: '150g poulet + 100g riz basmati + ½ avocat', 
            calories: 650,
            macros: { protein: 45, carbs: 70, fats: 20, fiber: 6 },
            benefits: [
              'Protéines complètes pour la construction musculaire',
              'Glucides pour reconstituer le glycogène',
              'Graisses saines pour les hormones',
              'Fibres pour la satiété'
            ]
          },
          optionB: {
            foods: '150g steak haché 5% + 200g patate douce + légumes verts', 
            calories: 620,
            macros: { protein: 42, carbs: 65, fats: 18, fiber: 8 },
            benefits: [
              'Fer pour la production d\'énergie',
              'Vitamine B12 pour le système nerveux',
              'Antioxydants pour la récupération'
            ]
          }
        }
      },
      { 
        name: 'Post-training', 
        options: {
          optionA: {
            foods: 'Shake whey + créatine + miel', 
            calories: 150,
            macros: { protein: 25, carbs: 20, fats: 1, fiber: 0 },
            benefits: [
              'Protéines rapides pour la récupération',
              'Créatine pour la force et la puissance',
              'Glucides simples pour la recharge énergétique'
            ]
          },
          optionB: {
            foods: 'Shake protéiné + 1 banane', 
            calories: 180,
            macros: { protein: 25, carbs: 25, fats: 1, fiber: 2 },
            benefits: [
              'Protéines rapides pour la synthèse musculaire',
              'Potassium pour prévenir les crampes',
              'Glucides pour restaurer les réserves de glycogène'
            ]
          }
        }
      },
      { 
        name: 'Dîner', 
        options: {
          optionA: {
            foods: '180g saumon + 300g patates douces + champignons', 
            calories: 550,
            macros: { protein: 40, carbs: 50, fats: 18, fiber: 8 },
            benefits: [
              'Oméga-3 pour la récupération et l\'inflammation',
              'Vitamine D pour la santé osseuse',
              'Glucides complexes pour la nuit',
              'Antioxydants pour la santé cellulaire'
            ]
          },
          optionB: {
            foods: '200g cabillaud + 150g quinoa + brocoli', 
            calories: 520,
            macros: { protein: 38, carbs: 55, fats: 15, fiber: 10 },
            benefits: [
              'Protéines maigres pour la définition',
              'Quinoa pour les protéines complètes',
              'Fibres pour la digestion',
              'Vitamine C pour le système immunitaire'
            ]
          }
        }
      },
      { 
        name: 'Avant coucher', 
        options: {
          optionA: {
            foods: '150g fromage blanc 0% + 15g amandes + fruits rouges', 
            calories: 300,
            macros: { protein: 25, carbs: 20, fats: 10, fiber: 5 },
            benefits: [
              'Protéines lentes pour la nuit',
              'Graisses saines pour la testostérone',
              'Antioxydants pour la récupération',
              'Tryptophane pour un meilleur sommeil'
            ]
          },
          optionB: {
            foods: 'Omelette 2 œufs + épinards + 30g fromage de chèvre', 
            calories: 280,
            macros: { protein: 24, carbs: 5, fats: 18, fiber: 2 },
            benefits: [
              'Protéines complètes pour la nuit',
              'Graisses saines pour les hormones',
              'Calcium pour la santé osseuse',
              'Tryptophane pour un sommeil réparateur'
            ]
          }
        }
      }
    ]
  },
  2: {
    meals: [
      { 
        name: 'Petit-déjeuner', 
        options: {
          optionA: {
            foods: 'Crêpes protéinées + fromage blanc 0%', 
            calories: 400,
            macros: { protein: 35, carbs: 45, fats: 10, fiber: 5 },
            benefits: [
              'Protéines pour la construction musculaire',
              'Glucides pour l\'énergie matinale',
              'Calcium pour la santé osseuse'
            ]
          },
          optionB: {
            foods: '2 œufs pochés + 2 tranches pain complet + avocat', 
            calories: 420,
            macros: { protein: 25, carbs: 40, fats: 18, fiber: 8 },
            benefits: [
              'Protéines complètes pour la construction musculaire',
              'Graisses saines pour les hormones',
              'Fibres pour la digestion'
            ]
          }
        }
      },
      { 
        name: 'Collation', 
        options: {
          optionA: {
            foods: '25g whey + 10 amandes', 
            calories: 180,
            macros: { protein: 20, carbs: 5, fats: 10, fiber: 3 },
            benefits: [
              'Protéines rapides pour la synthèse musculaire',
              'Graisses saines pour les hormones',
              'Fibres pour la satiété'
            ]
          },
          optionB: {
            foods: '1 barre protéinée + 10 noix de cajou', 
            calories: 200,
            macros: { protein: 18, carbs: 15, fats: 12, fiber: 4 },
            benefits: [
              'Protéines pour la récupération',
              'Glucides pour l\'énergie',
              'Graisses saines pour la satiété'
            ]
          }
        }
      },
      { 
        name: 'Déjeuner', 
        options: {
          optionA: {
            foods: 'Buddha bowl: quinoa + pois chiches + poulet', 
            calories: 600,
            macros: { protein: 40, carbs: 70, fats: 15, fiber: 12 },
            benefits: [
              'Protéines complètes pour la construction musculaire',
              'Glucides complexes pour l\'énergie durable',
              'Fibres pour la digestion et la satiété'
            ]
          },
          optionB: {
            foods: '150g dinde + 100g sarrasin + salade verte', 
            calories: 580,
            macros: { protein: 42, carbs: 65, fats: 12, fiber: 10 },
            benefits: [
              'Protéines maigres pour la définition',
              'Glucides complexes pour l\'énergie',
              'Fibres pour la digestion'
            ]
          }
        }
      },
      { 
        name: 'Post-training', 
        options: {
          optionA: {
            foods: 'Shake whey + créatine', 
            calories: 150,
            macros: { protein: 25, carbs: 5, fats: 1, fiber: 0 },
            benefits: [
              'Protéines rapides pour la récupération',
              'Créatine pour la force et la puissance'
            ]
          },
          optionB: {
            foods: 'Shake protéiné + 1 datte', 
            calories: 170,
            macros: { protein: 25, carbs: 15, fats: 1, fiber: 1 },
            benefits: [
              'Protéines rapides pour la synthèse musculaire',
              'Glucides rapides pour la récupération',
              'Potassium pour prévenir les crampes'
            ]
          }
        }
      },
      { 
        name: 'Dîner', 
        options: {
          optionA: {
            foods: '150g steak + haricots verts + 100g riz', 
            calories: 520,
            macros: { protein: 35, carbs: 60, fats: 12, fiber: 8 },
            benefits: [
              'Fer pour la production d\'énergie',
              'Vitamine B12 pour le système nerveux',
              'Antioxydants pour la récupération'
            ]
          },
          optionB: {
            foods: '180g saumon + asperges + 80g riz complet', 
            calories: 540,
            macros: { protein: 38, carbs: 50, fats: 20, fiber: 6 },
            benefits: [
              'Oméga-3 pour réduire l\'inflammation',
              'Protéines complètes pour la récupération',
              'Fibres pour la digestion'
            ]
          }
        }
      },
      { 
        name: 'Avant coucher', 
        options: {
          optionA: {
            foods: 'Omelette 2 œufs + jambon', 
            calories: 250,
            macros: { protein: 25, carbs: 2, fats: 15, fiber: 0 },
            benefits: [
              'Protéines lentes pour la nuit',
              'Graisses saines pour les hormones',
              'Tryptophane pour un meilleur sommeil'
            ]
          },
          optionB: {
            foods: 'Cottage cheese + 30g noix + cannelle', 
            calories: 240,
            macros: { protein: 24, carbs: 10, fats: 12, fiber: 2 },
            benefits: [
              'Caséine pour une libération lente de protéines',
              'Graisses saines pour les hormones',
              'Cannelle pour la régulation glycémique'
            ]
          }
        }
      }
    ]
  },
  3: {
    meals: [
      { 
        name: 'Petit-déjeuner', 
        options: {
          optionA: {
            foods: 'Omelette 4 blancs 1 jaune + 1 tranche pain', 
            calories: 350,
            macros: { protein: 30, carbs: 35, fats: 10, fiber: 3 },
            benefits: [
              'Protéines maigres pour la définition',
              'Glucides complexes pour l\'énergie',
              'Graisses saines pour les hormones'
            ]
          },
          optionB: {
            foods: '100g fromage blanc 0% + 30g flocons d\'avoine + 1 kiwi', 
            calories: 320,
            macros: { protein: 28, carbs: 40, fats: 5, fiber: 6 },
            benefits: [
              'Protéines pour la construction musculaire',
              'Glucides complexes pour l\'énergie durable',
              'Vitamine C pour le système immunitaire'
            ]
          }
        }
      },
      { 
        name: 'Collation', 
        options: {
          optionA: {
            foods: '25g whey + 10 amandes', 
            calories: 150,
            macros: { protein: 20, carbs: 5, fats: 10, fiber: 3 },
            benefits: [
              'Protéines rapides pour la synthèse musculaire',
              'Graisses saines pour la satiété',
              'Fibres pour la digestion'
            ]
          },
          optionB: {
            foods: '1 yaourt grec 0% + 1 cuillère à soupe de graines de chia', 
            calories: 140,
            macros: { protein: 18, carbs: 8, fats: 6, fiber: 7 },
            benefits: [
              'Protéines pour la récupération',
              'Oméga-3 pour réduire l\'inflammation',
              'Fibres pour la digestion'
            ]
          }
        }
      },
      { 
        name: 'Déjeuner', 
        options: {
          optionA: {
            foods: '150g poulet + brocoli + 50g riz', 
            calories: 500,
            macros: { protein: 40, carbs: 45, fats: 12, fiber: 8 },
            benefits: [
              'Protéines maigres pour la définition',
              'Vitamine C pour le système immunitaire',
              'Fibres pour la satiété'
            ]
          },
          optionB: {
            foods: '120g blanc de dinde + courgettes grillées + 40g quinoa', 
            calories: 480,
            macros: { protein: 38, carbs: 40, fats: 15, fiber: 7 },
            benefits: [
              'Protéines maigres pour la définition',
              'Glucides complexes pour l\'énergie',
              'Fibres pour la digestion'
            ]
          }
        }
      },
      { 
        name: 'Post-training', 
        options: {
          optionA: {
            foods: 'BCAA ou whey', 
            calories: 120,
            macros: { protein: 25, carbs: 2, fats: 0, fiber: 0 },
            benefits: [
              'BCAA pour la récupération musculaire',
              'Prévention du catabolisme musculaire'
            ]
          },
          optionB: {
            foods: 'Shake protéiné + 1 cuillère de miel', 
            calories: 150,
            macros: { protein: 25, carbs: 15, fats: 1, fiber: 0 },
            benefits: [
              'Protéines pour la récupération musculaire',
              'Glucides pour restaurer le glycogène',
              'Récupération rapide après l\'entraînement'
            ]
          }
        }
      },
      { 
        name: 'Dîner', 
        options: {
          optionA: {
            foods: '200g cabillaud + salade + 100g patate douce', 
            calories: 480,
            macros: { protein: 35, carbs: 50, fats: 10, fiber: 6 },
            benefits: [
              'Protéines maigres pour la définition',
              'Oméga-3 pour la récupération',
              'Vitamines pour la santé globale'
            ]
          },
          optionB: {
            foods: '180g colin + haricots verts + 100g patate douce', 
            calories: 460,
            macros: { protein: 38, carbs: 45, fats: 8, fiber: 8 },
            benefits: [
              'Protéines maigres pour la définition',
              'Glucides complexes pour l\'énergie',
              'Fibres pour la digestion'
            ]
          }
        }
      },
      { 
        name: 'Avant coucher', 
        options: {
          optionA: {
            foods: '150g fromage blanc 0% + cannelle', 
            calories: 200,
            macros: { protein: 25, carbs: 15, fats: 0, fiber: 0 },
            benefits: [
              'Protéines lentes pour la nuit',
              'Cannelle pour la régulation glycémique',
              'Faible en calories pour la définition'
            ]
          },
          optionB: {
            foods: '1 scoop de caséine + 10g beurre de cacahuète', 
            calories: 180,
            macros: { protein: 24, carbs: 5, fats: 8, fiber: 2 },
            benefits: [
              'Protéines à libération lente pour la nuit',
              'Graisses saines pour les hormones',
              'Faible en glucides pour la définition'
            ]
          }
        }
      }
    ]
  }
};

// Macro data per phase
const macroDataBase: { [phase: number]: MacroData } = {
  1: { protein: 180, carbs: 250, fats: 70, fiber: 35 },
  2: { protein: 190, carbs: 220, fats: 65, fiber: 35 },
  3: { protein: 200, carbs: 180, fats: 60, fiber: 35 }
};

// Workout data
const workoutDataBase: { [phase: number]: { [day: number]: Exercise[] } } = {
  1: {
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
    3: [ // Jeudi - Pull
      { name: 'Rowing barre', details: '4 séries × 6 reps • Repos 2-3 min' },
      { name: 'Tractions', details: '3 séries × 8 reps • Repos 2 min' },
      { name: 'Tirage horizontal', details: '3 séries × 12 reps • Repos 1.5 min' },
      { name: 'Face pulls', details: '3 séries × 15 reps • Repos 1 min' },
      { name: 'Curl barre', details: '3 séries × 10 reps • Repos 1.5 min' },
      { name: 'Curl marteau', details: '3 séries × 12 reps • Repos 1 min' }
    ],
    4: [ // Vendredi - Legs
      { name: 'Presse à cuisses', details: '4 séries × 12 reps • Repos 1.5 min' },
      { name: 'Fentes marchées', details: '3 séries × 10/jambe • Repos 1.5 min' },
      { name: 'RDL', details: '3 séries × 10-12 reps • Repos 2 min' },
      { name: 'Leg extension', details: '3 séries × 15 reps • Repos 1 min' },
      { name: 'Leg curl assis', details: '3 séries × 15 reps • Repos 1 min' },
      { name: 'Mollets debout', details: '4 séries × 12-15 reps • Repos 1 min' }
    ],
    5: [ // Samedi - HIIT
      { name: 'Échauffement vélo', details: '5 minutes intensité modérée' },
      { name: 'Sprint vélo', details: '8 × 30 sec sprint / 90 sec repos' },
      { name: 'Box jumps', details: '3 séries × 10 reps • Repos 1 min' },
      { name: 'Battle ropes', details: '3 séries × 30 sec • Repos 1 min' },
      { name: 'Burpees', details: '3 séries × 15 reps • Repos 1.5 min' },
      { name: 'Retour au calme', details: '5 minutes marche légère' }
    ],
    6: [] // Dimanche - Repos
  },
  2: {
    0: [ // Lundi - Push Power
      { name: 'Développé incliné', details: '4 séries × 8 reps • Repos 2 min' },
      { name: 'Développé couché haltères', details: '3 séries × 10 reps • Repos 1.5 min' },
      { name: 'Écartés machine', details: '3 séries × 12 reps • Repos 1.5 min' },
      { name: 'Développé Arnold', details: '3 séries × 12 reps • Repos 1.5 min' },
      { name: 'Superset latérales + oiseau', details: '3 séries × 12+12 reps • Repos 1 min' },
      { name: 'Dips + Extensions', details: '3 séries × max+15 reps • Repos 1.5 min' }
    ],
    1: [ // Mardi - Pull Volume
      { name: 'Traction pronation', details: '4 séries × 8 reps • Repos 2 min' },
      { name: 'Rowing T-bar', details: '4 séries × 10 reps • Repos 2 min' },
      { name: 'Tirage poitrine large', details: '3 séries × 12 reps • Repos 1.5 min' },
      { name: 'Rowing poulie basse', details: '3 séries × 12 reps • Repos 1.5 min' },
      { name: 'Superset Curl barre + incliné', details: '3 séries × 10+8 reps • Repos 1.5 min' },
      { name: 'Face pull', details: '3 séries × 15 reps • Repos 1 min' }
    ],
    2: [ // Mercredi - Cardio Intensifié
      { name: 'Échauffement', details: '5 min vélo/rameur progressif' },
      { name: 'Intervalles modérés', details: '6 × 3 min à 75% FCM / 2 min récup' },
      { name: 'Circuit abdos', details: '3 tours: 20 crunchs + 30s planche + 15 leg raises' },
      { name: 'Cardio continu', details: '15 min à 65% FCM' },
      { name: 'Étirements', details: '10 min stretching complet' }
    ],
    3: [ // Jeudi - Legs Force
      { name: 'Squat avant', details: '4 séries × 8 reps • Repos 2 min' },
      { name: 'Presse 45°', details: '4 séries × 12 reps • Repos 2 min' },
      { name: 'Fentes bulgares', details: '3 séries × 10/jambe • Repos 1.5 min' },
      { name: 'Leg extension', details: '3 séries × 15 reps • Repos 1 min' },
      { name: 'Leg curl', details: '4 séries × 10 reps • Repos 1.5 min' },
      { name: 'Mollets', details: '4 séries × 12 reps • Repos 1 min' }
    ],
    4: [ // Vendredi - Push Hypertrophie
      { name: 'Développé couché machine', details: '3 séries × 10 reps • Repos 1.5 min' },
      { name: 'Pompes lestées', details: '3 séries × max reps • Repos 1.5 min' },
      { name: 'Élévations latérales poulie', details: '3 séries × 12/côté • Repos 1 min' },
      { name: 'Oiseau inversé machine', details: '3 séries × 15 reps • Repos 1 min' },
      { name: 'Extension triceps overhead', details: '3 séries × 12-15 reps • Repos 1 min' },
      { name: 'Finisher: 21s triceps', details: '2 séries • Repos 1.5 min' }
    ],
    5: [ // Samedi - HIIT Plus
      { name: 'Échauffement dynamique', details: '5 min mouvements articulaires' },
      { name: 'Circuit 1', details: '4 tours: 10 burpees + 20 mountain climbers + 30 jumping jacks' },
      { name: 'Sprint tapis', details: '10 × 20 sec sprint / 40 sec repos' },
      { name: 'Circuit 2', details: '3 tours: 15 squat jumps + 10 pompes + 20 fentes sautées' },
      { name: 'Core finisher', details: '100 russian twists + 50 bicyclettes + 25 V-ups' },
      { name: 'Récupération', details: '10 min marche + étirements' }
    ],
    6: [] // Dimanche - Repos
  },
  3: {
    0: [ // Lundi - Upper Métabolique
      { 
        name: 'Triset: Développé couché haltères + Rowing haltères + Burpees', 
        details: '3 tours: 10 reps développé + 8 reps rowing + 10 burpees • Repos 2 min' 
      },
      { 
        name: 'Superset: Élévations latérales + Oiseau', 
        details: '3 séries: 12 reps élévations + 15 reps oiseau • Repos 1 min' 
      },
      { 
        name: 'Superset: Curl barre + Extensions triceps', 
        details: '3 séries: 10 reps curl + 15 reps extensions • Repos 1 min' 
      },
      { 
        name: 'Pompes à l\'échec', 
        details: '2 séries × max reps • Repos 1 min' 
      }
    ],
    1: [ // Mardi - Lower Circuit
      { 
        name: 'Circuit: Presse + Fentes + Jumps', 
        details: '3 tours: 15 reps presse + 10 reps fentes + 15 jumps • Repos 2 min' 
      },
      { 
        name: 'Soulevé sumo', 
        details: '3 séries × 8 reps • Repos 2 min' 
      },
      { 
        name: 'Superset: Leg curl + Hip thrust', 
        details: '3 séries: 12 reps leg curl + 15 reps hip thrust • Repos 1 min' 
      },
      { 
        name: 'Dropset mollets', 
        details: '3 séries: 20 reps poids moyen + échec poids léger • Repos 1 min' 
      },
      { 
        name: 'Crunch inversé', 
        details: '3 séries × 20 reps • Repos 30 sec' 
      }
    ],
    2: [ // Mercredi - Cardio Intense
      { name: 'Échauffement', details: '5 min progressif' },
      { name: 'HIIT vélo', details: '12 × 30 sec all-out / 30 sec repos' },
      { name: 'Circuit métabolique', details: '5 tours: 10 burpees + 20 box jumps + 30 battle ropes' },
      { name: 'Cardio steady', details: '20 min à 70% FCM' },
      { name: 'Abdos tabata', details: '8 × 20 sec travail / 10 sec repos' },
      { name: 'Cool down', details: '10 min étirements profonds' }
    ],
    3: [ // Jeudi - Full Body Force
      { name: 'Squat', details: '3 séries × 6 reps • Repos 2 min' },
      { name: 'Développé couché', details: '3 séries × 6 reps • Repos 2 min' },
      { name: 'Rowing barre', details: '3 séries × 8 reps • Repos 1.5 min' },
      { name: 'Développé militaire', details: '3 séries × 8 reps • Repos 1.5 min' },
      { name: 'RDL', details: '3 séries × 10 reps • Repos 1.5 min' },
      { name: 'Finisher: 50 burpees', details: 'Le plus vite possible' }
    ],
    4: [ // Vendredi - Épaules/Bras Détail
      { 
        name: 'Élévations latérales lourdes', 
        details: '4 séries × 10 reps • Repos 1.5 min' 
      },
      { 
        name: 'Oiseau poulie', 
        details: '4 séries × 12 reps • Repos 1 min' 
      },
      { 
        name: 'Développé militaire barre', 
        details: '3 séries × 6 reps • Repos 2 min' 
      },
      { 
        name: '21s biceps', 
        details: '3 séries (7 reps bas, 7 reps haut, 7 reps complet) • Repos 1.5 min' 
      },
      { 
        name: 'Dips triceps', 
        details: '3 séries × max reps • Repos 2 min' 
      },
      { 
        name: 'Dropset poulie triceps', 
        details: '2 séries: 12 reps poids moyen + échec poids léger • Repos 1 min' 
      }
    ],
    5: [ // Samedi - Circuit Total
      { name: 'Échauffement', details: '5 min mobilité dynamique' },
      { name: 'Circuit 1', details: '20 min AMRAP: 5 pull-ups + 10 pompes + 15 squats' },
      { name: 'Sprint intervalles', details: '8 × 100m sprint / 60 sec repos' },
      { name: 'Circuit 2', details: '4 tours: 20 thrusters + 15 burpees + 10 toes-to-bar' },
      { name: 'Finisher cardio', details: '1000m rameur le plus vite possible' },
      { name: 'Récupération', details: '15 min yoga/étirements' }
    ],
    6: [] // Dimanche - Repos
  }
};

const defaultUserData: UserData = {
  currentDay: 3,
  currentWeight: 102.5,
  bodyFat: 27,
  waterAmount: 1.5,
  startWeight: 106,
  startFat: 30,
  targetWeight: 90,
  targetFat: 15,
  completedExercises: {},
  dailyNotes: {},
  customExercises: {},
  customMeals: {},
  mealChoices: {},
  weightHistory: [],
  bodyFatHistory: []
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [currentDay, setCurrentDay] = useState(0);
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [adjustedNutritionData, setAdjustedNutritionData] = useState<any>({});
  const [adjustedMacroData, setAdjustedMacroData] = useState<any>({});

  // Load data on mount
  useEffect(() => {
    loadUserData();
  }, []);

  // Enhanced loadUserData function
  const loadUserData = useCallback(() => {
    const savedData = localStorage.getItem('fitnessTrackerData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setUserData(parsed);
        
        // Auto-select phase based on current day
        if (parsed.currentDay <= 30) {
          setCurrentPhase(1);
        } else if (parsed.currentDay <= 60) {
          setCurrentPhase(2);
        } else {
          setCurrentPhase(3);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
  }, []);

  // Enhanced saveData function
  const saveData = useCallback(async () => {
    try {
      localStorage.setItem('fitnessTrackerData', JSON.stringify(userData));
      console.log('SaveData: Data saved to localStorage', userData);
    } catch (error) {
      console.error('SaveData: Error saving user data:', error);
    }
  }, [userData]);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const selectMealOption = (mealIndex: number, option: string) => {
    const newMealChoices = { ...userData.mealChoices };
    if (!newMealChoices[currentPhase]) {
      newMealChoices[currentPhase] = {};
    }
    newMealChoices[currentPhase][mealIndex] = option;
    
    updateUserData({ mealChoices: newMealChoices });
  };

  const applyCustomSettings = useCallback(async (settings: {
    startWeight: number;
    startFat: number;
    targetWeight: number;
    targetFat: number;
  }) => {
    const { startWeight, startFat, targetWeight, targetFat } = settings;
    
    console.log('Context: Applying custom settings', settings);
    
    // Update userData
    const newUserData = {
      ...userData,
      startWeight,
      startFat,
      targetWeight,
      targetFat,
      currentWeight: startWeight, // Reset current weight to start weight
      bodyFat: startFat // Reset current body fat to start fat
    };
    
    // Update the state first
    setUserData(newUserData);
    
    // Calculate adjustment factor based on new start weight
    const REFERENCE_WEIGHT = 106;
    const adjustmentFactor = startWeight / REFERENCE_WEIGHT;
    
    // Adjust nutrition data
    const newAdjustedNutritionData: any = {};
    [1, 2, 3].forEach(phase => {
      if (nutritionDataBase[phase]) {
        newAdjustedNutritionData[phase] = JSON.parse(JSON.stringify(nutritionDataBase[phase]));
        newAdjustedNutritionData[phase].meals.forEach((meal: any) => {
          if (meal.options) {
            Object.values(meal.options).forEach((option: any) => {
              option.calories = Math.round(option.calories * adjustmentFactor);
              option.macros.protein = Math.round(option.macros.protein * adjustmentFactor);
              option.macros.carbs = Math.round(option.macros.carbs * adjustmentFactor);
              option.macros.fats = Math.round(option.macros.fats * adjustmentFactor);
              option.macros.fiber = Math.round(option.macros.fiber * adjustmentFactor);
            });
          }
        });
      }
    });
    
    // Adjust macro data
    const newAdjustedMacroData: any = {};
    [1, 2, 3].forEach(phase => {
      if (macroDataBase[phase]) {
        newAdjustedMacroData[phase] = JSON.parse(JSON.stringify(macroDataBase[phase]));
        Object.keys(newAdjustedMacroData[phase]).forEach(key => {
          newAdjustedMacroData[phase][key] = Math.round(newAdjustedMacroData[phase][key] * adjustmentFactor);
        });
      }
    });
    
    setAdjustedNutritionData(newAdjustedNutritionData);
    setAdjustedMacroData(newAdjustedMacroData);
    
    // Save to localStorage immediately
    try {
      localStorage.setItem('fitnessTrackerData', JSON.stringify(newUserData));
      console.log('Context: Data saved to localStorage');
    } catch (error) {
      console.error('Context: Error saving to localStorage:', error);
    }
  }, [userData]);

  // Apply custom settings after loading if needed
  useEffect(() => {
    if (userData.startWeight !== 106 && userData.startWeight !== defaultUserData.startWeight) {
      // Only apply if we haven't already applied custom settings
      console.log('Auto-applying custom settings on load');
      const hasCustomSettings = Object.keys(adjustedNutritionData).length > 0;
      if (!hasCustomSettings) {
        applyCustomSettings({
          startWeight: userData.startWeight,
          startFat: userData.startFat,
          targetWeight: userData.targetWeight,
          targetFat: userData.targetFat
        });
      }
    }
  }, [userData.startWeight, userData.startFat, userData.targetWeight, userData.targetFat]);

  const getCurrentMacros = (): MacroData => {
    const REFERENCE_WEIGHT = 106;
    const adjustmentFactor = userData.startWeight / REFERENCE_WEIGHT;
    
    // Use adjusted macros if available, otherwise calculate from base
    if (Object.keys(adjustedMacroData).length > 0 && adjustedMacroData[currentPhase]) {
      return adjustedMacroData[currentPhase];
    }
    
    const baseMacros = macroDataBase[currentPhase] || macroDataBase[1];
    
    return {
      protein: Math.round(baseMacros.protein * adjustmentFactor),
      carbs: Math.round(baseMacros.carbs * adjustmentFactor),
      fats: Math.round(baseMacros.fats * adjustmentFactor),
      fiber: Math.round(baseMacros.fiber * adjustmentFactor)
    };
  };

  const getCurrentMeals = (): Meal[] => {
    const REFERENCE_WEIGHT = 106;
    const adjustmentFactor = userData.startWeight / REFERENCE_WEIGHT;
    
    // Use adjusted nutrition data if available
    let baseMeals;
    if (Object.keys(adjustedNutritionData).length > 0 && adjustedNutritionData[currentPhase]) {
      baseMeals = adjustedNutritionData[currentPhase].meals;
    } else {
      baseMeals = nutritionDataBase[currentPhase]?.meals || nutritionDataBase[1].meals;
      
      // Adjust calories and macros based on user's weight
      baseMeals = baseMeals.map((meal: any) => {
        if (meal.options) {
          const adjustedOptions: Record<string, MealOption> = {};
          Object.entries(meal.options).forEach(([key, option]: [string, any]) => {
            adjustedOptions[key] = {
              ...option,
              calories: Math.round(option.calories * adjustmentFactor),
              macros: {
                protein: Math.round(option.macros.protein * adjustmentFactor),
                carbs: Math.round(option.macros.carbs * adjustmentFactor),
                fats: Math.round(option.macros.fats * adjustmentFactor),
                fiber: Math.round(option.macros.fiber * adjustmentFactor)
              }
            };
          });
          return { ...meal, options: adjustedOptions };
        }
        return meal;
      });
    }

    // Add custom meals for this phase
    if (userData.customMeals[currentPhase]) {
      return [...baseMeals, ...userData.customMeals[currentPhase]];
    }

    return baseMeals;
  };

  const getCurrentExercises = (): Exercise[] => {
    const baseExercises = workoutDataBase[currentPhase]?.[currentDay] || [];
    
    // Add custom exercises for this phase and day
    if (userData.customExercises[currentPhase]?.[currentDay]) {
      return [...baseExercises, ...userData.customExercises[currentPhase][currentDay]];
    }

    return baseExercises;
  };

  const getCurrentCalories = (): number => {
    const macros = getCurrentMacros();
    return macros.protein * 4 + macros.carbs * 4 + macros.fats * 9;
  };

  // // Auto-save when userData changes
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     saveData();
  //   }, 30000);

  //   return () => clearInterval(interval);
  // }, [saveData]);

  // Supabase sync functions
  const syncToSupabase = useCallback(async () => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Sync to user_progress table
      const { error: progressError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          current_day: userData.currentDay,
          current_weight: userData.currentWeight,
          body_fat: userData.bodyFat,
          start_weight: userData.startWeight,
          start_fat: userData.startFat,
          target_weight: userData.targetWeight,
          target_fat: userData.targetFat,
          water_intake: userData.waterAmount ? { [new Date().toISOString().split('T')[0]]: userData.waterAmount } : {}
        });
      
      if (progressError) throw progressError;

      // Sync daily notes
      for (const [day, note] of Object.entries(userData.dailyNotes)) {
        if (note.trim()) {
          await supabase
            .from('daily_notes')
            .upsert({
              user_id: user.id,
              day_number: parseInt(day),
              note: note
            });
        }
      }

      // Sync completed exercises
      for (const [key, completed] of Object.entries(userData.completedExercises)) {
        if (completed) {
          const [phase, dayNum, exerciseIndex] = key.split('_').map(Number);
          await supabase
            .from('completed_exercises')
            .upsert({
              user_id: user.id,
              phase,
              day_number: dayNum,
              exercise_index: exerciseIndex,
              exercise_name: `Exercise ${exerciseIndex}`,
              completed: true,
              completed_at: new Date().toISOString()
            });
        }
      }

      // Sync meal choices
      for (const [phase, choices] of Object.entries(userData.mealChoices)) {
        for (const [mealIndex, choice] of Object.entries(choices as Record<string, string>)) {
          await supabase
            .from('meal_choices')
            .upsert({
              user_id: user.id,
              phase: parseInt(phase),
              meal_index: parseInt(mealIndex),
              meal_name: `Meal ${mealIndex}`,
              chosen_option: choice
            });
        }
      }

      // Sync weight and body fat history
      if (userData.weightHistory?.length > 0) {
        for (const entry of userData.weightHistory) {
          await supabase
            .from('metrics_history')
            .upsert({
              user_id: user.id,
              metric_type: 'weight',
              metric_value: entry.value,
              metric_date: new Date(entry.date).toISOString().split('T')[0]
            });
        }
      }

      if (userData.bodyFatHistory?.length > 0) {
        for (const entry of userData.bodyFatHistory) {
          await supabase
            .from('metrics_history')
            .upsert({
              user_id: user.id,
              metric_type: 'body_fat',
              metric_value: entry.value,
              metric_date: new Date(entry.date).toISOString().split('T')[0]
            });
        }
      }

    } catch (error) {
      console.error('Error syncing to Supabase:', error);
    }
  }, [userData]);

  const syncFromSupabase = useCallback(async () => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Get all user data with the helper function
      const { data: allData, error } = await supabase.rpc('get_user_complete_data', { 
        p_user_id: user.id 
      });

      if (error) throw error;
      if (!allData) return;

      // Transform Supabase data to userData format
      const newUserData: UserData = {
        currentDay: allData.progress?.current_day || defaultUserData.currentDay,
        currentWeight: allData.progress?.current_weight || defaultUserData.currentWeight,
        bodyFat: allData.progress?.body_fat || defaultUserData.bodyFat,
        waterAmount: Object.values(allData.progress?.water_intake || {})[0] as number || defaultUserData.waterAmount,
        startWeight: allData.progress?.start_weight || defaultUserData.startWeight,
        startFat: allData.progress?.start_fat || defaultUserData.startFat,
        targetWeight: allData.progress?.target_weight || defaultUserData.targetWeight,
        targetFat: allData.progress?.target_fat || defaultUserData.targetFat,
        completedExercises: transformCompletedExercises(allData.completed_exercises || {}),
        dailyNotes: allData.daily_notes || {},
        customExercises: allData.custom_exercises || {},
        customMeals: allData.custom_meals || {},
        mealChoices: allData.meal_choices || {},
        weightHistory: allData.weight_history || [],
        bodyFatHistory: allData.body_fat_history || []
      };

      setUserData(newUserData);
      
      // Apply custom settings if they differ from defaults
      if (newUserData.startWeight !== 106) {
        applyCustomSettings({
          startWeight: newUserData.startWeight,
          startFat: newUserData.startFat,
          targetWeight: newUserData.targetWeight,
          targetFat: newUserData.targetFat
        });
      }

    } catch (error) {
      console.error('Error syncing from Supabase:', error);
    }
  }, [applyCustomSettings]);

  // Helper function to transform completed exercises
  const transformCompletedExercises = (exercises: any): { [key: string]: boolean } => {
    const result: { [key: string]: boolean } = {};
    Object.entries(exercises).forEach(([key, value]: [string, any]) => {
      result[key] = value.completed;
    });
    return result;
  };

  const contextValue: AppContextType = {
    currentPhase,
    currentDay,
    userData,
    setCurrentPhase,
    setCurrentDay,
    updateUserData,
    getCurrentMacros,
    getCurrentMeals,
    getCurrentExercises,
    getCurrentCalories,
    selectMealOption,
    applyCustomSettings,
    saveData,
    loadUserData,
    syncToSupabase,
    syncFromSupabase
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 