import Slide from "@/components/Slide";
import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";
import { PersonalWrappedData } from "@/types/wrapped";

export default function PersonalOutroSlide({
  data,
}: {
  data: PersonalWrappedData;
}) {
  const totalRepos =
    data.achievements.find((r) => r.label === "Public Repositories")?.value ??
    0;
  const totalStars =
    data.achievements.find((r) => r.label === "Total Stars Earned")?.value ?? 0;
  const topLanguage = data.languages[0]?.language ?? "code";
  const topTool = data.tools[0]?.tool ?? "tools";

  return (
    <Slide>
      <div className="flex flex-col justify-center items-center h-full px-6 max-w-4xl mx-auto">
        <motion.h1
          {...fadeInUp()}
          className="text-5xl md:text-7xl font-black text-white mb-8 text-center"
        >
          Keep Crunching Numbers!
        </motion.h1>

        <motion.div
          {...fadeInUp(0.4)}
          className="mb-6 text-lg md:text-xl text-purple-400 text-center"
        >
          <p>Your journey in data science is impressive!</p>
        </motion.div>

        <motion.div
          {...fadeInUp(0.2)}
          className="text-lg md:text-xl flex flex-col gap-3 text-purple-200 text-center mb-6"
        >
          {totalRepos > 0 && (
            <p>
              With{" "}
              <span className="font-bold text-purple-200">{totalRepos}</span>{" "}
              public
              {totalRepos === 1 ? " repository" : " repositories"} and{" "}
              <span className="font-bold text-purple-200">{totalStars}</span>{" "}
              stars earned, you&apos;re making an impact.
            </p>
          )}
          <p>
            Keep coding in{" "}
            <span className="font-bold text-purple-200">{topLanguage}</span>,
            building with{" "}
            <span className="font-bold text-purple-200">{topTool}</span>, and
            sharing your knowledge with the community.
          </p>
        </motion.div>

        <motion.div
          {...fadeInUp(0.4)}
          className="text-lg md:text-xl text-purple-400 text-center"
        >
          <p>See you in {data.year + 1}!</p>
        </motion.div>

        <motion.div
          {...fadeInUp(0.6)}
          className="mt-12 text-xs text-purple-400/50 text-center"
        >
          <p>Data powered by GitHub and StackOverflow public APIs</p>
        </motion.div>
      </div>
    </Slide>
  );
}
