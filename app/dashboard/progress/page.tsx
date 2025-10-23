"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Target,
  Award,
  Calendar,
  Activity,
  Heart,
  Brain,
  Users,
  BookOpen,
  Smile,
  CheckCircle2,
  Clock,
} from "lucide-react"

const goals = [
  {
    id: 1,
    title: "Daily Meditation",
    description: "Meditate for 10 minutes every day",
    progress: 75,
    current: 21,
    target: 28,
    unit: "days",
    category: "Mindfulness",
    streak: 7,
  },
  {
    id: 2,
    title: "Journal Regularly",
    description: "Write 3 journal entries per week",
    progress: 66,
    current: 8,
    target: 12,
    unit: "entries",
    category: "Self-Reflection",
    streak: 4,
  },
  {
    id: 3,
    title: "Attend Support Groups",
    description: "Join 2 group sessions weekly",
    progress: 87,
    current: 7,
    target: 8,
    unit: "sessions",
    category: "Community",
    streak: 3,
  },
  {
    id: 4,
    title: "Mood Tracking",
    description: "Log mood daily for a month",
    progress: 93,
    current: 28,
    target: 30,
    unit: "days",
    category: "Awareness",
    streak: 28,
  },
]

const achievements = [
  {
    id: 1,
    title: "First Step",
    description: "Completed your first journal entry",
    icon: BookOpen,
    unlocked: true,
    date: "Dec 15, 2024",
  },
  {
    id: 2,
    title: "Week Warrior",
    description: "Logged mood for 7 consecutive days",
    icon: Calendar,
    unlocked: true,
    date: "Dec 22, 2024",
  },
  {
    id: 3,
    title: "Community Builder",
    description: "Joined your first support group",
    icon: Users,
    unlocked: true,
    date: "Dec 28, 2024",
  },
  {
    id: 4,
    title: "Mindful Master",
    description: "Complete 30 days of meditation",
    icon: Brain,
    unlocked: false,
    date: null,
  },
  {
    id: 5,
    title: "Support Star",
    description: "Help 10 peers in anonymous chat",
    icon: Heart,
    unlocked: false,
    date: null,
  },
  {
    id: 6,
    title: "Consistency Champion",
    description: "Maintain a 30-day streak",
    icon: Award,
    unlocked: false,
    date: null,
  },
]

const milestones = [
  {
    date: "Jan 8, 2025",
    title: "Completed Anxiety Management Workshop",
    description: "Learned new coping strategies and breathing techniques",
    type: "achievement",
  },
  {
    date: "Jan 5, 2025",
    title: "Reached 100 Journal Entries",
    description: "Milestone in self-reflection journey",
    type: "milestone",
  },
  {
    date: "Dec 28, 2024",
    title: "Joined First Support Group",
    description: "Connected with the Anxiety Support Circle community",
    type: "achievement",
  },
  {
    date: "Dec 15, 2024",
    title: "Started HealSpace Journey",
    description: "Took the first step towards better mental health",
    type: "milestone",
  },
]

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-sage-800">Progress</h1>
        <p className="text-sage-600 mt-2">Track your mental health journey and celebrate your wins</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-sage-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-sage-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-sage-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-sage-800">24</p>
              <p className="text-sm text-sage-600">Days Active</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-sage-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-sage-800">12</p>
              <p className="text-sm text-sage-600">Goals Completed</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-sage-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-sage-800">3</p>
              <p className="text-sm text-sage-600">Achievements</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-sage-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-sage-100 flex items-center justify-center">
              <Activity className="w-6 h-6 text-sage-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-sage-800">28</p>
              <p className="text-sm text-sage-600">Day Streak</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Active Goals */}
      <Card className="p-6 border-sage-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-sage-800">Active Goals</h2>
          <Button className="bg-sage-600 hover:bg-sage-700">
            <Target className="w-4 h-4 mr-2" />
            New Goal
          </Button>
        </div>

        <div className="space-y-6">
          {goals.map((goal) => (
            <div key={goal.id} className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sage-800">{goal.title}</h3>
                    <Badge className="bg-sage-100 text-sage-700 hover:bg-sage-100">{goal.category}</Badge>
                  </div>
                  <p className="text-sm text-sage-600">{goal.description}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-sage-500" />
                  <span className="text-sage-600">{goal.streak} day streak</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-sage-600">
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                  <span className="font-medium text-sage-800">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2 bg-sage-100" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6 border-sage-200">
        <h2 className="text-xl font-semibold text-sage-800 mb-6">Achievements</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked ? "bg-sage-50 border-sage-300" : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                    achievement.unlocked ? "bg-sage-600" : "bg-gray-300"
                  }`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`font-semibold mb-1 ${achievement.unlocked ? "text-sage-800" : "text-gray-600"}`}>
                  {achievement.title}
                </h3>
                <p className={`text-sm mb-2 ${achievement.unlocked ? "text-sage-600" : "text-gray-500"}`}>
                  {achievement.description}
                </p>
                {achievement.unlocked && achievement.date && (
                  <p className="text-xs text-sage-500">Unlocked {achievement.date}</p>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {/* Timeline */}
      <Card className="p-6 border-sage-200">
        <h2 className="text-xl font-semibold text-sage-800 mb-6">Journey Timeline</h2>

        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    milestone.type === "achievement" ? "bg-yellow-100" : "bg-sage-100"
                  }`}
                >
                  {milestone.type === "achievement" ? (
                    <Award className="w-5 h-5 text-yellow-600" />
                  ) : (
                    <Smile className="w-5 h-5 text-sage-600" />
                  )}
                </div>
                {index < milestones.length - 1 && <div className="w-0.5 h-full bg-sage-200 mt-2" />}
              </div>
              <div className="flex-1 pb-6">
                <p className="text-sm text-sage-500 mb-1">{milestone.date}</p>
                <h3 className="font-semibold text-sage-800 mb-1">{milestone.title}</h3>
                <p className="text-sm text-sage-600">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
