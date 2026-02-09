"use client";

import { motion } from "motion/react";
import { fadeInDown, fadeInUp } from "@/lib/animations";
import Slide from "@/components/Slide";
import { UpdssocLogo } from "@/components/ui/updssoc-logo";

export function AboutHeroSlide() {
  return (
    <Slide>
      <div className="w-full h-full flex flex-col items-center justify-center mx-auto max-w-xl">
        <motion.div {...fadeInDown()} className="mb-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 mb-6">
            <p className="text-sm font-medium text-primary">
              About this project
            </p>
          </div>
        </motion.div>

        <motion.h1
          {...fadeInDown(0.1)}
          className="text-4xl md:text-6xl font-black text-foreground mb-6 text-center"
        >
          DataSci Wrapped
        </motion.h1>

        <motion.p
          {...fadeInDown(0.2)}
          className="text-lg md:text-xl text-muted-foreground mb-8 text-center"
        >
          A data-driven web application inspired by{" "}
          <span className="underline">Spotify Wrapped</span> to visualizing data
          science industry trends and celebrating your personal contributions.
        </motion.p>

        <motion.div
          {...fadeInUp()}
          className="flex flex-wrap justify-center items-center gap-2 text-lg"
        >
          <a
            href="https://andrianllmm.github.io"
            target="_blank"
            rel="noreferrer"
            className="ml-1 text-primary font-medium hover:underline"
          >
            Andrian Lloyd Maagma
          </a>

          <div className="flex items-center gap-2">
            <span className="text-primary">X</span>
            <span className="text-primary flex items-center gap-1">
              <UpdssocLogo className="size-6" />
              UP DSSoc
            </span>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
