import { Card, CardContent } from "@/components/ui/card"
import { Shield, Globe, Clock, Award } from "lucide-react"

export function Impact() {
  const impacts = [
    {
      icon: Shield,
      title: "Stigma-Free Support",
      description: "Anonymous-first approach removes barriers to seeking help. Your privacy is our priority.",
      stat: "95%",
      statLabel: "feel more comfortable seeking help",
    },
    {
      icon: Globe,
      title: "Culturally Sensitive",
      description: "Designed for high-stigma regions with multilingual support and culturally aware resources.",
      stat: "40+",
      statLabel: "countries served",
    },
    {
      icon: Clock,
      title: "Always Available",
      description: "24/7 peer support and crisis intervention. Help is always just a tap away.",
      stat: "24/7",
      statLabel: "availability",
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Users report significant improvements in mood, anxiety levels, and overall wellbeing.",
      stat: "87%",
      statLabel: "report improved mental health",
    },
  ]

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Making a real <span className="text-primary">impact</span> on mental health
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Our mission is to make mental health support accessible, affordable, and stigma-free for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {impacts.map((impact, index) => (
            <Card
              key={index}
              className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-scale-in bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <impact.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-foreground mb-2">{impact.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{impact.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">{impact.stat}</span>
                      <span className="text-sm text-muted-foreground">{impact.statLabel}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
