import { UserPlus, MessageSquare, Heart, Sparkles } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Your Account",
      description: "Sign up quickly with your email and password. Your personal information is kept secure.",
      step: "01",
    },
    {
      icon: MessageSquare,
      title: "Connect & Share",
      description: "Join peer support groups or chat one-on-one with caring community members.",
      step: "02",
    },
    {
      icon: Heart,
      title: "Get Professional Help",
      description: "Book sessions with licensed therapists when you need expert guidance.",
      step: "03",
    },
    {
      icon: Sparkles,
      title: "Track Your Progress",
      description: "Use mood journaling and insights to celebrate your growth and healing.",
      step: "04",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Your journey to wellness in <span className="text-primary">four simple steps</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Getting started is easy, private, and takes less than 2 minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative animate-fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
              {/* Connector Line (hidden on mobile, shown on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-border -z-10" />
              )}

              <div className="text-center">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 mb-6 relative">
                  <step.icon className="w-10 h-10 text-primary" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
