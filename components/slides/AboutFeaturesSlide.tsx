"use client";

import { motion } from "motion/react";
import { fadeInDown, fadeInUp } from "@/lib/animations";
import Slide from "@/components/Slide";
import { ABOUT_FEATURES } from "@/data/about";

export function AboutFeaturesSlide() {
  return (
    <Slide>
      <div className="w-full h-full flex flex-col items-center justify-center mx-auto max-w-xl">
        <motion.h2
          {...fadeInDown()}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-12 text-center"
        >
          What You Can Explore
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ABOUT_FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                {...fadeInUp(index * 0.1)}
                className="p-4 rounded-xl bg-card/50 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <div className="flex items-start gap-4">
                  <Icon className="p-1 w-6 h-6 text-primary" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Slide>
  );
}
