import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface ChatMessage {
  id: string
  user_id: string
  content: string
  created_at: string
  is_anonymous: boolean
  room_id?: string
  is_ai_conversation?: boolean
  is_ai_response?: boolean
}

export interface JournalEntry {
  id: string
  user_id: string
  title: string
  content: string
  mood_score?: number
  tags: string[]
  created_at: string
  updated_at: string
}

export interface MoodEntry {
  id: string
  user_id: string
  mood_score: number
  factors: string[]
  notes?: string
  created_at: string
}

export interface SupportGroup {
  id: string
  name: string
  description: string
  category: string
  is_private: boolean
  created_at: string
}

export interface TherapySession {
  id: string
  user_id: string
  therapist_id: string
  scheduled_at: string
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
}