import { supabase } from './supabase'
import type { MoodEntry, JournalEntry, ChatMessage, SupportGroup, TherapySession } from './supabase'

export async function getDashboardStats(userId: string) {
  const [
    { count: chatCount },
    { count: journalCount },
    { count: groupCount },
    { data: recentMood }
  ] = await Promise.all([
    supabase.from('chat_messages').select('*', { count: 'exact', head: true }).eq('user_id', userId),
    supabase.from('journal_entries').select('*', { count: 'exact', head: true }).eq('user_id', userId),
    supabase.from('group_memberships').select('*', { count: 'exact', head: true }).eq('user_id', userId),
    supabase.from('mood_entries').select('mood_score').eq('user_id', userId).order('created_at', { ascending: false }).limit(1).single()
  ])

  return {
    chatSessions: chatCount || 0,
    journalEntries: journalCount || 0,
    supportGroups: groupCount || 0,
    currentMood: recentMood?.mood_score || 5
  }
}

export async function getMoodHistory(userId: string, days: number = 7) {
  const { data } = await supabase
    .from('mood_entries')
    .select('mood_score, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(days)

  return data || []
}

export async function getRecentActivity(userId: string, limit: number = 10) {
  // Get recent activities from different tables
  const [
    { data: recentChats },
    { data: recentJournals },
    { data: recentMoods },
    { data: recentGroups }
  ] = await Promise.all([
    supabase.from('chat_messages').select('created_at').eq('user_id', userId).order('created_at', { ascending: false }).limit(3),
    supabase.from('journal_entries').select('created_at').eq('user_id', userId).order('created_at', { ascending: false }).limit(3),
    supabase.from('mood_entries').select('created_at').eq('user_id', userId).order('created_at', { ascending: false }).limit(3),
    supabase.from('group_memberships').select('created_at').eq('user_id', userId).order('created_at', { ascending: false }).limit(3)
  ])

  // Combine and sort by date
  const activities = [
    ...recentChats?.map(item => ({ type: 'chat', date: item.created_at })) || [],
    ...recentJournals?.map(item => ({ type: 'journal', date: item.created_at })) || [],
    ...recentMoods?.map(item => ({ type: 'mood', date: item.created_at })) || [],
    ...recentGroups?.map(item => ({ type: 'group', date: item.created_at })) || []
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit)

  return activities
}

export async function getUpcomingSessions(userId: string) {
  const { data } = await supabase
    .from('therapy_sessions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'scheduled')
    .order('scheduled_at', { ascending: true })
    .limit(5)

  return data || []
}

export async function logMood(userId: string, moodScore: number, factors?: string[], notes?: string) {
  const { data, error } = await supabase
    .from('mood_entries')
    .insert({
      user_id: userId,
      mood_score: moodScore,
      factors: factors || [],
      notes
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function createJournalEntry(userId: string, title: string, content: string, tags?: string[], moodScore?: number) {
  const { data, error } = await supabase
    .from('journal_entries')
    .insert({
      user_id: userId,
      title,
      content,
      tags: tags || [],
      mood_score: moodScore
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getJournalEntries(userId: string, limit: number = 50) {
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

export async function sendChatMessage(userId: string, content: string, roomId?: string, isAnonymous: boolean = true) {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({
      user_id: userId,
      content,
      room_id: roomId,
      is_anonymous: isAnonymous
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getChatMessages(roomId?: string, limit: number = 50) {
  let query = supabase
    .from('chat_messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (roomId) {
    query = query.eq('room_id', roomId)
  }

  const { data, error } = await query
  if (error) throw error
  return data?.reverse() || []
}

export async function getSupportGroups() {
  const { data, error } = await supabase
    .from('support_groups')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function joinSupportGroup(userId: string, groupId: string) {
  const { data, error } = await supabase
    .from('group_memberships')
    .insert({
      user_id: userId,
      group_id: groupId
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserGroupMemberships(userId: string) {
  const { data, error } = await supabase
    .from('group_memberships')
    .select('group_id')
    .eq('user_id', userId)

  if (error) throw error
  return data?.map(item => item.group_id) || []
}