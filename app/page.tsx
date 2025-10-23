import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { TrustBadges } from "@/components/trust-badges"
import { About } from "@/components/about"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Impact } from "@/components/impact"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TrustBadges />
      <About />
      <Features />
      <HowItWorks />
      <Impact />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
