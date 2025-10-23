"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, MessageCircle, X, Minimize2 } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { getChatMessages, sendChatMessage } from "@/lib/dashboard"
import { supabase } from "@/lib/supabase"
import type { ChatMessage, User } from "@/lib/supabase"

interface ChatboxProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Chatbox({ isOpen, onToggle }: ChatboxProps) {
  const [user, setUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      initializeChat()
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const initializeChat = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (!currentUser) return

      setUser(currentUser)

      // Load recent chat messages
      const chatMessages = await getChatMessages(undefined, 20)
      setMessages(chatMessages)
    } catch (error) {
      console.error("Failed to initialize chat:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isOpen) return

    // Subscribe to real-time messages
    const channel = supabase
      .channel('chatbox_messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages'
      }, (payload) => {
        const newMessage = payload.new as ChatMessage
        setMessages(prev => [...prev.slice(-19), newMessage]) // Keep last 20 messages
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [isOpen])

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

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onToggle}
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 h-96 flex flex-col shadow-xl border-primary/20">
        {/* Header */}
        <div className="p-3 border-b border-border bg-primary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="font-semibold text-sm">Anonymous Chat</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                Live
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="h-6 w-6 p-0 hover:bg-secondary"
              >
                <Minimize2 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="h-6 w-6 p-0 hover:bg-secondary"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-muted-foreground text-sm">Loading...</div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-muted-foreground text-xs">Start chatting anonymously!</p>
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
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-xs ${
                      isOwnMessage
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p className={`text-xs mt-1 opacity-70`}>
                      {timeString}
                    </p>
                  </div>
                </div>
              )
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 text-sm h-8"
              disabled={sending}
            />
            <Button
              type="submit"
              size="sm"
              className="h-8 px-3"
              disabled={sending || !message.trim()}
            >
              <Send className="w-3 h-3" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Messages are anonymous and real-time
          </p>
        </form>
      </Card>
    </div>
  )
}