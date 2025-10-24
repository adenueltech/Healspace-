"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { BookOpen, Plus, Search, Calendar, Smile, Meh, Frown, Heart, Star, Trash2, Laugh, Angry } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { createJournalEntry, getJournalEntries } from "@/lib/dashboard"
import type { User } from "@/lib/supabase"


const moodIcons: Record<string, { icon: React.ComponentType<any>, color: string, bg: string }> = {
    amazing: { icon: Laugh, color: "text-green-700", bg: "bg-green-100" },
    good: { icon: Smile, color: "text-green-600", bg: "bg-green-100" },
    okay: { icon: Meh, color: "text-yellow-600", bg: "bg-yellow-100" },
    difficult: { icon: Frown, color: "text-orange-600", bg: "bg-orange-100" },
    terrible: { icon: Angry, color: "text-red-600", bg: "bg-red-100" },
}

function calculateStreak(entries: any[]) {
  if (entries.length === 0) return 0

  const sortedEntries = entries.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let streak = 0
  let currentDate = new Date(today)

  for (const entry of sortedEntries) {
    const entryDate = new Date(entry.created_at)
    entryDate.setHours(0, 0, 0, 0)

    if (entryDate.getTime() === currentDate.getTime()) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else if (entryDate.getTime() < currentDate.getTime()) {
      break
    }
  }

  return streak
}

export default function JournalPage() {
    const [user, setUser] = useState<User | null>(null)
    const [entries, setEntries] = useState<any[]>([])
    const [isWriting, setIsWriting] = useState(false)
    const [newEntry, setNewEntry] = useState({ title: "", content: "", mood: "okay", tags: "" })
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

   useEffect(() => {
     async function initializeJournal() {
       try {
         const currentUser = await getCurrentUser()
         if (!currentUser) return

         setUser(currentUser)
         const journalEntries = await getJournalEntries(currentUser.id)
         setEntries(journalEntries)
       } catch (error) {
         console.error("Failed to load journal:", error)
       } finally {
         setLoading(false)
       }
     }

     initializeJournal()
   }, [])

   const handleSaveEntry = async () => {
     if (!newEntry.title || !newEntry.content || !user) return

     setSaving(true)
     try {
       const moodScore = { amazing: 5, good: 4, okay: 3, difficult: 2, terrible: 1 }[newEntry.mood] || 3
       const tags = newEntry.tags.split(",").map(tag => tag.trim()).filter(Boolean)

       await createJournalEntry(user.id, newEntry.title, newEntry.content, tags, moodScore)

       const savedEntry = await createJournalEntry(user.id, newEntry.title, newEntry.content, tags, moodScore)
       setEntries([savedEntry, ...entries])
       setNewEntry({ title: "", content: "", mood: "okay", tags: "" })
       setIsWriting(false)
     } catch (error) {
       console.error("Failed to save journal entry:", error)
     } finally {
       setSaving(false)
     }
   }

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-sage-800">Journal</h1>
          <p className="text-sage-600 mt-2">Express your thoughts and track your mental health journey</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-sage-600">Loading journal...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-sage-800">Journal</h1>
          <p className="text-sage-600 mt-2">Express your thoughts and track your mental health journey</p>
        </div>
        <Button onClick={() => setIsWriting(!isWriting)} className="bg-sage-600 hover:bg-sage-700">
          <Plus className="w-4 h-4 mr-2" />
          New Entry
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-sage-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-sage-100 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-sage-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-sage-800">{entries.length}</p>
              <p className="text-sm text-sage-600">Total Entries</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-sage-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Smile className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-sage-800">{entries.filter((e) => (e.mood_score || 0) >= 4).length}</p>
              <p className="text-sm text-sage-600">Happy Days</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-sage-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-sage-100 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-sage-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-sage-800">{calculateStreak(entries)}</p>
              <p className="text-sm text-sage-600">Day Streak</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-sage-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-sage-100 flex items-center justify-center">
              <Star className="w-6 h-6 text-sage-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-sage-800">{entries.filter((e) => e.is_favorite).length}</p>
              <p className="text-sm text-sage-600">Favorites</p>
            </div>
          </div>
        </Card>
      </div>

      {/* New Entry Form */}
      {isWriting && (
        <Card className="p-6 border-sage-200">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-sage-800">New Journal Entry</h2>

            <div>
              <label className="text-sm font-medium text-sage-700 mb-2 block">Title</label>
              <Input
                value={newEntry.title}
                onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                placeholder="Give your entry a title..."
                className="border-sage-200 focus:border-sage-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-sage-700 mb-2 block">How are you feeling?</label>
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(moodIcons).map(([mood, { icon: Icon, color, bg }]) => (
                  <button
                    key={mood}
                    onClick={() => setNewEntry({ ...newEntry, mood })}
                    className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1 ${
                      newEntry.mood === mood ? `${bg} border-sage-400` : "bg-white border-sage-200 hover:bg-sage-50"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${newEntry.mood === mood ? color : "text-sage-400"}`} />
                    <span className={`text-xs capitalize ${newEntry.mood === mood ? color : "text-sage-600"}`}>
                      {mood}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-sage-700 mb-2 block">Your thoughts</label>
              <Textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                placeholder="Write about your day, feelings, or anything on your mind..."
                className="min-h-[200px] border-sage-200 focus:border-sage-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-sage-700 mb-2 block">Tags (comma separated)</label>
              <Input
                value={newEntry.tags}
                onChange={(e) => setNewEntry({ ...newEntry, tags: e.target.value })}
                placeholder="e.g., anxiety, work, progress"
                className="border-sage-200 focus:border-sage-400"
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSaveEntry} className="bg-sage-600 hover:bg-sage-700" disabled={saving}>
                {saving ? "Saving..." : "Save Entry"}
              </Button>
              <Button
                onClick={() => setIsWriting(false)}
                variant="outline"
                className="border-sage-200 text-sage-700 hover:bg-sage-50 bg-transparent"
                disabled={saving}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your journal entries..."
            className="pl-10 border-sage-200 focus:border-sage-400"
          />
        </div>
      </Card>

      {/* Entries */}
      <div className="space-y-4">
        {filteredEntries.map((entry) => {
            const moodScore = entry.mood_score || 3
            const moodKey = moodScore >= 5 ? 'amazing' : moodScore >= 4 ? 'good' : moodScore >= 3 ? 'okay' : moodScore >= 2 ? 'difficult' : 'terrible'
            const moodData = moodIcons[moodKey as keyof typeof moodIcons]
            const MoodIcon = moodData?.icon || moodIcons.okay.icon
          return (
            <Card key={entry.id} className="p-6 border-sage-200 hover:shadow-lg transition-all">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${moodData.bg}`}>
                        <MoodIcon className={`w-5 h-5 ${moodData.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-sage-800">{entry.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-sage-600">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(entry.created_at).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sage-700 leading-relaxed">{entry.content}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="text-sage-600 hover:text-sage-700 hover:bg-sage-50">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <Badge key={tag} className="bg-sage-100 text-sage-700 hover:bg-sage-100">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
