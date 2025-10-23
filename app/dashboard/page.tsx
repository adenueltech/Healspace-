"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  MessageCircle,
  Users,
  BookOpen,
  TrendingUp,
  Calendar,
  Heart,
  Smile,
  Meh,
  Frown,
  ArrowRight,
  Bot,
} from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { getDashboardStats, getMoodHistory, getRecentActivity, getUpcomingSessions } from "@/lib/dashboard"
import type { User } from "@/lib/supabase"

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState({
    chatSessions: 0,
    journalEntries: 0,
    supportGroups: 0,
    currentMood: 5
  })
  const [moodHistory, setMoodHistory] = useState<any[]>([])
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [upcomingSessions, setUpcomingSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) return

        setUser(currentUser)

        const [dashboardStats, moodData, activityData, sessionsData] = await Promise.all([
          getDashboardStats(currentUser.id),
          getMoodHistory(currentUser.id),
          getRecentActivity(currentUser.id),
          getUpcomingSessions(currentUser.id)
        ])

        setStats(dashboardStats)
        setMoodHistory(moodData)
        setRecentActivity(activityData)
        setUpcomingSessions(sessionsData)
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user?.full_name || 'User'}
        </h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your mental wellness journey today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Chat Sessions</CardTitle>
            <MessageCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.chatSessions}</div>
            <p className="text-xs text-muted-foreground mt-1">Total chat sessions</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Support Groups</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.supportGroups}</div>
            <p className="text-xs text-muted-foreground mt-1">Active memberships</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Journal Entries</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.journalEntries}</div>
            <p className="text-xs text-muted-foreground mt-1">Total entries</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">14 days</div>
            <p className="text-xs text-muted-foreground mt-1">Keep it up!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Start your wellness activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <Button className="h-auto flex-col items-start p-4 bg-primary hover:bg-accent text-white">
                  <MessageCircle className="h-5 w-5 mb-2" />
                  <span className="font-semibold">Start Anonymous Chat</span>
                  <span className="text-xs opacity-90 mt-1">Connect with a peer supporter</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto flex-col items-start p-4 border-primary/30 hover:bg-secondary bg-transparent"
                >
                  <BookOpen className="h-5 w-5 mb-2 text-primary" />
                  <span className="font-semibold">Write in Journal</span>
                  <span className="text-xs text-muted-foreground mt-1">Express your thoughts</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto flex-col items-start p-4 border-primary/30 hover:bg-secondary bg-transparent"
                >
                  <Heart className="h-5 w-5 mb-2 text-primary" />
                  <span className="font-semibold">Log Your Mood</span>
                  <span className="text-xs text-muted-foreground mt-1">Track how you're feeling</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto flex-col items-start p-4 border-primary/30 hover:bg-secondary bg-transparent"
                >
                  <Bot className="h-5 w-5 mb-2 text-primary" />
                  <span className="font-semibold">Chat with AI</span>
                  <span className="text-xs text-muted-foreground mt-1">Get instant support</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto flex-col items-start p-4 border-primary/30 hover:bg-secondary bg-transparent"
                >
                  <Users className="h-5 w-5 mb-2 text-primary" />
                  <span className="font-semibold">Join Support Group</span>
                  <span className="text-xs text-muted-foreground mt-1">Connect with community</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Mood Tracker */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Your Mood This Week</CardTitle>
              <CardDescription>Track your emotional wellness journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-end justify-between gap-2 h-32">
                  {moodHistory.slice(0, 7).reverse().map((entry, index) => {
                    const moodScore = entry.mood_score
                    const moodType = moodScore >= 7 ? "happy" : moodScore >= 4 ? "neutral" : "sad"
                    const date = new Date(entry.created_at).toLocaleDateString('en-US', { weekday: 'short' })

                    return (
                      <div key={index} className="flex flex-col items-center gap-2 flex-1">
                        <div
                          className="w-full bg-primary/20 rounded-t-lg hover:bg-primary/30 transition-colors relative"
                          style={{ height: `${moodScore * 10}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                            {moodType === "happy" && <Smile className="h-5 w-5 text-green-500" />}
                            {moodType === "neutral" && <Meh className="h-5 w-5 text-yellow-500" />}
                            {moodType === "sad" && <Frown className="h-5 w-5 text-red-500" />}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{date}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="text-sm text-muted-foreground">Happy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span className="text-sm text-muted-foreground">Neutral</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="text-sm text-muted-foreground">Sad</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest wellness activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const timeAgo = new Date(activity.date).toLocaleDateString()
                  const activityTitles = {
                    chat: "Anonymous Chat Session",
                    journal: "Journal Entry",
                    mood: "Mood Check-in",
                    group: "Support Group Activity"
                  }

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {activity.type === "chat" && <MessageCircle className="h-5 w-5 text-primary" />}
                        {activity.type === "journal" && <BookOpen className="h-5 w-5 text-primary" />}
                        {activity.type === "group" && <Users className="h-5 w-5 text-primary" />}
                        {activity.type === "mood" && <Heart className="h-5 w-5 text-primary" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activityTitles[activity.type as keyof typeof activityTitles]}</p>
                        <p className="text-xs text-muted-foreground">{timeAgo}</p>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                        completed
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Upcoming Sessions */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Your scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSessions.length > 0 ? upcomingSessions.map((session) => (
                  <div key={session.id} className="p-4 rounded-lg bg-secondary/50 border border-primary/10">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{session.notes || "Therapy Session"}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(session.scheduled_at).toLocaleDateString()} at {new Date(session.scheduled_at).toLocaleTimeString()}
                        </p>
                        <p className="text-xs text-primary mt-1">Professional Therapist</p>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No upcoming sessions</p>
                    <p className="text-sm">Book your first therapy session</p>
                  </div>
                )}
                <Button variant="outline" className="w-full border-primary/30 hover:bg-secondary bg-transparent">
                  View All Sessions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Wellness Goals */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Wellness Goals</CardTitle>
              <CardDescription>Track your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Daily Mood Check-in</span>
                    <span className="text-sm text-muted-foreground">7/7</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Weekly Journal Entries</span>
                    <span className="text-sm text-muted-foreground">4/5</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Support Group Sessions</span>
                    <span className="text-sm text-muted-foreground">2/3</span>
                  </div>
                  <Progress value={66} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Motivational Quote */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-foreground italic">
                  "You are not your illness. You have an individual story to tell. You have a name, a history, a
                  personality. Staying yourself is part of the battle."
                </p>
                <p className="text-xs text-muted-foreground">— Julian Seifter</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
