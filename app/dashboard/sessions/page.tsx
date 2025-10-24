"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MessageSquare,
  User,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { getUpcomingSessions } from "@/lib/dashboard"
import type { User as UserType, TherapySession } from "@/lib/supabase"




export default function SessionsPage() {
   const [user, setUser] = useState<UserType | null>(null)
   const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "book">("upcoming")
   const [searchQuery, setSearchQuery] = useState("")
   const [loading, setLoading] = useState(true)
   const [sessions, setSessions] = useState<TherapySession[]>([])

   useEffect(() => {
     async function loadSessions() {
       try {
         const currentUser = await getCurrentUser()
         if (!currentUser) return

         setUser(currentUser)

         // Load sessions from database
         const userSessions = await getUpcomingSessions(currentUser.id)
         setSessions(userSessions)
       } catch (error) {
         console.error("Failed to load sessions:", error)
       } finally {
         setLoading(false)
       }
     }

     loadSessions()
   }, [])

   const getSessionIcon = (type: string) => {
    switch (type) {
      case "video":
        return Video
      case "phone":
        return Phone
      case "chat":
        return MessageSquare
      default:
        return Video
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Confirmed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-sage-800">Therapy Sessions</h1>
          <p className="text-sage-600 mt-2">Manage your professional therapy appointments</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-sage-600">Loading sessions...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-sage-800">Therapy Sessions</h1>
          <p className="text-sage-600 mt-2">Manage your professional therapy appointments</p>
        </div>
        <Button className="bg-sage-600 hover:bg-sage-700">
          <Plus className="w-4 h-4 mr-2" />
          Book Session
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-sage-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-sage-100 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-sage-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-sage-800">{sessions.length}</p>
              <p className="text-sm text-sage-600">Upcoming</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-sage-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-sage-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-sage-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-sage-800">0</p>
              <p className="text-sm text-sage-600">Completed</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-sage-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-sage-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-sage-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-sage-800">25</p>
              <p className="text-sm text-sage-600">Total Hours</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-sage-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-sage-100 flex items-center justify-center">
              <User className="w-6 h-6 text-sage-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-sage-800">2</p>
              <p className="text-sm text-sage-600">Therapists</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Card className="p-1 border-sage-200">
        <div className="flex gap-1">
          <Button
            variant={activeTab === "upcoming" ? "default" : "ghost"}
            onClick={() => setActiveTab("upcoming")}
            className={
              activeTab === "upcoming"
                ? "flex-1 bg-sage-600 hover:bg-sage-700"
                : "flex-1 text-sage-700 hover:bg-sage-50"
            }
          >
            Upcoming
          </Button>
          <Button
            variant={activeTab === "past" ? "default" : "ghost"}
            onClick={() => setActiveTab("past")}
            className={
              activeTab === "past" ? "flex-1 bg-sage-600 hover:bg-sage-700" : "flex-1 text-sage-700 hover:bg-sage-50"
            }
          >
            Past Sessions
          </Button>
          <Button
            variant={activeTab === "book" ? "default" : "ghost"}
            onClick={() => setActiveTab("book")}
            className={
              activeTab === "book" ? "flex-1 bg-sage-600 hover:bg-sage-700" : "flex-1 text-sage-700 hover:bg-sage-50"
            }
          >
            Book New
          </Button>
        </div>
      </Card>

      {/* Upcoming Sessions */}
      {activeTab === "upcoming" && (
        <div className="space-y-4">
          {sessions.length > 0 ? sessions.map((session) => {
            const Icon = getSessionIcon("video") // Default to video for now
            return (
              <Card key={session.id} className="p-6 border-sage-200 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
                      <User className="w-6 h-6 text-sage-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sage-800">Therapy Session</h3>
                        {getStatusBadge(session.status)}
                      </div>
                      <p className="text-sm text-sage-600 mb-3">Professional Therapy</p>

                      <div className="flex flex-wrap gap-4 text-sm text-sage-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(session.scheduled_at).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {new Date(session.scheduled_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit"
                            })} (50 min)
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon className="w-4 h-4" />
                          <span className="capitalize">Video Call</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="bg-sage-600 hover:bg-sage-700">Join Session</Button>
                    <Button variant="outline" className="border-sage-200 text-sage-700 hover:bg-sage-50 bg-transparent">
                      Reschedule
                    </Button>
                  </div>
                </div>
              </Card>
            )
          }) : (
            <div className="text-center py-12 text-sage-600">
              <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No upcoming sessions</p>
              <p className="text-sm mt-2">Book your first therapy session</p>
            </div>
          )}
        </div>
      )}

      {/* Past Sessions */}
      {activeTab === "past" && (
        <div className="space-y-4">
          <div className="text-center py-12 text-sage-600">
            <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No past sessions yet</p>
            <p className="text-sm mt-2">Your completed therapy sessions will appear here</p>
          </div>
        </div>
      )}

      {/* Book New Session */}
      {activeTab === "book" && (
        <div className="space-y-6">
          <Card className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search therapists by name or specialty..."
                className="pl-10 border-sage-200 focus:border-sage-400"
              />
            </div>
          </Card>

          <div className="text-center py-12 text-sage-600">
            <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No therapists available at the moment</p>
            <p className="text-sm mt-2">Therapists will be added soon</p>
          </div>
        </div>
      )}
    </div>
  )
}
