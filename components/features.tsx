import { MessageCircle, Users, Calendar, AlertCircle, BookOpen, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function Features() {
  const features = [
    {
      icon: MessageCircle,
      title: "Anonymous Peer Chat",
      description: "Connect with others who understand. Share experiences in a safe, judgment-free environment.",
    },
    {
      icon: Users,
      title: "Group Support Rooms",
      description: "Join topic-specific communities for anxiety, depression, relationships, and more.",
    },
    {
      icon: Calendar,
      title: "Professional Sessions",
      description: "Book confidential sessions with licensed therapists and mental health professionals.",
    },
    {
      icon: AlertCircle,
      title: "Crisis Support",
      description: "Immediate help when you need it most. 24/7 crisis intervention and emergency resources.",
    },
    {
      icon: BookOpen,
      title: "Mood Journaling",
      description: "Track your emotional wellness with guided journaling and personalized insights.",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Visualize your mental health journey with mood analytics and milestone celebrations.",
    },
  ]

  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Everything you need for your <span className="text-primary">mental wellness</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Comprehensive tools and support designed to help you thrive, not just survive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group animate-scale-in bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
