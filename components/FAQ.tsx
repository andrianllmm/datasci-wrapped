"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { fadeInDown, fadeInUp } from "@/lib/animations";
import Slide from "@/components/Slide";
import BackHomeButton from "@/components/BackHomeButton";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { HelpCircle, InfoIcon } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

export default function FAQ() {
  const faqs = [
    {
      question: "What is DataSci Wrapped?",
      answer:
        "DataSci Wrapped is a data-driven web application inspired by Spotify Wrapped that visualizes data science industry trends and optionally generates personalized 'wrapped' summaries using public data.",
    },
    {
      question: "How do I create my personalized wrapped?",
      answer:
        "Click on 'Unwrap Your Year in Data Science' on the home page, then connect your GitHub profile. We'll analyze your public repositories, contributions, and coding activity to generate your personalized DataSci Wrapped.",
    },
    {
      question: "Is my data safe? What data do you collect?",
      answer:
        "Yes, your data is safe. We only access publicly available data from your GitHub profile. We don't store any personal information or credentials. All data processing happens in real-time and is never persisted on our servers.",
    },
    {
      question: "Can I share my wrapped summary?",
      answer:
        "Yes! After generating your wrapped, you can easily share your personalized summary with others. The specific sharing methods are available on the wrapped summary page.",
    },
    {
      question: "What if my GitHub profile is private?",
      answer:
        "DataSci Wrapped works with publicly available data. If your profile is private, we'll only be able to access the contributions you've made to public repositories and other public activity visible to the community.",
    },
  ];

  return (
    <>
      <BackHomeButton />

      {/* Hero Section */}
      <Slide>
        <motion.div className="max-w-3xl mx-auto text-center px-4">
          <motion.div {...fadeInDown()} className="mb-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 mb-6">
              <p className="text-sm font-medium text-primary flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Got Questions?
              </p>
            </div>
          </motion.div>

          <motion.h1
            {...fadeInDown(0.1)}
            className="text-4xl md:text-6xl font-black text-foreground mb-6"
          >
            Frequently Asked Questions
          </motion.h1>

          <motion.p {...fadeInUp()} className="text-lg text-muted-foreground">
            Find answers to common questions about DataSci Wrapped
          </motion.p>
        </motion.div>
      </Slide>

      {/* FAQ Section */}
      <Slide>
        <motion.div {...fadeInDown()} className="max-w-2xl mx-auto w-full px-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div key={index} {...fadeInUp(index * 0.1)}>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-2xl font-bold hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </Slide>

      {/* CTA Section */}
      <Slide>
        <motion.div className="max-w-2xl mx-auto px-4 text-center">
          <motion.h2
            {...fadeInDown()}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-6"
          >
            Ready to Explore?
          </motion.h2>

          <motion.p
            {...fadeInUp(0.1)}
            className="text-lg text-muted-foreground mb-8"
          >
            Still have questions? Feel free to explore our application.
          </motion.p>

          <motion.div
            {...fadeInUp(0.2)}
            className="flex flex-wrap gap-3 justify-center items-center"
          >
            <Button asChild variant="outline" size="sm">
              <Link href="/">Back to Home</Link>
            </Button>

            <Button asChild variant="outline" size="sm">
              <Link href="/about">
                <InfoIcon />
                Learn More About Us
              </Link>
            </Button>

            <Button asChild variant="outline" size="sm">
              <a
                href="https://github.com/andrianllmm/datasci-wrapped"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center"
              >
                <SiGithub /> GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </Slide>
    </>
  );
}
