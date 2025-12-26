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
      calendar_events: {
        Row: {
          calendar_type: string | null
          color: string | null
          created_at: string | null
          description: string | null
          end_time: string
          event_id: string | null
          event_type: string | null
          id: string
          location: string | null
          participants: string[] | null
          rsvp_status: string | null
          start_time: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          calendar_type?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          end_time: string
          event_id?: string | null
          event_type?: string | null
          id?: string
          location?: string | null
          participants?: string[] | null
          rsvp_status?: string | null
          start_time: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          calendar_type?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          end_time?: string
          event_id?: string | null
          event_type?: string | null
          id?: string
          location?: string | null
          participants?: string[] | null
          rsvp_status?: string | null
          start_time?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_events_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events_with_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      carousel_slides: {
        Row: {
          button_link: string | null
          created_at: string
          display_order: number
          heading: string | null
          heading_color: string | null
          heading_font_family: string | null
          heading_font_size: string | null
          id: string
          image_url: string | null
          is_active: boolean
          message: string
          message_color: string | null
          message_font_family: string | null
          message_font_size: string | null
          updated_at: string
        }
        Insert: {
          button_link?: string | null
          created_at?: string
          display_order?: number
          heading?: string | null
          heading_color?: string | null
          heading_font_family?: string | null
          heading_font_size?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          message: string
          message_color?: string | null
          message_font_family?: string | null
          message_font_size?: string | null
          updated_at?: string
        }
        Update: {
          button_link?: string | null
          created_at?: string
          display_order?: number
          heading?: string | null
          heading_color?: string | null
          heading_font_family?: string | null
          heading_font_size?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          message?: string
          message_color?: string | null
          message_font_family?: string | null
          message_font_size?: string | null
          updated_at?: string
        }
        Relationships: []
      }
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
          {
            foreignKeyName: "channel_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
            foreignKeyName: "channels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channels_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "email_domains"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_participants: {
        Row: {
          conversation_id: string
          id: string
          joined_at: string | null
          last_read_at: string | null
          user_id: string
        }
        Insert: {
          conversation_id: string
          id?: string
          joined_at?: string | null
          last_read_at?: string | null
          user_id: string
        }
        Update: {
          conversation_id?: string
          id?: string
          joined_at?: string | null
          last_read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string | null
          created_by: string | null
          group_icon: string | null
          group_name: string | null
          id: string
          is_group: boolean
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          group_icon?: string | null
          group_name?: string | null
          id?: string
          is_group?: boolean
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          group_icon?: string | null
          group_name?: string | null
          id?: string
          is_group?: boolean
          updated_at?: string | null
        }
        Relationships: []
      }
      dm_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          edited_at: string | null
          event_id: string | null
          id: string
          is_deleted: boolean | null
          is_edited: boolean | null
          is_pinned: boolean
          message_type: string | null
          pinned_by: string | null
          reply_to: string | null
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          edited_at?: string | null
          event_id?: string | null
          id?: string
          is_deleted?: boolean | null
          is_edited?: boolean | null
          is_pinned?: boolean
          message_type?: string | null
          pinned_by?: string | null
          reply_to?: string | null
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          edited_at?: string | null
          event_id?: string | null
          id?: string
          is_deleted?: boolean | null
          is_edited?: boolean | null
          is_pinned?: boolean
          message_type?: string | null
          pinned_by?: string | null
          reply_to?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dm_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dm_messages_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dm_messages_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events_with_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dm_messages_reply_to_fkey"
            columns: ["reply_to"]
            isOneToOne: false
            referencedRelation: "dm_messages"
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
      event_registrations: {
        Row: {
          event_id: string
          id: string
          registered_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          event_id: string
          id?: string
          registered_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          event_id?: string
          id?: string
          registered_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events_with_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          category: string
          created_at: string | null
          description: string
          event_date: string
          featured: boolean | null
          id: string
          image_url: string | null
          location: string
          max_attendees: number
          organizer_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          event_date: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          location: string
          max_attendees?: number
          organizer_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          event_date?: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          location?: string
          max_attendees?: number
          organizer_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      followers: {
        Row: {
          created_at: string | null
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "followers_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "followers_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          category: string
          connected_count: number | null
          created_at: string | null
          description: string
          downloads: number | null
          featured: boolean | null
          id: string
          logo: string
          name: string
          organization: string | null
          rating: number | null
          release_date: string | null
          status: string | null
          submitter_id: string | null
          updated_at: string | null
          verified: boolean | null
          website: string
        }
        Insert: {
          category: string
          connected_count?: number | null
          created_at?: string | null
          description: string
          downloads?: number | null
          featured?: boolean | null
          id?: string
          logo: string
          name: string
          organization?: string | null
          rating?: number | null
          release_date?: string | null
          status?: string | null
          submitter_id?: string | null
          updated_at?: string | null
          verified?: boolean | null
          website: string
        }
        Update: {
          category?: string
          connected_count?: number | null
          created_at?: string | null
          description?: string
          downloads?: number | null
          featured?: boolean | null
          id?: string
          logo?: string
          name?: string
          organization?: string | null
          rating?: number | null
          release_date?: string | null
          status?: string | null
          submitter_id?: string | null
          updated_at?: string | null
          verified?: boolean | null
          website?: string
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
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          actor_id: string | null
          conversation_id: string | null
          created_at: string | null
          dm_message_id: string | null
          id: string
          message: string
          post_id: string | null
          read: boolean | null
          type: string
          user_id: string
        }
        Insert: {
          actor_id?: string | null
          conversation_id?: string | null
          created_at?: string | null
          dm_message_id?: string | null
          id?: string
          message: string
          post_id?: string | null
          read?: boolean | null
          type: string
          user_id: string
        }
        Update: {
          actor_id?: string | null
          conversation_id?: string | null
          created_at?: string | null
          dm_message_id?: string | null
          id?: string
          message?: string
          post_id?: string | null
          read?: boolean | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_dm_message_id_fkey"
            columns: ["dm_message_id"]
            isOneToOne: false
            referencedRelation: "dm_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
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
      post_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          post_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          post_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          category: string | null
          comments_count: number | null
          content: string
          created_at: string | null
          embeds: Json | null
          id: string
          image_url: string | null
          likes_count: number | null
          location: string | null
          media: Json | null
          saved_count: number | null
          tagged_users: string[] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          comments_count?: number | null
          content: string
          created_at?: string | null
          embeds?: Json | null
          id?: string
          image_url?: string | null
          likes_count?: number | null
          location?: string | null
          media?: Json | null
          saved_count?: number | null
          tagged_users?: string[] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          comments_count?: number | null
          content?: string
          created_at?: string | null
          embeds?: Json | null
          id?: string
          image_url?: string | null
          likes_count?: number | null
          location?: string | null
          media?: Json | null
          saved_count?: number | null
          tagged_users?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          banner_image: string | null
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
          role_verified_at: string | null
          role_verified_by: string | null
          roll_number: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          banner_image?: string | null
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
          role_verified_at?: string | null
          role_verified_by?: string | null
          roll_number: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          banner_image?: string | null
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
          role_verified_at?: string | null
          role_verified_by?: string | null
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
          {
            foreignKeyName: "profiles_role_verified_by_fkey"
            columns: ["role_verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      role_audit_log: {
        Row: {
          changed_by: string | null
          created_at: string | null
          id: string
          new_role: string
          old_role: string
          reason: string | null
          user_id: string
        }
        Insert: {
          changed_by?: string | null
          created_at?: string | null
          id?: string
          new_role: string
          old_role: string
          reason?: string | null
          user_id: string
        }
        Update: {
          changed_by?: string | null
          created_at?: string | null
          id?: string
          new_role?: string
          old_role?: string
          reason?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_audit_log_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_audit_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      role_upgrade_requests: {
        Row: {
          college_name: string
          created_at: string | null
          current_user_role: string
          department: string | null
          id: string
          justification: string | null
          requested_role: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          college_name: string
          created_at?: string | null
          current_user_role: string
          department?: string | null
          id?: string
          justification?: string | null
          requested_role: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          college_name?: string
          created_at?: string | null
          current_user_role?: string
          department?: string | null
          id?: string
          justification?: string | null
          requested_role?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_upgrade_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_upgrade_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_posts: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_posts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      events_with_stats: {
        Row: {
          attendees_count: number | null
          category: string | null
          created_at: string | null
          description: string | null
          event_date: string | null
          featured: boolean | null
          id: string | null
          image_url: string | null
          is_full: boolean | null
          location: string | null
          max_attendees: number | null
          organizer_id: string | null
          title: string | null
          updated_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_or_create_conversation: {
        Args: { user1_id: string; user2_id: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      mark_messages_read: { Args: { conv_id: string }; Returns: undefined }
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
      user_is_in_conversation: {
        Args: { conv_id: string; usr_id: string }
        Returns: boolean
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
