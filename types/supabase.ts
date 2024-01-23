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
      daily_menu: {
        Row: {
          breakfast_id: number
          created_at: string
          day_id: number
          dinner_id: number
          id: number
          lunch_id: number
          menu_id: number
        }
        Insert: {
          breakfast_id: number
          created_at?: string
          day_id: number
          dinner_id: number
          id?: number
          lunch_id: number
          menu_id: number
        }
        Update: {
          breakfast_id?: number
          created_at?: string
          day_id?: number
          dinner_id?: number
          id?: number
          lunch_id?: number
          menu_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "daily_menu_breakfast_id_fkey"
            columns: ["breakfast_id"]
            isOneToOne: false
            referencedRelation: "food_menus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_menu_day_id_fkey"
            columns: ["day_id"]
            isOneToOne: false
            referencedRelation: "days_of_the_week"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_menu_dinner_id_fkey"
            columns: ["dinner_id"]
            isOneToOne: false
            referencedRelation: "food_menus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_menu_lunch_id_fkey"
            columns: ["lunch_id"]
            isOneToOne: false
            referencedRelation: "food_menus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "daily_menu_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "weekly_menus"
            referencedColumns: ["id"]
          }
        ]
      }
      days_of_the_week: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      family: {
        Row: {
          admin_id: string | null
          created_at: string
          family_id: number
          name: string
        }
        Insert: {
          admin_id?: string | null
          created_at?: string
          family_id?: number
          name: string
        }
        Update: {
          admin_id?: string | null
          created_at?: string
          family_id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "family_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      food_menus: {
        Row: {
          created_at: string
          description: string
          family_id: number | null
          groceries_ids: string[]
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          description: string
          family_id?: number | null
          groceries_ids: string[]
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          description?: string
          family_id?: number | null
          groceries_ids?: string[]
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_menus_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "family"
            referencedColumns: ["family_id"]
          }
        ]
      }
      groceries: {
        Row: {
          created_at: string
          family_id: number | null
          id: number
          name: string
          quantity: number
        }
        Insert: {
          created_at?: string
          family_id?: number | null
          id?: number
          name: string
          quantity: number
        }
        Update: {
          created_at?: string
          family_id?: number | null
          id?: number
          name?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "groceries_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "family"
            referencedColumns: ["family_id"]
          }
        ]
      }
      profiles: {
        Row: {
          created_at: string
          family_id: number | null
          id: string
          name: string
          role: string
        }
        Insert: {
          created_at?: string
          family_id?: number | null
          id: string
          name: string
          role?: string
        }
        Update: {
          created_at?: string
          family_id?: number | null
          id?: string
          name?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "family"
            referencedColumns: ["family_id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      weekly_menus: {
        Row: {
          created_at: string
          end_date: string
          family_id: number | null
          id: number
          name: string
          start_date: string
        }
        Insert: {
          created_at?: string
          end_date: string
          family_id?: number | null
          id?: number
          name: string
          start_date: string
        }
        Update: {
          created_at?: string
          end_date?: string
          family_id?: number | null
          id?: number
          name?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "weekly_menus_family_id_fkey"
            columns: ["family_id"]
            isOneToOne: false
            referencedRelation: "family"
            referencedColumns: ["family_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
