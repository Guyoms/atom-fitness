export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      completed_exercises: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          day_number: number
          exercise_index: number
          exercise_name: string
          id: string
          notes: string | null
          phase: number
          sets_completed: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          day_number: number
          exercise_index: number
          exercise_name: string
          id?: string
          notes?: string | null
          phase: number
          sets_completed?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          day_number?: number
          exercise_index?: number
          exercise_name?: string
          id?: string
          notes?: string | null
          phase?: number
          sets_completed?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "completed_exercises_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_exercises: {
        Row: {
          created_at: string
          day_number: number
          exercises: Json
          id: string
          phase: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          day_number: number
          exercises?: Json
          id?: string
          phase: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          day_number?: number
          exercises?: Json
          id?: string
          phase?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "custom_exercises_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_meals: {
        Row: {
          created_at: string
          id: string
          meals: Json
          phase: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          meals?: Json
          phase: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          meals?: Json
          phase?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "custom_meals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_notes: {
        Row: {
          created_at: string
          day_number: number
          id: string
          note: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          day_number: number
          id?: string
          note: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          day_number?: number
          id?: string
          note?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_choices: {
        Row: {
          chosen_option: string
          id: string
          meal_index: number
          meal_name: string
          phase: number
          selected_at: string
          user_id: string
        }
        Insert: {
          chosen_option: string
          id?: string
          meal_index: number
          meal_name: string
          phase: number
          selected_at?: string
          user_id: string
        }
        Update: {
          chosen_option?: string
          id?: string
          meal_index?: number
          meal_name?: string
          phase?: number
          selected_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meal_choices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      metrics_history: {
        Row: {
          body_part: string | null
          created_at: string
          id: string
          metric_date: string
          metric_type: string
          metric_value: number
          notes: string | null
          user_id: string
        }
        Insert: {
          body_part?: string | null
          created_at?: string
          id?: string
          metric_date?: string
          metric_type: string
          metric_value: number
          notes?: string | null
          user_id: string
        }
        Update: {
          body_part?: string | null
          created_at?: string
          id?: string
          metric_date?: string
          metric_type?: string
          metric_value?: number
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "metrics_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string
          email: string
          id: string
          langue: string | null
          updated_at: string
          username: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          email: string
          id?: string
          langue?: string | null
          updated_at?: string
          username: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          email?: string
          id?: string
          langue?: string | null
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          body_fat: number
          created_at: string
          current_day: number
          current_weight: number
          id: string
          start_fat: number
          start_weight: number
          target_fat: number
          target_weight: number
          updated_at: string
          user_id: string
          water_intake: Json | null
        }
        Insert: {
          body_fat: number
          created_at?: string
          current_day?: number
          current_weight: number
          id?: string
          start_fat: number
          start_weight: number
          target_fat: number
          target_weight: number
          updated_at?: string
          user_id: string
          water_intake?: Json | null
        }
        Update: {
          body_fat?: number
          created_at?: string
          current_day?: number
          current_weight?: number
          id?: string
          start_fat?: number
          start_weight?: number
          target_fat?: number
          target_weight?: number
          updated_at?: string
          user_id?: string
          water_intake?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      user_stats: {
        Row: {
          current_day: number | null
          current_weight: number | null
          days_remaining: number | null
          days_with_notes: number | null
          progress_percentage: number | null
          start_weight: number | null
          target_weight: number | null
          total_exercises_completed: number | null
          updated_at: string | null
          user_id: string | null
          weight_lost: number | null
        }
        Insert: {
          current_day?: number | null
          current_weight?: number | null
          days_remaining?: never
          days_with_notes?: never
          progress_percentage?: never
          start_weight?: number | null
          target_weight?: number | null
          total_exercises_completed?: never
          updated_at?: string | null
          user_id?: string | null
          weight_lost?: never
        }
        Update: {
          current_day?: number | null
          current_weight?: number | null
          days_remaining?: never
          days_with_notes?: never
          progress_percentage?: never
          start_weight?: number | null
          target_weight?: number | null
          total_exercises_completed?: never
          updated_at?: string | null
          user_id?: string | null
          weight_lost?: never
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
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
        Args: { p_user_id: string }
        Returns: Json
      }
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
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
