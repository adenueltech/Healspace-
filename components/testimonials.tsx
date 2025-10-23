import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "University Student",
      content:
        "HealSpace gave me the courage to talk about my anxiety without fear of judgment. The anonymous chat feature made all the difference.",
      rating: 5,
    },
    {
      name: "James K.",
      role: "Remote Worker",
      content:
        "Being able to connect with a therapist from home, completely anonymously, removed so many barriers. This platform is life-changing.",
      rating: 5,
    },
    {
      name: "Priya R.",
      role: "Young Professional",
      content:
        "The peer support groups helped me realize I wasn't alone. The community here is incredibly supportive and understanding.",
      rating: 5,
    },
    {
      name: "Michael T.",
      role: "Entrepreneur",
      content:
        "The mood tracking feature helped me identify patterns in my mental health. Combined with professional support, it's been transformative.",
      rating: 5,
    },
    {
      name: "Aisha N.",
      role: "Graduate Student",
      content:
        "I was skeptical at first, but the crisis support feature was there when I needed it most. Forever grateful for this platform.",
      rating: 5,
    },
    {
      name: "David L.",
      role: "Teacher",
      content:
        "Affordable, accessible, and genuinely helpful. HealSpace makes mental health support available to everyone, not just the privileged.",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Stories of <span className="text-primary">healing and hope</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Real experiences from our community members who found support and healing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-scale-in bg-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Testimonial Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>

                {/* Author Info */}
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
