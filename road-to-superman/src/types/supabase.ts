export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_progress: {
        Row: {
          id: string
          user_id: string
          created_at: string
          updated_at: string
          current_day: number
          current_weight: number
          body_fat: number
          start_weight: number
          start_fat: number
          target_weight: number
          target_fat: number
          water_intake: Json
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          updated_at?: string
          current_day?: number
          current_weight: number
          body_fat: number
          start_weight: number
          start_fat: number
          target_weight: number
          target_fat: number
          water_intake?: Json
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          updated_at?: string
          current_day?: number
          current_weight?: number
          body_fat?: number
          start_weight?: number
          start_fat?: number
          target_weight?: number
          target_fat?: number
          water_intake?: Json
        }
      }
      daily_notes: {
        Row: {
          id: string
          user_id: string
          day_number: number
          note: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          day_number: number
          note: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          day_number?: number
          note?: string
          created_at?: string
          updated_at?: string
        }
      }
      completed_exercises: {
        Row: {
          id: string
          user_id: string
          phase: number
          day_number: number
          exercise_index: number
          exercise_name: string
          completed: boolean
          completed_at: string | null
          sets_completed: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          phase: number
          day_number: number
          exercise_index: number
          exercise_name: string
          completed?: boolean
          completed_at?: string | null
          sets_completed?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          phase?: number
          day_number?: number
          exercise_index?: number
          exercise_name?: string
          completed?: boolean
          completed_at?: string | null
          sets_completed?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      meal_choices: {
        Row: {
          id: string
          user_id: string
          phase: number
          meal_index: number
          meal_name: string
          chosen_option: string
          selected_at: string
        }
        Insert: {
          id?: string
          user_id: string
          phase: number
          meal_index: number
          meal_name: string
          chosen_option: string
          selected_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          phase?: number
          meal_index?: number
          meal_name?: string
          chosen_option?: string
          selected_at?: string
        }
      }
      metrics_history: {
        Row: {
          id: string
          user_id: string
          metric_type: string
          metric_value: number
          metric_date: string
          body_part: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          metric_type: string
          metric_value: number
          metric_date?: string
          body_part?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          metric_type?: string
          metric_value?: number
          metric_date?: string
          body_part?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      custom_exercises: {
        Row: {
          id: string
          user_id: string
          phase: number
          day_number: number
          exercises: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          phase: number
          day_number: number
          exercises?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          phase?: number
          day_number?: number
          exercises?: Json
          created_at?: string
          updated_at?: string
        }
      }
      custom_meals: {
        Row: {
          id: string
          user_id: string
          phase: number
          meals: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          phase: number
          meals?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          phase?: number
          meals?: Json
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      user_stats: {
        Row: {
          user_id: string
          current_day: number
          current_weight: number
          start_weight: number
          target_weight: number
          weight_lost: number
          progress_percentage: number
          days_remaining: number
          total_exercises_completed: number
          days_with_notes: number
          updated_at: string
        }
      }
    }
    Functions: {
      initialize_user_fitness: {
        Args: {
          p_user_id: string
          p_start_weight?: number
          p_start_fat?: number
          p_target_weight?: number
          p_target_fat?: number
        }
        Returns: boolean
      }
      update_user_metric: {
        Args: {
          p_user_id: string
          p_metric_type: string
          p_value: number
          p_date?: string
          p_notes?: string
        }
        Returns: boolean
      }
      complete_exercise: {
        Args: {
          p_user_id: string
          p_phase: number
          p_day_number: number
          p_exercise_index: number
          p_exercise_name: string
          p_sets_completed?: number
          p_notes?: string
        }
        Returns: boolean
      }
      get_user_complete_data: {
        Args: {
          p_user_id: string
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
} 