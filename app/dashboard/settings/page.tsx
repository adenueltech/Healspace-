"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  HelpCircle,
  LogOut,
  Trash2,
  Save,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)

  const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "language", label: "Language & Region", icon: Globe },
    { id: "help", label: "Help & Support", icon: HelpCircle },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
          Manage your account preferences and settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="lg:col-span-1 p-3 sm:p-4 border-border h-fit">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all whitespace-nowrap text-sm ${
                    activeSection === section.id
                      ? "bg-primary/10 text-foreground font-medium"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="hidden sm:inline">{section.label}</span>
                </button>
              )
            })}
          </nav>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-6">
          {/* Profile Settings */}
          {activeSection === "profile" && (
            <Card className="p-4 sm:p-6 border-border">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">Profile Information</h2>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                  </div>
                  <div className="text-center sm:text-left">
                    <Button className="bg-primary hover:bg-primary/90 text-sm">Change Photo</Button>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm">
                      First Name
                    </Label>
                    <Input id="firstName" defaultValue="Anonymous" className="border-border text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm">
                      Last Name
                    </Label>
                    <Input id="lastName" defaultValue="User" className="border-border text-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">
                    Email Address
                  </Label>
                  <Input id="email" type="email" defaultValue="user@healspace.com" className="border-border text-sm" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us a bit about yourself..."
                    className="border-border min-h-[100px] text-sm"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button className="bg-primary hover:bg-primary/90 text-sm">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    className="border-border text-foreground hover:bg-secondary bg-transparent text-sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Notifications */}
          {activeSection === "notifications" && (
            <Card className="p-6 border-border">
              <h2 className="text-xl font-semibold text-foreground mb-6">Notification Preferences</h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Session Reminders</p>
                    <p className="text-sm text-muted-foreground">Get notified before therapy sessions</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Chat Messages</p>
                    <p className="text-sm text-muted-foreground">Notifications for new chat messages</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Group Activity</p>
                    <p className="text-sm text-muted-foreground">Updates from your support groups</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Mood Reminders</p>
                    <p className="text-sm text-muted-foreground">Daily reminders to log your mood</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Weekly Progress Report</p>
                    <p className="text-sm text-muted-foreground">Summary of your weekly progress</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </Card>
          )}

          {/* Privacy & Security */}
          {activeSection === "privacy" && (
            <div className="space-y-6">
              <Card className="p-6 border-border">
                <h2 className="text-xl font-semibold text-foreground mb-6">Privacy Settings</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Anonymous Mode</p>
                      <p className="text-sm text-muted-foreground">Hide your identity in chats and groups</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Profile Visibility</p>
                      <p className="text-sm text-muted-foreground">Allow others to see your profile</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Activity Status</p>
                      <p className="text-sm text-muted-foreground">Show when you're online</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Data Sharing</p>
                      <p className="text-sm text-muted-foreground">Share anonymized data for research</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-border">
                <h2 className="text-xl font-semibold text-foreground mb-6">Change Password</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-sm">
                      Current Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        className="border-border text-sm pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/90"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm">
                      New Password
                    </Label>
                    <Input id="newPassword" type="password" className="border-border text-sm" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm">
                      Confirm New Password
                    </Label>
                    <Input id="confirmPassword" type="password" className="border-border text-sm" />
                  </div>

                  <Button className="bg-primary hover:bg-primary/90 text-sm">
                    <Lock className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </Card>

              <Card className="p-6 border-destructive bg-destructive/5">
                <h2 className="text-xl font-semibold text-destructive mb-4">Danger Zone</h2>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-destructive">Delete Account</p>
                      <p className="text-sm text-destructive/80">
                        Permanently delete your account and all associated data
                      </p>
                    </div>
                    <Button variant="destructive" className="bg-destructive hover:bg-destructive/90 text-sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Appearance */}
          {activeSection === "appearance" && (
            <Card className="p-6 border-border">
              <h2 className="text-xl font-semibold text-foreground mb-6">Appearance</h2>

              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block text-sm">Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="p-4 rounded-lg border-2 border-primary/30 bg-white">
                      <div className="w-full h-20 rounded bg-white border border-primary/10 mb-2" />
                      <p className="text-sm font-medium text-foreground">Light</p>
                    </button>
                    <button className="p-4 rounded-lg border-2 border-primary/10 bg-white hover:border-primary/20">
                      <div className="w-full h-20 rounded bg-gray-900 mb-2" />
                      <p className="text-sm font-medium text-foreground">Dark</p>
                    </button>
                    <button className="p-4 rounded-lg border-2 border-primary/10 bg-white hover:border-primary/20">
                      <div className="w-full h-20 rounded bg-gradient-to-br from-white to-gray-900 mb-2" />
                      <p className="text-sm font-medium text-foreground">Auto</p>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Compact Mode</p>
                    <p className="text-sm text-muted-foreground">Reduce spacing for more content</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Animations</p>
                    <p className="text-sm text-muted-foreground">Enable smooth transitions</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </Card>
          )}

          {/* Language & Region */}
          {activeSection === "language" && (
            <Card className="p-6 border-border">
              <h2 className="text-xl font-semibold text-foreground mb-6">Language & Region</h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-sm">
                    Language
                  </Label>
                  <select
                    id="language"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-primary/30"
                  >
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Chinese</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-sm">
                    Timezone
                  </Label>
                  <select
                    id="timezone"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-primary/30"
                  >
                    <option>Pacific Time (PT)</option>
                    <option>Mountain Time (MT)</option>
                    <option>Central Time (CT)</option>
                    <option>Eastern Time (ET)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat" className="text-sm">
                    Date Format
                  </Label>
                  <select
                    id="dateFormat"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-primary/30"
                  >
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </Card>
          )}

          {/* Help & Support */}
          {activeSection === "help" && (
            <div className="space-y-6">
              <Card className="p-6 border-border">
                <h2 className="text-xl font-semibold text-foreground mb-6">Help & Support</h2>

                <div className="space-y-4">
                  <button className="w-full p-4 rounded-lg border border-border hover:bg-secondary text-left transition-all">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Help Center</p>
                        <p className="text-sm text-muted-foreground">Browse articles and guides</p>
                      </div>
                    </div>
                  </button>

                  <button className="w-full p-4 rounded-lg border border-border hover:bg-secondary text-left transition-all">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Contact Support</p>
                        <p className="text-sm text-muted-foreground">Get help from our team</p>
                      </div>
                    </div>
                  </button>

                  <button className="w-full p-4 rounded-lg border border-border hover:bg-secondary text-left transition-all">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Privacy Policy</p>
                        <p className="text-sm text-muted-foreground">Learn how we protect your data</p>
                      </div>
                    </div>
                  </button>

                  <button className="w-full p-4 rounded-lg border border-border hover:bg-secondary text-left transition-all">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Terms of Service</p>
                        <p className="text-sm text-muted-foreground">Read our terms and conditions</p>
                      </div>
                    </div>
                  </button>
                </div>
              </Card>

              <Card className="p-6 border-border">
                <h2 className="text-xl font-semibold text-foreground mb-4">App Information</h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Version:</span> 1.0.0
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Last Updated:</span> January 8, 2025
                  </p>
                </div>
              </Card>

              <Button
                variant="outline"
                className="w-full border-destructive text-destructive hover:bg-destructive/5 bg-transparent text-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
