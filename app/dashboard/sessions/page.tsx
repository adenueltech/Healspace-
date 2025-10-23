"use client"

import { useState } from "react"
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

const upcomingSessions = [
  {
    id: 1,
    therapist: "Dr. Sarah Johnson",
    specialty: "Anxiety & Depression",
    date: "2025-01-10",
    time: "2:00 PM",
    duration: "50 min",
    type: "video",
    status: "confirmed",
  },
  {
    id: 2,
    therapist: "Dr. Michael Chen",
    specialty: "Cognitive Behavioral Therapy",
    date: "2025-01-12",
    time: "10:00 AM",
    duration: "50 min",
    type: "video",
    status: "confirmed",
  },
  {
    id: 3,
    therapist: "Dr. Emily Rodriguez",
    specialty: "Stress Management",
    date: "2025-01-15",
    time: "4:00 PM",
    duration: "50 min",
    type: "phone",
    status: "pending",
  },
]

const pastSessions = [
  {
    id: 1,
    therapist: "Dr. Sarah Johnson",
    specialty: "Anxiety & Depression",
    date: "2025-01-03",
    time: "2:00 PM",
    duration: "50 min",
    type: "video",
    notes: "Discussed coping strategies for work-related stress. Homework: practice breathing exercises daily.",
    rating: 5,
  },
  {
    id: 2,
    therapist: "Dr. Michael Chen",
    specialty: "Cognitive Behavioral Therapy",
    date: "2024-12-27",
    time: "10:00 AM",
    duration: "50 min",
    type: "video",
    notes: "Worked on identifying negative thought patterns. Made good progress on reframing techniques.",
    rating: 5,
  },
  {
    id: 3,
    therapist: "Dr. Sarah Johnson",
    specialty: "Anxiety & Depression",
    date: "2024-12-20",
    time: "2:00 PM",
    duration: "50 min",
    type: "video",
    notes: "Initial assessment session. Established treatment goals and discussed therapy approach.",
    rating: 4,
  },
]

const availableTherapists = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Anxiety & Depression",
    experience: "12 years",
    rating: 4.9,
    nextAvailable: "Tomorrow, 2:00 PM",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Cognitive Behavioral Therapy",
    experience: "8 years",
    rating: 4.8,
    nextAvailable: "Today, 6:00 PM",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Stress Management",
    experience: "10 years",
    rating: 4.9,
    nextAvailable: "Jan 12, 4:00 PM",
  },
]

export default function SessionsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "book">("upcoming")
  const [searchQuery, setSearchQuery] = useState("")

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
              <p className="text-2xl font-bold text-sage-800">{upcomingSessions.length}</p>
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
              <p className="text-2xl font-bold text-sage-800">{pastSessions.length}</p>
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
          {upcomingSessions.map((session) => {
            const Icon = getSessionIcon(session.type)
            return (
              <Card key={session.id} className="p-6 border-sage-200 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
                      <User className="w-6 h-6 text-sage-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sage-800">{session.therapist}</h3>
                        {getStatusBadge(session.status)}
                      </div>
                      <p className="text-sm text-sage-600 mb-3">{session.specialty}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-sage-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(session.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {session.time} ({session.duration})
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon className="w-4 h-4" />
                          <span className="capitalize">{session.type} Call</span>
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
          })}
        </div>
      )}

      {/* Past Sessions */}
      {activeTab === "past" && (
        <div className="space-y-4">
          {pastSessions.map((session) => {
            const Icon = getSessionIcon(session.type)
            return (
              <Card key={session.id} className="p-6 border-sage-200">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
                        <User className="w-6 h-6 text-sage-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sage-800 mb-1">{session.therapist}</h3>
                        <p className="text-sm text-sage-600 mb-3">{session.specialty}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-sage-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(session.date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {session.time} ({session.duration})
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon className="w-4 h-4" />
                            <span className="capitalize">{session.type} Call</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < session.rating ? "text-yellow-500" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-sage-50 rounded-lg p-4 border border-sage-200">
                    <p className="text-sm font-medium text-sage-800 mb-1">Session Notes</p>
                    <p className="text-sm text-sage-600">{session.notes}</p>
                  </div>
                </div>
              </Card>
            )
          })}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableTherapists.map((therapist) => (
              <Card key={therapist.id} className="p-6 border-sage-200 hover:shadow-lg transition-all">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center">
                      <User className="w-8 h-8 text-sage-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sage-800 mb-1">{therapist.name}</h3>
                      <p className="text-sm text-sage-600 mb-2">{therapist.specialty}</p>
                      <div className="flex items-center gap-3 text-sm text-sage-600">
                        <span>{therapist.experience} experience</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>{therapist.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-sage-50 rounded-lg p-3 border border-sage-200">
                    <p className="text-sm text-sage-600">
                      <span className="font-medium">Next available:</span> {therapist.nextAvailable}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-sage-600 hover:bg-sage-700">Book Appointment</Button>
                    <Button variant="outline" className="border-sage-200 text-sage-700 hover:bg-sage-50 bg-transparent">
                      View Profile
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
