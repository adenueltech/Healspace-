"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { BookOpen, Plus, Search, Calendar, Smile, Meh, Frown, Heart, Star, Trash2 } from "lucide-react"

const mockEntries = [
  {
    id: 1,
    title: "Feeling Better Today",
    content:
      "Had a great therapy session this morning. We talked about coping strategies and I feel more equipped to handle stress. The breathing exercises really help.",
    date: "2025-01-08",
    mood: "happy",
    tags: ["therapy", "progress", "coping"],
  },
  {
    id: 2,
    title: "Challenging Day at Work",
    content:
      "Work was overwhelming today. Multiple deadlines and feeling the pressure. But I remembered to take breaks and practice mindfulness. Small wins.",
    date: "2025-01-07",
    mood: "neutral",
    tags: ["work", "stress", "mindfulness"],
  },
  {
    id: 3,
    title: "Grateful for Support",
    content:
      "Joined a new support group today. It's comforting to know I'm not alone in this journey. Everyone was so welcoming and understanding.",
    date: "2025-01-06",
    mood: "happy",
    tags: ["support", "community", "gratitude"],
  },
  {
    id: 4,
    title: "Struggling with Anxiety",
    content:
      "Anxiety was high today. Couldn't focus on anything. Reached out to my support network and that helped a bit. Tomorrow is a new day.",
    date: "2025-01-05",
    mood: "sad",
    tags: ["anxiety", "support"],
  },
]

const moodIcons = {
  happy: { icon: Smile, color: "text-green-600", bg: "bg-green-100" },
  neutral: { icon: Meh, color: "text-yellow-600", bg: "bg-yellow-100" },
  sad: { icon: Frown, color: "text-red-600", bg: "bg-red-100" },
}

export default function JournalPage() {
  const [entries, setEntries] = useState(mockEntries)
  const [isWriting, setIsWriting] = useState(false)
  const [newEntry, setNewEntry] = useState({ title: "", content: "", mood: "neutral", tags: "" })
  const [searchQuery, setSearchQuery] = useState("")

  const handleSaveEntry = () => {
    if (!newEntry.title || !newEntry.content) return

    const entry = {
      id: entries.length + 1,
      title: newEntry.title,
      content: newEntry.content,
      date: new Date().toISOString().split("T")[0],
      mood: newEntry.mood as "happy" | "neutral" | "sad",
      tags: newEntry.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    setEntries([entry, ...entries])
    setNewEntry({ title: "", content: "", mood: "neutral", tags: "" })
    setIsWriting(false)
  }

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

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
              <p className="text-2xl font-bold text-sage-800">{entries.filter((e) => e.mood === "happy").length}</p>
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
              <p className="text-2xl font-bold text-sage-800">7</p>
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
              <p className="text-2xl font-bold text-sage-800">3</p>
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
              <div className="flex gap-3">
                {Object.entries(moodIcons).map(([mood, { icon: Icon, color, bg }]) => (
                  <button
                    key={mood}
                    onClick={() => setNewEntry({ ...newEntry, mood })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      newEntry.mood === mood ? `${bg} border-sage-400` : "bg-white border-sage-200 hover:bg-sage-50"
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${newEntry.mood === mood ? color : "text-sage-400"}`} />
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
              <Button onClick={handleSaveEntry} className="bg-sage-600 hover:bg-sage-700">
                Save Entry
              </Button>
              <Button
                onClick={() => setIsWriting(false)}
                variant="outline"
                className="border-sage-200 text-sage-700 hover:bg-sage-50 bg-transparent"
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
          const MoodIcon = moodIcons[entry.mood].icon
          return (
            <Card key={entry.id} className="p-6 border-sage-200 hover:shadow-lg transition-all">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${moodIcons[entry.mood].bg}`}>
                        <MoodIcon className={`w-5 h-5 ${moodIcons[entry.mood].color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-sage-800">{entry.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-sage-600">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(entry.date).toLocaleDateString("en-US", {
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
