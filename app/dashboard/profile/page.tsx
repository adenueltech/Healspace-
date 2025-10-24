"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Eye,
  EyeOff,
  Save,
  Camera,
  Star,
  Award,
  MessageSquare,
  Users,
  BookOpen,
} from "lucide-react"
import { getCurrentUser, updateProfile } from "@/lib/auth"
import { getDashboardStats } from "@/lib/dashboard"
import type { User as UserType } from "@/lib/supabase"

export default function ProfilePage() {
   const [user, setUser] = useState<UserType | null>(null)
   const [isEditing, setIsEditing] = useState(false)
   const [loading, setLoading] = useState(true)
   const [saving, setSaving] = useState(false)
   const [profileData, setProfileData] = useState({
     firstName: "",
     lastName: "",
     email: "",
     phone: "",
     location: "",
     dateOfBirth: "",
     bio: "",
     occupation: "",
     interests: [] as string[],
   })

   const [privacySettings, setPrivacySettings] = useState({
     hideDateOfBirth: true,
     hidePhone: false,
     hideLocation: false,
     hideOccupation: false,
     hideInterests: false,
     anonymousMode: true,
     showActivity: false,
     allowMessages: true,
   })

   const [stats, setStats] = useState([
     { label: "Journal Entries", value: "0", icon: BookOpen },
     { label: "Support Groups", value: "0", icon: Users },
     { label: "Chat Sessions", value: "0", icon: MessageSquare },
     { label: "Achievements", value: "0", icon: Award },
   ])

   useEffect(() => {
     async function loadProfile() {
       try {
         const currentUser = await getCurrentUser()
         if (!currentUser) return

         setUser(currentUser)

         // Load dashboard stats
         const dashboardStats = await getDashboardStats(currentUser.id)
         setStats([
           { label: "Journal Entries", value: dashboardStats.journalEntries.toString(), icon: BookOpen },
           { label: "Support Groups", value: dashboardStats.supportGroups.toString(), icon: Users },
           { label: "Chat Sessions", value: dashboardStats.chatSessions.toString(), icon: MessageSquare },
           { label: "Achievements", value: "0", icon: Award },
         ])

         // Set profile data from user
         setProfileData({
           firstName: currentUser.full_name?.split(' ')[0] || "",
           lastName: currentUser.full_name?.split(' ').slice(1).join(' ') || "",
           email: currentUser.email || "",
           phone: "",
           location: "",
           dateOfBirth: "",
           bio: "",
           occupation: "",
           interests: [],
         })
       } catch (error) {
         console.error("Failed to load profile:", error)
       } finally {
         setLoading(false)
       }
     }

     loadProfile()
   }, [])

   const handleSave = async () => {
     if (!user) return

     setSaving(true)
     try {
       const fullName = `${profileData.firstName} ${profileData.lastName}`.trim()
       await updateProfile({
         full_name: fullName,
         // Add other fields as needed
       })
       setIsEditing(false)
     } catch (error) {
       console.error("Failed to save profile:", error)
     } finally {
       setSaving(false)
     }
   }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your personal information and privacy settings</p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-foreground">Loading profile...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your personal information and privacy settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <Card className="p-6 border-border">
            <div className="flex items-start gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                  <AvatarFallback className="bg-primary text-white text-2xl">JD</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  variant="secondary"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    {user?.full_name || 'User'}
                  </h2>
                  <p className="text-muted-foreground">{user?.email}</p>
                  {privacySettings.anonymousMode && (
                    <Badge className="mt-2 bg-primary/10 text-primary border-0">
                      <Shield className="w-3 h-3 mr-1" />
                      Anonymous Mode
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                      <div key={stat.label} className="text-center">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mx-auto mb-2">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Personal Information */}
          <Card className="p-6 border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Personal Information</h3>
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() => setIsEditing(!isEditing)}
                className={isEditing ? "bg-primary hover:bg-primary/90" : "border-border"}
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  disabled={!isEditing}
                  className="border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  disabled={!isEditing}
                  className="border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10 border-border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10 border-border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10 border-border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10 border-border"
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  value={profileData.occupation}
                  onChange={(e) => setProfileData({ ...profileData, occupation: e.target.value })}
                  disabled={!isEditing}
                  className="border-border"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  disabled={!isEditing}
                  className="border-border min-h-[100px]"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 mt-6 pt-6 border-t border-border">
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90" disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="border-border text-foreground hover:bg-secondary"
                  disabled={saving}
                >
                  Cancel
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column - Privacy Settings */}
        <div className="space-y-6">
          {/* Privacy Settings */}
          <Card className="p-6 border-border">
            <h3 className="text-xl font-semibold text-foreground mb-6">Privacy Settings</h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="anonymousMode"
                  checked={privacySettings.anonymousMode}
                  onCheckedChange={(checked) =>
                    setPrivacySettings({ ...privacySettings, anonymousMode: !!checked })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="anonymousMode" className="text-sm font-medium cursor-pointer">
                    Anonymous Mode
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Hide your real identity in chats and groups
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="hideDateOfBirth"
                  checked={privacySettings.hideDateOfBirth}
                  onCheckedChange={(checked) =>
                    setPrivacySettings({ ...privacySettings, hideDateOfBirth: !!checked })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="hideDateOfBirth" className="text-sm font-medium cursor-pointer">
                    Hide Date of Birth
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Don't show your age to other users
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="hidePhone"
                  checked={privacySettings.hidePhone}
                  onCheckedChange={(checked) =>
                    setPrivacySettings({ ...privacySettings, hidePhone: !!checked })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="hidePhone" className="text-sm font-medium cursor-pointer">
                    Hide Phone Number
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Keep your contact information private
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="hideLocation"
                  checked={privacySettings.hideLocation}
                  onCheckedChange={(checked) =>
                    setPrivacySettings({ ...privacySettings, hideLocation: !!checked })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="hideLocation" className="text-sm font-medium cursor-pointer">
                    Hide Location
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Don't share your location with others
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="hideOccupation"
                  checked={privacySettings.hideOccupation}
                  onCheckedChange={(checked) =>
                    setPrivacySettings({ ...privacySettings, hideOccupation: !!checked })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="hideOccupation" className="text-sm font-medium cursor-pointer">
                    Hide Occupation
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Keep your job information private
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="hideInterests"
                  checked={privacySettings.hideInterests}
                  onCheckedChange={(checked) =>
                    setPrivacySettings({ ...privacySettings, hideInterests: !!checked })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="hideInterests" className="text-sm font-medium cursor-pointer">
                    Hide Interests
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Don't show your interests to other users
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="showActivity"
                  checked={privacySettings.showActivity}
                  onCheckedChange={(checked) =>
                    setPrivacySettings({ ...privacySettings, showActivity: !!checked })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="showActivity" className="text-sm font-medium cursor-pointer">
                    Show Activity Status
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Let others see when you're online
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="allowMessages"
                  checked={privacySettings.allowMessages}
                  onCheckedChange={(checked) =>
                    setPrivacySettings({ ...privacySettings, allowMessages: !!checked })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="allowMessages" className="text-sm font-medium cursor-pointer">
                    Allow Direct Messages
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Let other users send you private messages
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
              <Save className="w-4 h-4 mr-2" />
              Save Privacy Settings
            </Button>
          </Card>

          {/* Interests */}
          <Card className="p-6 border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.interests.map((interest) => (
                <Badge key={interest} className="bg-primary/10 text-primary border-0">
                  {interest}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <Button variant="outline" className="w-full mt-4 border-border">
                Edit Interests
              </Button>
            )}
          </Card>

          {/* Account Status */}
          <Card className="p-6 border-border bg-primary/5">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Premium Member</h3>
              <p className="text-sm text-muted-foreground">
                Your account is active and in good standing
              </p>
              <Badge className="bg-green-100 text-green-700 border-0">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}