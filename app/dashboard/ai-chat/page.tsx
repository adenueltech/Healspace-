"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, MessageCircle, Shield, Clock, RotateCcw } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { createAIConversation, getAIConversationHistory, clearAIConversation } from "@/lib/ai-chat"
import { supabase } from "@/lib/supabase"
import type { ChatMessage, User as UserType } from "@/lib/supabase"

export default function AIChatPage() {
  const [user, setUser] = useState<UserType | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    async function initializeAIChat() {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) return

        setUser(currentUser)

        // Load AI conversation history
        const chatHistory = await getAIConversationHistory(currentUser.id)
        setMessages(chatHistory)
      } catch (error) {
        console.error("Failed to initialize AI chat:", error)
      } finally {
        setLoading(false)
      }
    }

    initializeAIChat()

    // Subscribe to real-time AI messages
    const channel = supabase
      .channel('ai_chat_messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `is_ai_conversation=eq.true`
      }, (payload) => {
        const newMessage = payload.new as ChatMessage
        if (newMessage.user_id === user?.id) {
          setMessages(prev => [...prev, newMessage])
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user?.id])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !user || sending) return

    setSending(true)
    try {
      const conversation = await createAIConversation(user.id, message.trim())
      setMessage("")

      // Messages will be added via real-time subscription
    } catch (error) {
      console.error("Failed to send message to AI:", error)
    } finally {
      setSending(false)
    }
  }

  const handleClearConversation = async () => {
    if (!user) return

    try {
      await clearAIConversation(user.id)
      setMessages([])
    } catch (error) {
      console.error("Failed to clear conversation:", error)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">AI Mental Health Assistant</h1>
        <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
          Chat with our AI assistant for supportive conversations and mental health guidance
        </p>
      </div>

      {/* Safety Notice */}
      <Card className="p-3 sm:p-4 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-2 sm:gap-3">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-foreground text-sm sm:text-base">Important Notice</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              This AI assistant provides general support and information only. It is not a licensed therapist and cannot provide professional mental health treatment. For personalized care, please consult with qualified mental health professionals through HealSpace.
            </p>
          </div>
        </div>
      </Card>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Sidebar */}
        <Card className="lg:col-span-1 p-3 sm:p-4">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              <span className="font-semibold text-sm sm:text-base">AI Assistant</span>
            </div>

            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm font-medium">HealSpace AI</p>
              <p className="text-xs text-muted-foreground mt-1">Always here to listen</p>
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearConversation}
                className="w-full text-xs sm:text-sm"
                disabled={messages.length === 0}
              >
                <RotateCcw className="w-3 h-3 mr-2" />
                Clear Chat
              </Button>
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Capabilities</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Active listening</li>
                <li>• Coping strategies</li>
                <li>• Resource suggestions</li>
                <li>• Emotional validation</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Chat Messages */}
        <Card className="lg:col-span-3 flex flex-col h-[500px] sm:h-[600px]">
          {/* Chat Header */}
          <div className="p-3 sm:p-4 border-b border-border">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">HealSpace AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Compassionate AI support</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Online
              </Badge>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-muted-foreground">Loading conversation...</div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">Start a conversation with our AI assistant</p>
                  <p className="text-sm text-muted-foreground mt-2">Share what's on your mind - I'm here to listen.</p>
                </div>
              </div>
            ) : (
              messages.map((msg) => {
                const isAIResponse = msg.is_ai_response
                const timeString = new Date(msg.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })

                return (
                  <div key={msg.id} className={`flex ${isAIResponse ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[85%] sm:max-w-[70%] rounded-lg p-2 sm:p-3 ${
                        isAIResponse
                          ? "bg-secondary text-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {isAIResponse ? (
                          <Bot className="w-3 h-3 text-primary" />
                        ) : (
                          <User className="w-3 h-3" />
                        )}
                        <span className="text-xs font-medium">
                          {isAIResponse ? "AI Assistant" : "You"}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm">{msg.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          isAIResponse ? "text-muted-foreground" : "text-primary-foreground/70"
                        }`}
                      >
                        {timeString}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share what's on your mind..."
                className="flex-1 border-border focus:border-primary text-sm"
                disabled={sending}
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 flex-shrink-0"
                disabled={sending || !message.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Your conversation is private and anonymous. Remember, this AI provides general support only.
            </p>
          </form>
        </Card>
      </div>
    </div>
  )
}