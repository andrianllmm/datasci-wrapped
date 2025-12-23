import Slide from "@/components/Slide";
import { motion } from "motion/react";
import { fadeInUp, bounceY, scrollDot, fadeInDown } from "@/lib/animations";
import { WrappedData } from "@/data/types";

export default function IntroSlide({ data }: { data: WrappedData }) {
  return (
    <Slide>
      <div className="flex flex-col justify-between h-[80%] max-h-[80%] px-6 max-w-4xl mx-auto">
        {/* Intro Text */}
        <div className="text-center">
          <motion.h1
            {...fadeInDown()}
            className="text-6xl md:text-8xl font-black text-white mb-4"
          >
            DataSci Wrapped
          </motion.h1>
          <motion.h2
            {...fadeInUp(0.2)}
            className="text-4xl md:text-6xl font-bold text-purple-200 mb-8"
          >
            {data.year}
          </motion.h2>
          <motion.p
            {...fadeInUp(0.4)}
            className="text-xl md:text-3xl text-purple-100"
          >
            Celebrating our collective achievements
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div className="flex flex-col items-center" {...bounceY(8)}>
          <div className="text-purple-400 text-sm mb-2">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full relative overflow-hidden flex items-start justify-center">
            <motion.div
              {...scrollDot(4, 12)}
              className="w-1 h-2 bg-purple-400 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </Slide>
  );
}
