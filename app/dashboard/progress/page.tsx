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

        <div className="text-center py-12 text-sage-600">
          <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No goals set yet</p>
          <p className="text-sm mt-2">Create your first goal to start tracking progress</p>
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6 border-sage-200">
        <h2 className="text-xl font-semibold text-sage-800 mb-6">Achievements</h2>

        <div className="text-center py-12 text-sage-600">
          <Award className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No achievements unlocked yet</p>
          <p className="text-sm mt-2">Complete activities to unlock achievements</p>
        </div>
      </Card>

      {/* Timeline */}
      <Card className="p-6 border-sage-200">
        <h2 className="text-xl font-semibold text-sage-800 mb-6">Journey Timeline</h2>

        <div className="text-center py-12 text-sage-600">
          <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No milestones yet</p>
          <p className="text-sm mt-2">Your journey milestones will appear here</p>
        </div>
      </Card>
    </div>
  )
}
