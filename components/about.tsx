"use client"

import { motion } from "framer-motion"
import { Heart, Shield, Users, Sparkles } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Privacy First",
    description: "Complete anonymity. No judgments, no records, just support when you need it.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Connect with peers who understand. Real people, real experiences, real healing.",
  },
  {
    icon: Heart,
    title: "Professional Care",
    description: "Access to licensed therapists when you need more. Seamless escalation from peer to professional.",
  },
  {
    icon: Sparkles,
    title: "Stigma-Free",
    description: "Mental health support without the barriers. No appointments, no waiting rooms, no stigma.",
  },
]

export function About() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 text-balance">
            Mental Health Support, <span className="text-primary">Reimagined</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            We believe everyone deserves access to mental health support without fear, stigma, or barriers. HealSpace
            was created to break down the walls that prevent people from seeking help when they need it most.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-12 sm:mb-16 border border-primary/10"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4 text-center">
              Our Mission
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-center">
              To create a safe, anonymous space where anyone can find support, share their struggles, and heal together.
              We combine the power of peer support with professional mental health care, making help accessible 24/7,
              without judgment or stigma.
            </p>
          </div>
        </motion.div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 h-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <value.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">{value.title}</h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* The Problem We're Solving */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6">
            Breaking Down Barriers
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
            Traditional mental health care comes with obstacles: long wait times, high costs, fear of judgment, and the
            stigma of seeking help. Many people suffer in silence because these barriers feel insurmountable.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            HealSpace removes these barriers by offering immediate, anonymous peer support combined with professional
            care when needed. No appointments, no waiting rooms, no judgment—just compassionate support available
            whenever you need it.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
