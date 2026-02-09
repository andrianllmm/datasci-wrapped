"use client";

import { motion } from "motion/react";
import { fadeInDown, fadeInUp } from "@/lib/animations";
import Slide from "@/components/Slide";
import { ABOUT_HOW_IT_WORKS } from "@/data/about";

export function AboutHowItWorksSlide() {
  return (
    <Slide>
      <div className="w-full h-full flex flex-col items-center justify-center mx-auto max-w-xl">
        <motion.h2
          {...fadeInDown()}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-12 text-center"
        >
          How It Works
        </motion.h2>

        <div className="space-y-6">
          {ABOUT_HOW_IT_WORKS.map((item, index) => (
            <motion.div
              key={index}
              {...fadeInUp(index * 0.1)}
              className="flex gap-4 items-start"
            >
              <div className="shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 border border-primary/40">
                  <span className="text-lg font-bold text-primary">
                    {item.step}
                  </span>
                </div>
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
