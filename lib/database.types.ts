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
      admissionform: {
        Row: {
          address: string
          Board: string
          city: string | null
          created_at: string
          email: string
          id: number
          img: string | null
          medium: string
          mobilenumber: number
          name: string
          percentage: string
          standard: string | null
          state: string | null
          stream: string | null
          user_id: string | null
        }
        Insert: {
          address: string
          Board: string
          city?: string | null
          created_at?: string
          email: string
          id?: number
          img?: string | null
          medium: string
          mobilenumber: number
          name: string
          percentage: string
          standard?: string | null
          state?: string | null
          stream?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string
          Board?: string
          city?: string | null
          created_at?: string
          email?: string
          id?: number
          img?: string | null
          medium?: string
          mobilenumber?: number
          name?: string
          percentage?: string
          standard?: string | null
          state?: string | null
          stream?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      coaching: {
        Row: {
          Board: string | null
          city: string | null
          coachingname: string
          coachingtype: string | null
          discription: string | null
          email: string | null
          id: number
          location: string | null
          locationlink: string | null
          medium: string | null
          mobile: number | null
          ratingofcoaching: string | null
          Standard: string | null
          State: string | null
          stream: string | null
          streetaddress: string | null
          subdistrict: string | null
          user_id: string | null
          view: number | null
          website: string | null
        }
        Insert: {
          Board?: string | null
          city?: string | null
          coachingname: string
          coachingtype?: string | null
          discription?: string | null
          email?: string | null
          id?: number
          location?: string | null
          locationlink?: string | null
          medium?: string | null
          mobile?: number | null
          ratingofcoaching?: string | null
          Standard?: string | null
          State?: string | null
          stream?: string | null
          streetaddress?: string | null
          subdistrict?: string | null
          user_id?: string | null
          view?: number | null
          website?: string | null
        }
        Update: {
          Board?: string | null
          city?: string | null
          coachingname?: string
          coachingtype?: string | null
          discription?: string | null
          email?: string | null
          id?: number
          location?: string | null
          locationlink?: string | null
          medium?: string | null
          mobile?: number | null
          ratingofcoaching?: string | null
          Standard?: string | null
          State?: string | null
          stream?: string | null
          streetaddress?: string | null
          subdistrict?: string | null
          user_id?: string | null
          view?: number | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coaching_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      contactus: {
        Row: {
          created_at: string
          Email: string | null
          id: number
          Message: string | null
          Name: string | null
          Subject: string | null
        }
        Insert: {
          created_at?: string
          Email?: string | null
          id?: number
          Message?: string | null
          Name?: string | null
          Subject?: string | null
        }
        Update: {
          created_at?: string
          Email?: string | null
          id?: number
          Message?: string | null
          Name?: string | null
          Subject?: string | null
        }
        Relationships: []
      }
      leaderbordSchool: {
        Row: {
          city: string | null
          created_at: string
          id: number
          name: string | null
          number: string | null
          points: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          id?: number
          name?: string | null
          number?: string | null
          points?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string
          id?: number
          name?: string | null
          number?: string | null
          points?: string | null
        }
        Relationships: []
      }
      marketingDetails: {
        Row: {
          Board: string | null
          created_at: string
          District: string | null
          exam: string | null
          id: number
          medium: string | null
          Standard: string | null
          State: string | null
          user_id: string | null
        }
        Insert: {
          Board?: string | null
          created_at?: string
          District?: string | null
          exam?: string | null
          id?: number
          medium?: string | null
          Standard?: string | null
          State?: string | null
          user_id?: string | null
        }
        Update: {
          Board?: string | null
          created_at?: string
          District?: string | null
          exam?: string | null
          id?: number
          medium?: string | null
          Standard?: string | null
          State?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      onlineform: {
        Row: {
          app: string | null
          Board: string | null
          coachingname: string
          discription: string | null
          email: string | null
          id: number
          link: string | null
          medium: string | null
          mobile: number | null
          ratingofcoaching: string | null
          Standard: string | null
          State: string | null
          stream: string | null
          user_id: string | null
          view: number | null
          website: string | null
        }
        Insert: {
          app?: string | null
          Board?: string | null
          coachingname: string
          discription?: string | null
          email?: string | null
          id?: number
          link?: string | null
          medium?: string | null
          mobile?: number | null
          ratingofcoaching?: string | null
          Standard?: string | null
          State?: string | null
          stream?: string | null
          user_id?: string | null
          view?: number | null
          website?: string | null
        }
        Update: {
          app?: string | null
          Board?: string | null
          coachingname?: string
          discription?: string | null
          email?: string | null
          id?: number
          link?: string | null
          medium?: string | null
          mobile?: number | null
          ratingofcoaching?: string | null
          Standard?: string | null
          State?: string | null
          stream?: string | null
          user_id?: string | null
          view?: number | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coaching_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      School: {
        Row: {
          Board: string[] | null
          discription: string | null
          DISE: string | null
          District: string | null
          email: string | null
          exam: string | null
          id: number
          location: string | null
          locationlink: string | null
          medium: string[] | null
          mobile1: number | null
          ratingofschool: string | null
          schoolname: string | null
          Standard: string[] | null
          State: string | null
          stream: string | null
          streetaddress: string | null
          subdistrict: string | null
          user_id: string | null
          view: number | null
          website: string | null
        }
        Insert: {
          Board?: string[] | null
          discription?: string | null
          DISE?: string | null
          District?: string | null
          email?: string | null
          exam?: string | null
          id?: number
          location?: string | null
          locationlink?: string | null
          medium?: string[] | null
          mobile1?: number | null
          ratingofschool?: string | null
          schoolname?: string | null
          Standard?: string[] | null
          State?: string | null
          stream?: string | null
          streetaddress?: string | null
          subdistrict?: string | null
          user_id?: string | null
          view?: number | null
          website?: string | null
        }
        Update: {
          Board?: string[] | null
          discription?: string | null
          DISE?: string | null
          District?: string | null
          email?: string | null
          exam?: string | null
          id?: number
          location?: string | null
          locationlink?: string | null
          medium?: string[] | null
          mobile1?: number | null
          ratingofschool?: string | null
          schoolname?: string | null
          Standard?: string[] | null
          State?: string | null
          stream?: string | null
          streetaddress?: string | null
          subdistrict?: string | null
          user_id?: string | null
          view?: number | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "School_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      schoolDemo: {
        Row: {
          created_at: string
          discription: string | null
          id: number
          Standard: string | null
          subject: string | null
          Teachername: string | null
          user_id: string | null
          videolink: string | null
        }
        Insert: {
          created_at?: string
          discription?: string | null
          id?: number
          Standard?: string | null
          subject?: string | null
          Teachername?: string | null
          user_id?: string | null
          videolink?: string | null
        }
        Update: {
          created_at?: string
          discription?: string | null
          id?: number
          Standard?: string | null
          subject?: string | null
          Teachername?: string | null
          user_id?: string | null
          videolink?: string | null
        }
        Relationships: []
      }
      skillclass: {
        Row: {
          city: string | null
          discription: string | null
          email: string | null
          id: number
          location: string | null
          locationlink: string | null
          mobile: number | null
          ratingofskillclass: string | null
          skillclassname: string
          skilltype: string
          State: string | null
          streetaddress: string | null
          subdistrict: string | null
          user_id: string | null
          view: number | null
          website: string | null
        }
        Insert: {
          city?: string | null
          discription?: string | null
          email?: string | null
          id?: number
          location?: string | null
          locationlink?: string | null
          mobile?: number | null
          ratingofskillclass?: string | null
          skillclassname: string
          skilltype: string
          State?: string | null
          streetaddress?: string | null
          subdistrict?: string | null
          user_id?: string | null
          view?: number | null
          website?: string | null
        }
        Update: {
          city?: string | null
          discription?: string | null
          email?: string | null
          id?: number
          location?: string | null
          locationlink?: string | null
          mobile?: number | null
          ratingofskillclass?: string | null
          skillclassname?: string
          skilltype?: string
          State?: string | null
          streetaddress?: string | null
          subdistrict?: string | null
          user_id?: string | null
          view?: number | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skillclass_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      Student: {
        Row: {
          Board: string | null
          city: string | null
          Coins: number | null
          created_at: string
          email: string | null
          exam: string | null
          id: number
          medium: string | null
          name: string | null
          Standard: string | null
          State: string | null
          stream: string | null
          subDistrict: string | null
          user_id: string | null
        }
        Insert: {
          Board?: string | null
          city?: string | null
          Coins?: number | null
          created_at?: string
          email?: string | null
          exam?: string | null
          id?: number
          medium?: string | null
          name?: string | null
          Standard?: string | null
          State?: string | null
          stream?: string | null
          subDistrict?: string | null
          user_id?: string | null
        }
        Update: {
          Board?: string | null
          city?: string | null
          Coins?: number | null
          created_at?: string
          email?: string | null
          exam?: string | null
          id?: number
          medium?: string | null
          name?: string | null
          Standard?: string | null
          State?: string | null
          stream?: string | null
          subDistrict?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      viewschool: {
        Row: {
          banneradviews: number | null
          cadview: number | null
          created_at: string
          demolecturesView: number | null
          id: number
          user_id: string | null
          videoadviews: number | null
          view: number | null
        }
        Insert: {
          banneradviews?: number | null
          cadview?: number | null
          created_at?: string
          demolecturesView?: number | null
          id?: number
          user_id?: string | null
          videoadviews?: number | null
          view?: number | null
        }
        Update: {
          banneradviews?: number | null
          cadview?: number | null
          created_at?: string
          demolecturesView?: number | null
          id?: number
          user_id?: string | null
          videoadviews?: number | null
          view?: number | null
        }
        Relationships: []
      }
      votes: {
        Row: {
          created_at: string
          email: string | null
          extracurricular: number | null
          facilityprovided: number | null
          id: number
          management: number | null
          qualityofeducation: number | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          extracurricular?: number | null
          facilityprovided?: number | null
          id?: number
          management?: number | null
          qualityofeducation?: number | null
        }
        Update: {
          created_at?: string
          email?: string | null
          extracurricular?: number | null
          facilityprovided?: number | null
          id?: number
          management?: number | null
          qualityofeducation?: number | null
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
