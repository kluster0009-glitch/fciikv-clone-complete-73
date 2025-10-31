export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      channel_members: {
        Row: {
          channel_id: number | null
          id: number
          joined_at: string | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          channel_id?: number | null
          id?: number
          joined_at?: string | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          channel_id?: number | null
          id?: number
          joined_at?: string | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "channel_members_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
        ]
      }
      channels: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: number
          is_private: boolean | null
          name: string
          organization_id: number | null
          scope: string | null
          subject_name: string | null
          type: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: number
          is_private?: boolean | null
          name: string
          organization_id?: number | null
          scope?: string | null
          subject_name?: string | null
          type: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: number
          is_private?: boolean | null
          name?: string
          organization_id?: number | null
          scope?: string | null
          subject_name?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "channels_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "email_domains"
            referencedColumns: ["id"]
          },
        ]
      }
      email_domains: {
        Row: {
          domain: string | null
          id: number
          organization_name: string | null
          timestamp: string | null
        }
        Insert: {
          domain?: string | null
          id?: number
          organization_name?: string | null
          timestamp?: string | null
        }
        Update: {
          domain?: string | null
          id?: number
          organization_name?: string | null
          timestamp?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          channel_id: number | null
          content: string
          created_at: string | null
          deleted: boolean | null
          id: number
          parent_message_id: number | null
          sender_id: string | null
          updated_at: string | null
        }
        Insert: {
          channel_id?: number | null
          content: string
          created_at?: string | null
          deleted?: boolean | null
          id?: number
          parent_message_id?: number | null
          sender_id?: string | null
          updated_at?: string | null
        }
        Update: {
          channel_id?: number | null
          content?: string
          created_at?: string | null
          deleted?: boolean | null
          id?: number
          parent_message_id?: number | null
          sender_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_parent_message_id_fkey"
            columns: ["parent_message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_survey: {
        Row: {
          created_at: string | null
          id: number
          user_id: string
          where_heard_about_us: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          user_id: string
          where_heard_about_us?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          user_id?: string
          where_heard_about_us?: string | null
        }
        Relationships: []
      }
      organization_requests: {
        Row: {
          additional_info: string | null
          created_at: string | null
          email_domain: string
          id: number
          organization_name: string
          organization_size: string
          organization_type: string
          requester_email: string
          requester_name: string
          status: string
        }
        Insert: {
          additional_info?: string | null
          created_at?: string | null
          email_domain: string
          id?: number
          organization_name: string
          organization_size: string
          organization_type: string
          requester_email: string
          requester_name: string
          status?: string
        }
        Update: {
          additional_info?: string | null
          created_at?: string | null
          email_domain?: string
          id?: number
          organization_name?: string
          organization_size?: string
          organization_type?: string
          requester_email?: string
          requester_name?: string
          status?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          college_name: string | null
          created_at: string | null
          department: string
          email: string
          full_name: string
          id: string
          login_counter: number
          organization_id: number | null
          profile_picture: string | null
          role: string | null
          roll_number: string
          username: string
        }
        Insert: {
          bio?: string | null
          college_name?: string | null
          created_at?: string | null
          department: string
          email: string
          full_name: string
          id: string
          login_counter?: number
          organization_id?: number | null
          profile_picture?: string | null
          role?: string | null
          roll_number: string
          username: string
        }
        Update: {
          bio?: string | null
          college_name?: string | null
          created_at?: string | null
          department?: string
          email?: string
          full_name?: string
          id?: string
          login_counter?: number
          organization_id?: number | null
          profile_picture?: string | null
          role?: string | null
          roll_number?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "email_domains"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      me_profile: {
        Args: never
        Returns: {
          email: string
          organization_id: number
          organization_name: string
          role: string
          user_id: string
        }[]
      }
      seed_org_channels: {
        Args: { p_created_by?: string; p_org_id: number }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "student"],
    },
  },
} as const
