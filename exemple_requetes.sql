-- ============================================
-- EXEMPLES DE REQUÊTES POUR ROAD TO SUPERMAN
-- ============================================

-- 1. INITIALISER UN NOUVEL UTILISATEUR
-- Appeler cette fonction après la création d'un compte
SELECT public.initialize_user_data('user-uuid-here', 106.0, 30.0, 90.0, 15.0);

-- 2. RÉCUPÉRER LES DONNÉES DE PROGRESSION D'UN UTILISATEUR
SELECT * FROM public.user_progress WHERE user_id = auth.uid();

-- 3. METTRE À JOUR LE JOUR ACTUEL
UPDATE public.user_progress 
SET current_day = 15 
WHERE user_id = auth.uid();

-- 4. METTRE À JOUR LE POIDS ACTUEL ET L'AJOUTER À L'HISTORIQUE
-- D'abord, mettre à jour le poids actuel
UPDATE public.user_progress 
SET current_weight = 103.2 
WHERE user_id = auth.uid();

-- Puis ajouter à l'historique
INSERT INTO public.weight_history (user_id, weight_value, recorded_date)
VALUES (auth.uid(), 103.2, CURRENT_DATE)
ON CONFLICT DO NOTHING;

-- 5. RÉCUPÉRER L'HISTORIQUE DE POIDS (10 dernières entrées)
SELECT weight_value, recorded_date, created_at
FROM public.weight_history 
WHERE user_id = auth.uid()
ORDER BY recorded_date DESC, created_at DESC
LIMIT 10;

-- 6. SAUVEGARDER/METTRE À JOUR UNE NOTE QUOTIDIENNE
INSERT INTO public.daily_notes (user_id, day_number, note_content)
VALUES (auth.uid(), 15, 'Excellente séance aujourd''hui ! J''ai réussi à augmenter les poids.')
ON CONFLICT (user_id, day_number) 
DO UPDATE SET 
  note_content = EXCLUDED.note_content,
  updated_at = now();

-- 7. RÉCUPÉRER LES NOTES D'UN JOUR SPÉCIFIQUE
SELECT note_content, updated_at
FROM public.daily_notes 
WHERE user_id = auth.uid() AND day_number = 15;

-- 8. MARQUER UN EXERCICE COMME COMPLÉTÉ
INSERT INTO public.completed_exercises (user_id, exercise_key, is_completed, completed_date)
VALUES (auth.uid(), '1_0_0', true, CURRENT_DATE)
ON CONFLICT (user_id, exercise_key) 
DO UPDATE SET 
  is_completed = EXCLUDED.is_completed,
  completed_date = EXCLUDED.completed_date,
  updated_at = now();

-- 9. RÉCUPÉRER LES EXERCICES COMPLÉTÉS POUR UNE PHASE/JOUR
SELECT exercise_key, is_completed, completed_date
FROM public.completed_exercises 
WHERE user_id = auth.uid() 
  AND exercise_key LIKE '1_0_%'; -- Phase 1, Jour 0 (Lundi)

-- 10. AJOUTER UN EXERCICE PERSONNALISÉ
INSERT INTO public.custom_exercises (
  user_id, phase_number, day_number, exercise_name, exercise_details, sort_order
)
VALUES (
  auth.uid(), 1, 0, 'Développé incliné haltères', '4 séries × 8 reps • Repos 2 min', 10
);

-- 11. RÉCUPÉRER LES EXERCICES PERSONNALISÉS POUR UNE PHASE/JOUR
SELECT exercise_name, exercise_details, sort_order, created_at
FROM public.custom_exercises 
WHERE user_id = auth.uid() 
  AND phase_number = 1 
  AND day_number = 0
ORDER BY sort_order, created_at;

-- 12. AJOUTER UN REPAS PERSONNALISÉ
INSERT INTO public.custom_meals (
  user_id, phase_number, meal_name, foods, calories, 
  protein_grams, carbs_grams, fats_grams, fiber_grams, benefits
)
VALUES (
  auth.uid(), 1, 'Smoothie protéiné', 
  '30g whey + 1 banane + 200ml lait d''amande + 1 cuillère miel',
  320, 28.5, 35.2, 4.8, 3.2,
  '["Protéines rapides pour la récupération", "Potassium pour les muscles", "Goût délicieux"]'::jsonb
);

-- 13. RÉCUPÉRER LES REPAS PERSONNALISÉS POUR UNE PHASE
SELECT meal_name, foods, calories, protein_grams, carbs_grams, fats_grams, fiber_grams, benefits
FROM public.custom_meals 
WHERE user_id = auth.uid() AND phase_number = 1
ORDER BY sort_order, created_at;

-- 14. ENREGISTRER UN CHOIX DE REPAS
INSERT INTO public.meal_choices (user_id, phase_number, meal_index, selected_option)
VALUES (auth.uid(), 1, 0, 'optionB')
ON CONFLICT (user_id, phase_number, meal_index) 
DO UPDATE SET 
  selected_option = EXCLUDED.selected_option,
  updated_at = now();

-- 15. RÉCUPÉRER TOUS LES CHOIX DE REPAS POUR UNE PHASE
SELECT meal_index, selected_option
FROM public.meal_choices 
WHERE user_id = auth.uid() AND phase_number = 1
ORDER BY meal_index;

-- 16. ENREGISTRER LA CONSOMMATION D'EAU QUOTIDIENNE
INSERT INTO public.daily_water_intake (user_id, intake_date, water_amount)
VALUES (auth.uid(), CURRENT_DATE, 2.5)
ON CONFLICT (user_id, intake_date) 
DO UPDATE SET 
  water_amount = EXCLUDED.water_amount,
  updated_at = now();

-- 17. RÉCUPÉRER LA CONSOMMATION D'EAU D'AUJOURD'HUI
SELECT water_amount, updated_at
FROM public.daily_water_intake 
WHERE user_id = auth.uid() AND intake_date = CURRENT_DATE;

-- 18. OBTENIR LES STATISTIQUES DE PROGRESSION (utilise la fonction)
SELECT * FROM public.get_user_progress_stats(auth.uid());

-- 19. RÉCUPÉRER TOUTES LES DONNÉES UTILISATEUR (pour l'export ou la synchronisation)
SELECT 
  -- Données de progression
  up.current_day, up.current_weight, up.body_fat, up.water_amount,
  up.start_weight, up.start_fat, up.target_weight, up.target_fat,
  
  -- Historiques (en JSON)
  (
    SELECT json_agg(json_build_object('date', recorded_date, 'value', weight_value))
    FROM public.weight_history 
    WHERE user_id = auth.uid()
    ORDER BY recorded_date DESC
  ) as weight_history,
  
  (
    SELECT json_agg(json_build_object('date', recorded_date, 'value', body_fat_value))
    FROM public.body_fat_history 
    WHERE user_id = auth.uid()
    ORDER BY recorded_date DESC
  ) as body_fat_history,
  
  -- Notes quotidiennes
  (
    SELECT json_object_agg(day_number::text, note_content)
    FROM public.daily_notes 
    WHERE user_id = auth.uid()
  ) as daily_notes,
  
  -- Exercices complétés
  (
    SELECT json_object_agg(exercise_key, json_build_object('completed', is_completed, 'date', completed_date))
    FROM public.completed_exercises 
    WHERE user_id = auth.uid()
  ) as completed_exercises

FROM public.user_progress up
WHERE up.user_id = auth.uid();

-- 20. SUPPRIMER TOUTES LES DONNÉES D'UN UTILISATEUR (pour le GDPR)
-- ATTENTION: Cette requête supprime TOUTES les données de l'utilisateur !
-- DELETE FROM public.user_progress WHERE user_id = auth.uid();
-- (Les autres tables seront supprimées automatiquement via CASCADE)

-- 21. REQUÊTE POUR OBTENIR LE RÉSUMÉ HEBDOMADAIRE
SELECT 
  EXTRACT(WEEK FROM completed_date) as week_number,
  COUNT(*) as exercises_completed,
  COUNT(DISTINCT DATE(completed_date)) as active_days
FROM public.completed_exercises 
WHERE user_id = auth.uid() 
  AND is_completed = true 
  AND completed_date >= CURRENT_DATE - INTERVAL '4 weeks'
GROUP BY EXTRACT(WEEK FROM completed_date)
ORDER BY week_number DESC;

-- 22. REQUÊTE POUR LA PROGRESSION MENSUELLE DU POIDS
SELECT 
  DATE_TRUNC('month', recorded_date) as month,
  AVG(weight_value) as avg_weight,
  MIN(weight_value) as min_weight,
  MAX(weight_value) as max_weight,
  COUNT(*) as measurements_count
FROM public.weight_history 
WHERE user_id = auth.uid()
GROUP BY DATE_TRUNC('month', recorded_date)
ORDER BY month DESC; 