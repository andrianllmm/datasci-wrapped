"use client";

import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";
import { Spinner } from "@/components/ui/spinner";

export default function PersonalWrappedLoading() {
  return (
    <div className="min-h-screen w-screen bg-purple-700 flex items-center justify-center px-6">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          {...fadeInUp()}
          className="text-center flex flex-row items-center justify-center gap-2 mt-6 text-2xl text-white"
        >
          <Spinner className="w-6 h-6" />
          Unwrapping Your Wrapped...
        </motion.div>

        <motion.div {...fadeInUp(0.2)} className="space-y-4">
          <div className="bg-purple-800/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="animate-pulse bg-purple-600 rounded-full h-3 w-3"></div>
              <p className="text-purple-200">Fetching GitHub repositories...</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="animate-pulse bg-purple-600 rounded-full h-3 w-3 animation-delay-300"></div>
              <p className="text-purple-200">
                Collecting StackOverflow data...
              </p>
            </div>
          </div>

          <motion.p
            {...fadeInUp(0.3)}
            className="text-center text-sm text-purple-300/70"
          >
            This may take a few seconds...
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
