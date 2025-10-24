"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Smile, Meh, Frown, Angry, Laugh, Calendar, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { logMood, getMoodHistory } from "@/lib/dashboard"
import type { User } from "@/lib/supabase"

interface MoodEntry {
  date: string
  mood: number
  note: string
}

const moodOptions = [
  { value: 5, label: "Amazing", icon: Laugh, color: "text-green-600", bg: "bg-green-100", border: "border-green-400" },
  { value: 4, label: "Good", icon: Smile, color: "text-green-500", bg: "bg-green-50", border: "border-green-300" },
  { value: 3, label: "Okay", icon: Meh, color: "text-yellow-600", bg: "bg-yellow-100", border: "border-yellow-400" },
  {
    value: 2,
    label: "Not Great",
    icon: Frown,
    color: "text-orange-600",
    bg: "bg-orange-100",
    border: "border-orange-400",
  },
  { value: 1, label: "Difficult", icon: Angry, color: "text-red-600", bg: "bg-red-100", border: "border-red-400" },
]


const factors = [
  "Sleep Quality",
  "Exercise",
  "Social Connection",
  "Work Stress",
  "Medication",
  "Weather",
  "Diet",
  "Therapy",
]

export default function MoodTrackerPage() {
   const [user, setUser] = useState<User | null>(null)
   const [selectedMood, setSelectedMood] = useState<number | null>(null)
   const [note, setNote] = useState("")
   const [selectedFactors, setSelectedFactors] = useState<string[]>([])
   const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([])
   const [loading, setLoading] = useState(true)
   const [saving, setSaving] = useState(false)

   useEffect(() => {
     async function initializeMoodTracker() {
       try {
         const currentUser = await getCurrentUser()
         if (!currentUser) return

         setUser(currentUser)

         // Load mood history from database
         const history = await getMoodHistory(currentUser.id, 30)
         const formattedHistory = history.map(entry => ({
           date: new Date(entry.created_at).toISOString().split("T")[0],
           mood: entry.mood_score,
           note: "",
         }))
         setMoodHistory(formattedHistory)
       } catch (error) {
         console.error("Failed to load mood history:", error)
       } finally {
         setLoading(false)
       }
     }

     initializeMoodTracker()
   }, [])

   const handleSaveMood = async () => {
     if (selectedMood === null || !user) return

     setSaving(true)
     try {
       await logMood(user.id, selectedMood, selectedFactors, note)

       const newEntry = {
         date: new Date().toISOString().split("T")[0],
         mood: selectedMood,
         note: note,
       }

       setMoodHistory([newEntry, ...moodHistory])
       setSelectedMood(null)
       setNote("")
       setSelectedFactors([])
     } catch (error) {
       console.error("Failed to save mood:", error)
     } finally {
       setSaving(false)
     }
   }

  const toggleFactor = (factor: string) => {
    setSelectedFactors((prev) => (prev.includes(factor) ? prev.filter((f) => f !== factor) : [...prev, factor]))
  }

  const averageMood = (moodHistory.reduce((sum, entry) => sum + entry.mood, 0) / moodHistory.length).toFixed(1)
  const lastWeekAverage = (
    moodHistory.slice(0, 7).reduce((sum, entry) => sum + entry.mood, 0) / Math.min(7, moodHistory.length)
  ).toFixed(1)
  const trend =
    Number.parseFloat(lastWeekAverage) > Number.parseFloat(averageMood)
      ? "up"
      : Number.parseFloat(lastWeekAverage) < Number.parseFloat(averageMood)
        ? "down"
        : "stable"

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-sage-800">Mood Tracker</h1>
          <p className="text-sage-600 mt-2">Track your emotional well-being and identify patterns</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-sage-600">Loading mood tracker...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-sage-800">Mood Tracker</h1>
        <p className="text-sage-600 mt-2">Track your emotional well-being and identify patterns</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-sage-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-sage-100 flex items-center justify-center">
              <Smile className="w-6 h-6 text-sage-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-sage-800">{averageMood}</p>
              <p className="text-sm text-sage-600">Average Mood</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-sage-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-sage-100 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-sage-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-sage-800">{moodHistory.length}</p>
              <p className="text-sm text-sage-600">Days Tracked</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-sage-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-sage-100 flex items-center justify-center">
              {trend === "up" ? (
                <TrendingUp className="w-6 h-6 text-green-600" />
              ) : trend === "down" ? (
                <TrendingDown className="w-6 h-6 text-red-600" />
              ) : (
                <Minus className="w-6 h-6 text-yellow-600" />
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-sage-800">{lastWeekAverage}</p>
              <p className="text-sm text-sage-600">This Week</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Log Mood */}
      <Card className="p-6 border-sage-200">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-sage-800">How are you feeling today?</h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {moodOptions.map((mood) => {
              const Icon = mood.icon
              return (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedMood === mood.value
                      ? `${mood.bg} ${mood.border} shadow-lg scale-105`
                      : "bg-white border-sage-200 hover:bg-sage-50"
                  }`}
                >
                  <Icon
                    className={`w-12 h-12 mx-auto mb-2 ${selectedMood === mood.value ? mood.color : "text-sage-400"}`}
                  />
                  <p className={`text-sm font-medium ${selectedMood === mood.value ? mood.color : "text-sage-600"}`}>
                    {mood.label}
                  </p>
                </button>
              )
            })}
          </div>

          {selectedMood && (
            <>
              <div>
                <label className="text-sm font-medium text-sage-700 mb-2 block">
                  What factors influenced your mood? (Optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {factors.map((factor) => (
                    <Button
                      key={factor}
                      type="button"
                      size="sm"
                      variant={selectedFactors.includes(factor) ? "default" : "outline"}
                      onClick={() => toggleFactor(factor)}
                      className={
                        selectedFactors.includes(factor)
                          ? "bg-sage-600 hover:bg-sage-700"
                          : "border-sage-200 text-sage-700 hover:bg-sage-50 bg-transparent"
                      }
                    >
                      {factor}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-sage-700 mb-2 block">Add a note (Optional)</label>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What happened today? Any thoughts or reflections..."
                  className="border-sage-200 focus:border-sage-400"
                />
              </div>

              <Button onClick={handleSaveMood} className="bg-sage-600 hover:bg-sage-700" disabled={saving}>
                {saving ? "Saving..." : "Save Mood Entry"}
              </Button>
            </>
          )}
        </div>
      </Card>

      {/* Mood History */}
      <Card className="p-6 border-sage-200">
        <h2 className="text-xl font-semibold text-sage-800 mb-4">Mood History</h2>

        <div className="space-y-3">
          {moodHistory.map((entry, index) => {
            const moodData = moodOptions.find((m) => m.value === entry.mood)
            if (!moodData) return null
            const Icon = moodData.icon

            return (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-sage-50 border border-sage-200">
                <div className={`p-3 rounded-lg ${moodData.bg}`}>
                  <Icon className={`w-6 h-6 ${moodData.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sage-800">{moodData.label}</p>
                    <span className="text-sm text-sage-500">•</span>
                    <p className="text-sm text-sage-600">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  {entry.note && <p className="text-sm text-sage-600">{entry.note}</p>}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Insights */}
      <Card className="p-6 border-sage-200 bg-sage-50">
        <h2 className="text-xl font-semibold text-sage-800 mb-4">Insights</h2>
        <div className="space-y-3 text-sage-700">
          <p>
            <span className="font-medium">Most common mood:</span> Good (appears 3 times this week)
          </p>
          <p>
            <span className="font-medium">Best day:</span> Saturday - You logged "Amazing"
          </p>
          <p>
            <span className="font-medium">Pattern detected:</span> Your mood tends to improve after therapy sessions
          </p>
        </div>
      </Card>
    </div>
  )
}

