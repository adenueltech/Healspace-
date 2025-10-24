"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  MessageCircle,
  Users,
  BookOpen,
  Heart,
  Settings,
  AlertCircle,
  TrendingUp,
  Calendar,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Anonymous Chat", href: "/dashboard/chat", icon: MessageCircle },
  { name: "Support Groups", href: "/dashboard/groups", icon: Users },
  { name: "Journal", href: "/dashboard/journal", icon: BookOpen },
  { name: "Mood Tracker", href: "/dashboard/mood", icon: Heart },
  { name: "Progress", href: "/dashboard/progress", icon: TrendingUp },
  { name: "Sessions", href: "/dashboard/sessions", icon: Calendar },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname()

  return (
    <>
      {isOpen && <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-border">
            <Link href="/dashboard">
              <Image src="/images/healspace-logo.png" alt="HealSpace" width={150} height={60} className="h-14 w-auto" />
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive ? "bg-primary text-white" : "text-foreground hover:bg-secondary hover:text-primary",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Crisis Support Button */}
          <div className="p-4 border-t border-border">
            <a
              href="tel:988"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
            >
              <AlertCircle className="h-5 w-5" />
              Crisis Support
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
