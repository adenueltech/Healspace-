import { Heart } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const footerLinks = {
    Product: ["Features", "Pricing", "Security", "Roadmap"],
    Resources: ["Blog", "Help Center", "Community", "Crisis Resources"],
    Company: ["About Us", "Careers", "Press Kit", "Contact"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "HIPAA Compliance"],
  }

  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="mb-4">
              <Image
                src="/images/healspace-logo.png"
                alt="HealSpace"
                width={180}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed max-w-xs">
              A safe space where seeking help is stigma-free, affordable, and accessible to everyone.
            </p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span>for mental wellness</span>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2025 HealSpace. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Twitter
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Instagram
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
