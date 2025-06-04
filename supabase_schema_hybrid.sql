-- ============================================
-- SCHÉMA HYBRIDE OPTIMISÉ - ROAD TO SUPERMAN
-- Approche équilibrée : Tables séparées + JSONB intelligent
-- ============================================

-- ============================================
-- 1. TABLE PRINCIPALE - Données utilisateur de base
-- ============================================
CREATE TABLE public.user_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  
  -- Progression actuelle
  current_day integer NOT NULL DEFAULT 1 CHECK (current_day >= 1 AND current_day <= 90),
  current_weight decimal(5,2) NOT NULL CHECK (current_weight > 0),
  body_fat decimal(4,2) NOT NULL CHECK (body_fat >= 0 AND body_fat <= 100),
  
  -- Objectifs initiaux (immutables)
  start_weight decimal(5,2) NOT NULL CHECK (start_weight > 0),
  start_fat decimal(4,2) NOT NULL CHECK (start_fat >= 0 AND start_fat <= 100),
  target_weight decimal(5,2) NOT NULL CHECK (target_weight > 0),
  target_fat decimal(4,2) NOT NULL CHECK (target_fat >= 0 AND target_fat <= 100),
  
  -- Données simples en JSONB (consommation d'eau par date)
  water_intake jsonb DEFAULT '{}'::jsonb,
  
  CONSTRAINT user_progress_pkey PRIMARY KEY (id),
  CONSTRAINT user_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT user_progress_user_id_unique UNIQUE (user_id)
);

-- ============================================
-- 2. NOTES QUOTIDIENNES
-- ============================================
CREATE TABLE public.daily_notes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  day_number integer NOT NULL CHECK (day_number >= 1 AND day_number <= 90),
  note text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  
  CONSTRAINT daily_notes_pkey PRIMARY KEY (id),
  CONSTRAINT daily_notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT daily_notes_user_day_unique UNIQUE (user_id, day_number)
);

-- ============================================
-- 3. EXERCICES COMPLÉTÉS
-- ============================================
CREATE TABLE public.completed_exercises (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  phase integer NOT NULL CHECK (phase >= 1 AND phase <= 3),
  day_number integer NOT NULL CHECK (day_number >= 0 AND day_number <= 6),
  exercise_index integer NOT NULL CHECK (exercise_index >= 0),
  exercise_name text NOT NULL,
  completed boolean NOT NULL DEFAULT false,
  completed_at timestamp with time zone,
  sets_completed integer DEFAULT 0,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  
  CONSTRAINT completed_exercises_pkey PRIMARY KEY (id),
  CONSTRAINT completed_exercises_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT completed_exercises_unique UNIQUE (user_id, phase, day_number, exercise_index)
);

-- ============================================
-- 4. CHOIX DE REPAS
-- ============================================
CREATE TABLE public.meal_choices (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  phase integer NOT NULL CHECK (phase >= 1 AND phase <= 3),
  meal_index integer NOT NULL CHECK (meal_index >= 0),
  meal_name text NOT NULL,
  chosen_option text NOT NULL, -- 'optionA', 'optionB', etc.
  selected_at timestamp with time zone NOT NULL DEFAULT now(),
  
  CONSTRAINT meal_choices_pkey PRIMARY KEY (id),
  CONSTRAINT meal_choices_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT meal_choices_unique UNIQUE (user_id, phase, meal_index)
);

-- ============================================
-- 5. HISTORIQUE DES MÉTRIQUES
-- ============================================
CREATE TABLE public.metrics_history (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  metric_type text NOT NULL CHECK (metric_type IN ('weight', 'body_fat', 'measurement')),
  metric_value decimal(6,2) NOT NULL,
  metric_date date NOT NULL DEFAULT CURRENT_DATE,
  body_part text, -- Pour les mesures corporelles (biceps, tour de taille, etc.)
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  
  CONSTRAINT metrics_history_pkey PRIMARY KEY (id),
  CONSTRAINT metrics_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- ============================================
-- 6. EXERCICES PERSONNALISÉS (JSONB pour flexibilité)
-- ============================================
CREATE TABLE public.custom_exercises (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  phase integer NOT NULL CHECK (phase >= 1 AND phase <= 3),
  day_number integer NOT NULL CHECK (day_number >= 0 AND day_number <= 6),
  exercises jsonb NOT NULL DEFAULT '[]'::jsonb, -- Array d'exercices personnalisés
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  
  CONSTRAINT custom_exercises_pkey PRIMARY KEY (id),
  CONSTRAINT custom_exercises_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT custom_exercises_unique UNIQUE (user_id, phase, day_number)
);

-- ============================================
-- 7. REPAS PERSONNALISÉS (JSONB pour flexibilité)
-- ============================================
CREATE TABLE public.custom_meals (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  phase integer NOT NULL CHECK (phase >= 1 AND phase <= 3),
  meals jsonb NOT NULL DEFAULT '[]'::jsonb, -- Array de repas personnalisés
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  
  CONSTRAINT custom_meals_pkey PRIMARY KEY (id),
  CONSTRAINT custom_meals_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT custom_meals_unique UNIQUE (user_id, phase)
);

-- ============================================
-- INDEX OPTIMISÉS
-- ============================================

-- Index principaux pour les requêtes fréquentes
CREATE INDEX idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX idx_daily_notes_user_day ON public.daily_notes(user_id, day_number);
CREATE INDEX idx_completed_exercises_user_phase_day ON public.completed_exercises(user_id, phase, day_number);
CREATE INDEX idx_meal_choices_user_phase ON public.meal_choices(user_id, phase);
CREATE INDEX idx_metrics_history_user_type_date ON public.metrics_history(user_id, metric_type, metric_date DESC);
CREATE INDEX idx_custom_exercises_user_phase_day ON public.custom_exercises(user_id, phase, day_number);
CREATE INDEX idx_custom_meals_user_phase ON public.custom_meals(user_id, phase);

-- Index GIN pour les requêtes JSONB
CREATE INDEX idx_user_progress_water_intake_gin ON public.user_progress USING GIN (water_intake);
CREATE INDEX idx_custom_exercises_exercises_gin ON public.custom_exercises USING GIN (exercises);
CREATE INDEX idx_custom_meals_meals_gin ON public.custom_meals USING GIN (meals);

-- Index pour les recherches textuelles
CREATE INDEX idx_daily_notes_note_gin ON public.daily_notes USING GIN (to_tsvector('french', note));
CREATE INDEX idx_completed_exercises_name_gin ON public.completed_exercises USING GIN (to_tsvector('french', exercise_name));

-- ============================================
-- TRIGGERS POUR UPDATED_AT
-- ============================================

CREATE TRIGGER handle_updated_at_user_progress 
  BEFORE UPDATE ON public.user_progress 
  FOR EACH ROW EXECUTE FUNCTION extensions.moddatetime('updated_at');

CREATE TRIGGER handle_updated_at_daily_notes 
  BEFORE UPDATE ON public.daily_notes 
  FOR EACH ROW EXECUTE FUNCTION extensions.moddatetime('updated_at');

CREATE TRIGGER handle_updated_at_completed_exercises 
  BEFORE UPDATE ON public.completed_exercises 
  FOR EACH ROW EXECUTE FUNCTION extensions.moddatetime('updated_at');

CREATE TRIGGER handle_updated_at_custom_exercises 
  BEFORE UPDATE ON public.custom_exercises 
  FOR EACH ROW EXECUTE FUNCTION extensions.moddatetime('updated_at');

CREATE TRIGGER handle_updated_at_custom_meals 
  BEFORE UPDATE ON public.custom_meals 
  FOR EACH ROW EXECUTE FUNCTION extensions.moddatetime('updated_at');

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Activer RLS sur toutes les tables
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.completed_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_choices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metrics_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_meals ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLICIES RLS
-- ============================================

-- user_progress
CREATE POLICY "Users can manage own progress" ON public.user_progress 
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- daily_notes
CREATE POLICY "Users can manage own daily notes" ON public.daily_notes 
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- completed_exercises
CREATE POLICY "Users can manage own completed exercises" ON public.completed_exercises 
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- meal_choices
CREATE POLICY "Users can manage own meal choices" ON public.meal_choices 
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- metrics_history
CREATE POLICY "Users can manage own metrics history" ON public.metrics_history 
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- custom_exercises
CREATE POLICY "Users can manage own custom exercises" ON public.custom_exercises 
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- custom_meals
CREATE POLICY "Users can manage own custom meals" ON public.custom_meals 
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ============================================
-- FONCTIONS UTILITAIRES
-- ============================================

-- 1. Initialisation utilisateur
CREATE OR REPLACE FUNCTION public.initialize_user_fitness(
  p_user_id uuid,
  p_start_weight decimal DEFAULT 106,
  p_start_fat decimal DEFAULT 30,
  p_target_weight decimal DEFAULT 90,
  p_target_fat decimal DEFAULT 15
)
RETURNS boolean AS $$
DECLARE
  today_str text := to_char(CURRENT_DATE, 'YYYY-MM-DD');
BEGIN
  -- Insérer les données principales
  INSERT INTO public.user_progress (
    user_id, current_weight, body_fat,
    start_weight, start_fat, target_weight, target_fat,
    water_intake
  ) VALUES (
    p_user_id, p_start_weight, p_start_fat,
    p_start_weight, p_start_fat, p_target_weight, p_target_fat,
    json_build_object(today_str, 0)::jsonb
  ) ON CONFLICT (user_id) DO NOTHING;
  
  -- Ajouter les métriques initiales
  INSERT INTO public.metrics_history (user_id, metric_type, metric_value, metric_date)
  VALUES 
    (p_user_id, 'weight', p_start_weight, CURRENT_DATE),
    (p_user_id, 'body_fat', p_start_fat, CURRENT_DATE)
  ON CONFLICT DO NOTHING;
  
  RETURN true;
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Mise à jour métrique avec historique
CREATE OR REPLACE FUNCTION public.update_user_metric(
  p_user_id uuid,
  p_metric_type text,
  p_value decimal,
  p_date date DEFAULT CURRENT_DATE,
  p_notes text DEFAULT NULL
)
RETURNS boolean AS $$
BEGIN
  -- Mettre à jour la valeur actuelle
  IF p_metric_type = 'weight' THEN
    UPDATE public.user_progress 
    SET current_weight = p_value, updated_at = now()
    WHERE user_id = p_user_id;
  ELSIF p_metric_type = 'body_fat' THEN
    UPDATE public.user_progress 
    SET body_fat = p_value, updated_at = now()
    WHERE user_id = p_user_id;
  END IF;
  
  -- Ajouter à l'historique
  INSERT INTO public.metrics_history (user_id, metric_type, metric_value, metric_date, notes)
  VALUES (p_user_id, p_metric_type, p_value, p_date, p_notes)
  ON CONFLICT DO NOTHING;
  
  RETURN true;
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Marquer exercice comme complété
CREATE OR REPLACE FUNCTION public.complete_exercise(
  p_user_id uuid,
  p_phase integer,
  p_day_number integer,
  p_exercise_index integer,
  p_exercise_name text,
  p_sets_completed integer DEFAULT NULL,
  p_notes text DEFAULT NULL
)
RETURNS boolean AS $$
BEGIN
  INSERT INTO public.completed_exercises (
    user_id, phase, day_number, exercise_index, exercise_name,
    completed, completed_at, sets_completed, notes
  ) VALUES (
    p_user_id, p_phase, p_day_number, p_exercise_index, p_exercise_name,
    true, now(), p_sets_completed, p_notes
  ) 
  ON CONFLICT (user_id, phase, day_number, exercise_index) 
  DO UPDATE SET 
    completed = true,
    completed_at = now(),
    sets_completed = COALESCE(p_sets_completed, completed_exercises.sets_completed),
    notes = COALESCE(p_notes, completed_exercises.notes),
    updated_at = now();
  
  RETURN true;
EXCEPTION
  WHEN OTHERS THEN
    RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Fonction pour récupérer toutes les données utilisateur
CREATE OR REPLACE FUNCTION public.get_user_complete_data(p_user_id uuid)
RETURNS json AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'progress', (
      SELECT json_build_object(
        'current_day', current_day,
        'current_weight', current_weight,
        'body_fat', body_fat,
        'start_weight', start_weight,
        'start_fat', start_fat,
        'target_weight', target_weight,
        'target_fat', target_fat,
        'water_intake', water_intake,
        'updated_at', updated_at
      )
      FROM public.user_progress 
      WHERE user_id = p_user_id
    ),
    'daily_notes', (
      SELECT json_object_agg(day_number::text, note)
      FROM public.daily_notes 
      WHERE user_id = p_user_id
    ),
    'completed_exercises', (
      SELECT json_object_agg(
        phase || '_' || day_number || '_' || exercise_index,
        json_build_object(
          'completed', completed,
          'completed_at', completed_at,
          'sets_completed', sets_completed,
          'notes', notes
        )
      )
      FROM public.completed_exercises 
      WHERE user_id = p_user_id
    ),
    'meal_choices', (
      SELECT json_object_agg(
        phase::text,
        json_object_agg(meal_index::text, chosen_option)
      )
      FROM public.meal_choices 
      WHERE user_id = p_user_id
      GROUP BY phase
    ),
    'weight_history', (
      SELECT json_agg(
        json_build_object(
          'date', metric_date,
          'value', metric_value,
          'created_at', created_at
        )
        ORDER BY metric_date DESC
      )
      FROM public.metrics_history 
      WHERE user_id = p_user_id 
        AND metric_type = 'weight' 
        AND metric_date >= CURRENT_DATE - INTERVAL '90 days'
    ),
    'body_fat_history', (
      SELECT json_agg(
        json_build_object(
          'date', metric_date,
          'value', metric_value,
          'created_at', created_at
        )
        ORDER BY metric_date DESC
      )
      FROM public.metrics_history 
      WHERE user_id = p_user_id 
        AND metric_type = 'body_fat' 
        AND metric_date >= CURRENT_DATE - INTERVAL '90 days'
    ),
    'custom_exercises', (
      SELECT json_object_agg(
        phase::text,
        json_object_agg(day_number::text, exercises)
      )
      FROM public.custom_exercises 
      WHERE user_id = p_user_id
      GROUP BY phase
    ),
    'custom_meals', (
      SELECT json_object_agg(phase::text, meals)
      FROM public.custom_meals 
      WHERE user_id = p_user_id
    )
  ) INTO result;
  
  RETURN result;
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object('error', SQLERRM);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- VUES POUR ANALYTICS
-- ============================================

-- Vue des statistiques utilisateur
CREATE VIEW public.user_stats AS
SELECT 
  up.user_id,
  up.current_day,
  up.current_weight,
  up.start_weight,
  up.target_weight,
  (up.start_weight - up.current_weight) as weight_lost,
  CASE 
    WHEN (up.start_weight - up.target_weight) != 0 
    THEN ROUND(((up.start_weight - up.current_weight) / (up.start_weight - up.target_weight) * 100)::numeric, 2)
    ELSE 0
  END as progress_percentage,
  (90 - up.current_day) as days_remaining,
  
  -- Statistiques d'exercices
  (
    SELECT COUNT(*)
    FROM public.completed_exercises ce
    WHERE ce.user_id = up.user_id AND ce.completed = true
  ) as total_exercises_completed,
  
  -- Statistiques de notes
  (
    SELECT COUNT(*)
    FROM public.daily_notes dn
    WHERE dn.user_id = up.user_id
  ) as days_with_notes,
  
  up.updated_at
FROM public.user_progress up;

-- ============================================
-- EXEMPLES D'UTILISATION
-- ============================================

/*
-- 1. Initialiser un utilisateur
SELECT public.initialize_user_fitness(auth.uid(), 106, 30, 90, 15);

-- 2. Récupérer toutes les données
SELECT public.get_user_complete_data(auth.uid());

-- 3. Mettre à jour le poids
SELECT public.update_user_metric(auth.uid(), 'weight', 103.5);

-- 4. Marquer un exercice comme complété
SELECT public.complete_exercise(auth.uid(), 1, 0, 0, 'Développé couché', 4, 'Série parfaite !');

-- 5. Ajouter une note quotidienne
INSERT INTO public.daily_notes (user_id, day_number, note)
VALUES (auth.uid(), 15, 'Excellente séance aujourd''hui !');

-- 6. Choisir une option de repas
INSERT INTO public.meal_choices (user_id, phase, meal_index, meal_name, chosen_option)
VALUES (auth.uid(), 1, 0, 'Petit-déjeuner', 'optionA');

-- 7. Récupérer les statistiques
SELECT * FROM public.user_stats WHERE user_id = auth.uid();
*/ 