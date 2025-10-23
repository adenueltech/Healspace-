import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "How does HealSpace work?",
      answer:
        "HealSpace is a comprehensive mental health platform that offers peer support, professional therapy, and wellness tools. You can join support groups, connect with licensed therapists, track your mood, and journal your progress—all in a secure and supportive environment.",
    },
    {
      question: "How much does HealSpace cost?",
      answer:
        "HealSpace offers a free tier with peer support, group rooms, and mood journaling. Professional therapy sessions are available through affordable pay-per-session or subscription plans starting at $29/month.",
    },
    {
      question: "Are the therapists licensed professionals?",
      answer:
        "Yes, all mental health professionals on HealSpace are licensed, vetted, and experienced. They undergo thorough background checks and maintain active licenses in their respective regions.",
    },
    {
      question: "What if I'm in crisis?",
      answer:
        "HealSpace has a dedicated crisis support button that connects you immediately to trained crisis counselors. We also provide emergency hotline numbers and resources for immediate help.",
    },
    {
      question: "Can I use HealSpace on my phone?",
      answer:
        "Yes! HealSpace is mobile-first and works seamlessly on any device. We also have dedicated iOS and Android apps for the best experience.",
    },
    {
      question: "How do peer support groups work?",
      answer:
        "Peer support groups are topic-specific chat rooms where you can connect with others facing similar challenges. They're moderated by trained volunteers to ensure a safe, supportive environment.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Your privacy and security are our top priorities. We use end-to-end encryption, are HIPAA compliant, and never share your data with third parties. Your conversations are completely confidential.",
    },
    {
      question: "Can I switch therapists if needed?",
      answer:
        "Absolutely. Finding the right therapist is important for your healing journey. You can switch therapists at any time with no penalties or additional fees.",
    },
  ]

  return (
    <section id="faq" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Frequently asked <span className="text-primary">questions</span>
            </h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Everything you need to know about HealSpace and how it works.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card hover:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary font-semibold py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Still have questions? We're here to help.</p>
            <a href="#" className="text-primary hover:text-primary/80 font-medium underline underline-offset-4">
              Contact our support team
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
