"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

export function Hero() {
  const router = useRouter()

  const handleLearnMore = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleStartJourney = () => {
    router.push('/get-started')
  }

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Subtle background decoration */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero-background.png)' }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-border mb-8 animate-fade-in shadow-lg">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">100% Anonymous & Secure</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up text-balance leading-tight">
            <span className="text-foreground drop-shadow-lg">
              Safe, stigma-free mental health <span className="text-primary">conversations</span>
            </span>
          </h1>

          {/* Subheadline */}
          <div className="inline-block px-6 py-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg mb-10 animate-fade-in-up animation-delay-200">
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Connect with caring professionals and supportive peers in a secure, anonymous space. Your mental wellness
              journey starts here.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up animation-delay-400">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all text-base px-8 py-6"
              onClick={handleStartJourney}
            >
              Start Your Journey Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/5 text-base px-8 py-6 bg-transparent"
              onClick={handleLearnMore}
            >
              Learn More
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground animate-fade-in-up animation-delay-600">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>HIPAA compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
              <span>Available 24/7</span>
            </div>
          </div>
        </div>

        {/* Hero Image/Illustration Placeholder */}
        <div className="mt-16 max-w-5xl mx-auto animate-fade-in-up animation-delay-800">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border bg-gradient-to-br from-secondary to-muted">
            <div className="aspect-video flex items-center justify-center p-8">
              <img
                src="/peaceful-mental-health-app-interface-with-calming-.jpg"
                alt="HealSpace App Interface"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
