"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { fadeInDown, fadeInUp } from "@/lib/animations";
import Slide from "@/components/Slide";
import { Button } from "@/components/ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { CircleQuestionMarkIcon } from "lucide-react";

export function AboutCtaSlide() {
  return (
    <Slide>
      <div className="w-full h-full flex flex-col items-center justify-center mx-auto max-w-xl">
        <motion.h2
          {...fadeInDown()}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-12 text-center"
        >
          Ready to Explore?
        </motion.h2>

        <motion.p
          {...fadeInDown(0.1)}
          className="text-lg text-center text-muted-foreground mb-8"
        >
          Start exploring trends and create your personalized wrapped today.
        </motion.p>

        <motion.div
          {...fadeInUp(0.2)}
          className="flex flex-wrap gap-3 justify-center items-center"
        >
          <Button asChild variant="outline" size="sm">
            <Link href="/">Back to Home</Link>
          </Button>

          <Button asChild variant="outline" size="sm">
            <Link href="/faq">
              <CircleQuestionMarkIcon />
              FAQ
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
      </div>
    </Slide>
  );
}
