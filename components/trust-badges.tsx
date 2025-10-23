export function TrustBadges() {
  const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "1M+", label: "Conversations" },
    { value: "500+", label: "Licensed Professionals" },
    { value: "4.9/5", label: "User Rating" },
  ]

  return (
    <section className="py-12 border-y border-border bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
