"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Search, MessageCircle, Shield, Clock, Menu } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { getChatMessages, sendChatMessage } from "@/lib/dashboard"
import { supabase } from "@/lib/supabase"
import type { ChatMessage, User } from "@/lib/supabase"

export default function ChatPage() {
  const [user, setUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [showChatList, setShowChatList] = useState(false)

  useEffect(() => {
    async function initializeChat() {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) return

        setUser(currentUser)

        // Load chat messages for this user only
        const chatMessages = await getChatMessages(undefined, 50)
        // Filter messages for this user
        const userMessages = chatMessages.filter(msg => msg.user_id === currentUser.id)
        setMessages(userMessages)
      } catch (error) {
        console.error("Failed to initialize chat:", error)
      } finally {
        setLoading(false)
      }
    }

    initializeChat()

    // Subscribe to real-time messages for this user only
    const channel = supabase
      .channel('chat_messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages'
      }, (payload) => {
        const newMessage = payload.new as ChatMessage
        // Only add messages from this user
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
      await sendChatMessage(user.id, message.trim())
      setMessage("")
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Chat History</h1>
        <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
          View your private chat conversations
        </p>
      </div>

      {/* Safety Notice */}
      <Card className="p-3 sm:p-4 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-2 sm:gap-3">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-foreground text-sm sm:text-base">Your Privacy is Protected</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Your chat history is private and secure. Only you can see your messages.
            </p>
          </div>
        </div>
      </Card>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Button onClick={() => setShowChatList(!showChatList)} className="lg:hidden mb-2" variant="outline">
          <Menu className="w-4 h-4 mr-2" />
          {showChatList ? "Hide" : "Show"} Chats
        </Button>

        <Card className={`lg:col-span-1 p-3 sm:p-4 ${showChatList ? "block" : "hidden lg:block"}`}>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-semibold text-foreground text-sm sm:text-base">Chat Room</h2>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-xs sm:text-sm">
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Join Room
              </Button>
            </div>

            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">Your personal chat history</p>
              <p className="text-xs mt-2">Messages are private and for your account only</p>
            </div>
          </div>
        </Card>

        {/* Chat Messages */}
        <Card className="lg:col-span-2 flex flex-col h-[500px] sm:h-[600px]">
          {/* Chat Header */}
          <div className="p-3 sm:p-4 border-b border-border">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">Your Chat History</h3>
                  <p className="text-xs text-muted-foreground">Private conversations for your account</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Live
              </Badge>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-muted-foreground">Loading messages...</div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
                </div>
              </div>
            ) : (
              messages.map((msg) => {
                const isOwnMessage = msg.user_id === user?.id
                const timeString = new Date(msg.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })

                return (
                  <div key={msg.id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] sm:max-w-[70%] rounded-lg p-2 sm:p-3 ${
                        isOwnMessage ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                      }`}
                    >
                      <p className="text-xs sm:text-sm">{msg.content}</p>
                      <p
                        className={`text-xs mt-1 ${isOwnMessage ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                      >
                        {timeString}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your anonymous message..."
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
              Your message will be sent privately and securely
            </p>
          </form>
        </Card>
      </div>
    </div>
  )
}
