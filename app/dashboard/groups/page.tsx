"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Search, Clock, Lock, Globe, Plus, TrendingUp } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import { getSupportGroups, joinSupportGroup } from "@/lib/dashboard"
import type { User, SupportGroup } from "@/lib/supabase"

const mockGroups = [
  {
    id: 1,
    name: "Anxiety Support Circle",
    description: "A safe space to discuss anxiety management techniques and share experiences",
    members: 234,
    online: 12,
    category: "Anxiety",
    privacy: "public",
    nextSession: "Today, 3:00 PM",
    joined: true,
  },
  {
    id: 2,
    name: "Depression Recovery",
    description: "Supporting each other through depression with empathy and understanding",
    members: 189,
    online: 8,
    category: "Depression",
    privacy: "public",
    nextSession: "Tomorrow, 10:00 AM",
    joined: true,
  },
  {
    id: 3,
    name: "Work-Life Balance",
    description: "Discussing strategies for maintaining healthy work-life boundaries",
    members: 156,
    online: 15,
    category: "Stress",
    privacy: "public",
    nextSession: "Today, 6:00 PM",
    joined: false,
  },
  {
    id: 4,
    name: "Student Mental Health",
    description: "For students dealing with academic pressure and mental health challenges",
    members: 312,
    online: 23,
    category: "Student Life",
    privacy: "public",
    nextSession: "Wed, 4:00 PM",
    joined: false,
  },
  {
    id: 5,
    name: "Mindfulness Practice",
    description: "Daily mindfulness exercises and meditation guidance",
    members: 445,
    online: 34,
    category: "Wellness",
    privacy: "public",
    nextSession: "Today, 7:00 AM",
    joined: true,
  },
  {
    id: 6,
    name: "LGBTQ+ Safe Space",
    description: "A supportive community for LGBTQ+ individuals to share and connect",
    members: 198,
    online: 11,
    category: "Identity",
    privacy: "private",
    nextSession: "Fri, 5:00 PM",
    joined: false,
  },
]

const categories = ["All", "Anxiety", "Depression", "Stress", "Student Life", "Wellness", "Identity"]

interface ExtendedSupportGroup extends SupportGroup {
   members: number
   online: number
   privacy: string
   nextSession: string
   joined: boolean
}

export default function GroupsPage() {
   const [user, setUser] = useState<User | null>(null)
   const [groups, setGroups] = useState<ExtendedSupportGroup[]>([])
   const [selectedCategory, setSelectedCategory] = useState("All")
   const [searchQuery, setSearchQuery] = useState("")
   const [loading, setLoading] = useState(true)
   const [joining, setJoining] = useState<string | null>(null)

   useEffect(() => {
     async function initializeGroups() {
       try {
         const currentUser = await getCurrentUser()
         if (!currentUser) return

         setUser(currentUser)

         // Load support groups from database
         const supportGroups = await getSupportGroups()
         const formattedGroups = supportGroups.map(group => ({
           ...group,
           members: 0, // Mock for now
           online: Math.floor(Math.random() * 20), // Mock online count
           privacy: group.is_private ? "private" : "public",
           nextSession: "Today, 3:00 PM", // Mock session time
           joined: false, // Will be determined by membership check
         }))
         setGroups(formattedGroups)
       } catch (error) {
         console.error("Failed to load support groups:", error)
       } finally {
         setLoading(false)
       }
     }

     initializeGroups()
   }, [])

   const handleJoinGroup = async (groupId: string) => {
     if (!user) return

     setJoining(groupId)
     try {
       await joinSupportGroup(user.id, groupId)
       setGroups(prev => prev.map(group =>
         group.id === groupId ? { ...group, joined: true } : group
       ))
     } catch (error) {
       console.error("Failed to join group:", error)
     } finally {
       setJoining(null)
     }
   }

   const filteredGroups = groups.filter((group) => {
     const matchesCategory = selectedCategory === "All" || group.category === selectedCategory
     const matchesSearch =
       group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       group.description.toLowerCase().includes(searchQuery.toLowerCase())
     return matchesCategory && matchesSearch
   })

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-sage-800">Support Groups</h1>
          <p className="text-sage-600 mt-2">Join communities of people who understand what you're going through</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-sage-600">Loading support groups...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-sage-800">Support Groups</h1>
          <p className="text-sage-600 mt-2">Join communities of people who understand what you're going through</p>
        </div>
        <Button className="bg-sage-600 hover:bg-sage-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-sage-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-sage-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-sage-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-sage-800">3</p>
              <p className="text-sm text-sage-600">Groups Joined</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-sage-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-sage-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-sage-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-sage-800">12</p>
              <p className="text-sm text-sage-600">Sessions Attended</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-sage-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-sage-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-sage-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-sage-800">2</p>
              <p className="text-sm text-sage-600">Upcoming Today</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search support groups..."
              className="pl-10 border-sage-200 focus:border-sage-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-sage-600 hover:bg-sage-700"
                    : "border-sage-200 text-sage-700 hover:bg-sage-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="p-6 border-sage-200 hover:shadow-lg transition-all">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-sage-800">{group.name}</h3>
                    {group.privacy === "private" ? (
                      <Lock className="w-4 h-4 text-sage-500" />
                    ) : (
                      <Globe className="w-4 h-4 text-sage-500" />
                    )}
                  </div>
                  <p className="text-sm text-sage-600">{group.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-sage-600">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{group.members} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>{group.online} online</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge className="bg-sage-100 text-sage-700 hover:bg-sage-100">{group.category}</Badge>
                <div className="flex items-center gap-1 text-xs text-sage-600">
                  <Clock className="w-3 h-3" />
                  <span>{group.nextSession}</span>
                </div>
              </div>

              <div className="pt-2">
                {group.joined ? (
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-sage-600 hover:bg-sage-700">Join Session</Button>
                    <Button variant="outline" className="border-sage-200 text-sage-700 hover:bg-sage-50 bg-transparent">
                      View
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="w-full bg-sage-600 hover:bg-sage-700"
                    onClick={() => handleJoinGroup(group.id)}
                    disabled={joining === group.id}
                  >
                    {joining === group.id ? "Joining..." : "Join Group"}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
