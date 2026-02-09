"use client";

import { motion } from "motion/react";
import { fadeInDown, fadeInUp } from "@/lib/animations";
import Slide from "@/components/Slide";
import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";

export function AboutContextSlide() {
  return (
    <Slide>
      <div className="w-full h-full flex flex-col items-center justify-center mx-auto max-w-xl">
        <motion.h2
          {...fadeInDown(0.1)}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-12 text-center"
        >
          An Internship Project
        </motion.h2>

        <motion.p
          {...fadeInUp(0.2)}
          className="text-lg text-muted-foreground text-center mb-8"
        >
          DataSci Wrapped was developed by <b>Andrian Lloyd Maagma</b>
          <br /> as part Associate&apos;s Internship at the UP Data Science
          Society (DSSoc).
        </motion.p>

        <motion.div {...fadeInUp()}>
          <Button asChild variant="secondary" size="lg">
            <a
              href="https://andrianllmm.github.io"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              <UserIcon className="w-4 h-4" />
              About the Developer
            </a>
          </Button>
        </motion.div>
      </div>
    </Slide>
  );
}
