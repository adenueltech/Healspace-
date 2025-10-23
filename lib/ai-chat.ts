import { generateMentalHealthResponse, isCrisisMessage, generateCrisisResponse } from './gemini'
import { supabase } from './supabase'
import type { ChatMessage } from './supabase'

export interface AIChatMessage extends ChatMessage {
  is_ai_response?: boolean
}

export const sendMessageToAI = async (
  userId: string,
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> => {
  try {
    // Check for crisis keywords first
    if (isCrisisMessage(userMessage)) {
      return generateCrisisResponse()
    }

    // Get recent conversation context (last 5 messages)
    const recentContext = conversationHistory
      .slice(-5)
      .map(msg => `${msg.user_id === userId ? 'User' : 'AI'}: ${msg.content}`)

    // Generate AI response
    const aiResponse = await generateMentalHealthResponse(userMessage, recentContext)

    return aiResponse
  } catch (error) {
    console.error('AI chat error:', error)
    return 'I\'m sorry, I\'m having trouble responding right now. Please try again in a moment, or consider reaching out to a human support specialist through HealSpace.'
  }
}

export const createAIConversation = async (
  userId: string,
  userMessage: string
): Promise<{ userMessage: ChatMessage; aiResponse: ChatMessage }> => {
  try {
    // Get conversation history for context
    const { data: history } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .eq('is_ai_conversation', true)
      .order('created_at', { ascending: false })
      .limit(10)

    const conversationHistory = history || []

    // Generate AI response
    const aiResponseText = await sendMessageToAI(userId, userMessage, conversationHistory)

    // Save user message
    const { data: userMsg, error: userError } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        content: userMessage,
        is_anonymous: true,
        is_ai_conversation: true,
        room_id: `ai_${userId}`
      })
      .select()
      .single()

    if (userError) throw userError

    // Save AI response
    const { data: aiMsg, error: aiError } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        content: aiResponseText,
        is_anonymous: false,
        is_ai_conversation: true,
        is_ai_response: true,
        room_id: `ai_${userId}`
      })
      .select()
      .single()

    if (aiError) throw aiError

    return {
      userMessage: userMsg,
      aiResponse: aiMsg
    }
  } catch (error) {
    console.error('Error creating AI conversation:', error)
    throw error
  }
}

export const getAIConversationHistory = async (userId: string, limit: number = 50): Promise<ChatMessage[]> => {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .eq('is_ai_conversation', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data?.reverse() || []
  } catch (error) {
    console.error('Error fetching AI conversation history:', error)
    return []
  }
}

export const clearAIConversation = async (userId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('chat_messages')
      .delete()
      .eq('user_id', userId)
      .eq('is_ai_conversation', true)

    if (error) throw error
  } catch (error) {
    console.error('Error clearing AI conversation:', error)
    throw error
  }
}