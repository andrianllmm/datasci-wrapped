import Slide from "@/components/Slide";
import { motion } from "motion/react";
import { fadeInUp, bounceY, scrollDot, fadeInDown } from "@/lib/animations";
import { WrappedData } from "@/types/wrapped";
import { UpdssocLogo } from "../ui/updssoc-logo";

export default function IntroSlide({ data }: { data: WrappedData }) {
  return (
    <Slide>
      <div className="flex flex-col justify-between h-[80%] max-h-[80%] px-6 max-w-4xl mx-auto">
        {/* Intro Text */}
        <div className="text-center">
          <motion.h1
            {...fadeInDown()}
            className="text-3xl sm:text-4xl md:text-6xl font-black text-foreground
             flex flex-wrap items-center justify-center gap-1 text-center"
          >
            <UpdssocLogo className="size-8 sm:size-12 md:size-16" />
            <span>DataSci Wrapped</span>
          </motion.h1>
          <motion.h2
            {...fadeInUp(0.2)}
            className="text-4xl md:text-6xl font-bold text-primary mb-8"
          >
            {data.year}
          </motion.h2>
          <motion.p
            {...fadeInUp(0.4)}
            className="text-xl md:text-3xl text-foreground/90"
          >
            Celebrating our collective achievements
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div className="flex flex-col items-center" {...bounceY(8)}>
          <div className="text-muted-foreground text-sm mb-2">
            Scroll to explore
          </div>
          <div className="w-6 h-10 border-2 border-primary/70 rounded-full relative overflow-hidden flex items-start justify-center">
            <motion.div
              {...scrollDot(4, 12)}
              className="w-1 h-2 bg-primary/70 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
