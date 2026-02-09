"use client";

import Slide from "@/components/Slide";
import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";
import { PersonalWrappedData } from "@/types/wrapped";
import { Button } from "@/components/ui/button";
import { Pencil, Download } from "lucide-react";
import { useState } from "react";
import { exportSlidesAsZip } from "@/lib/exportSlides";

export default function PersonalOutroSlide({
  data,
  onEdit,
  slideId,
}: {
  data: PersonalWrappedData;
  onEdit?: () => void;
  slideId?: string;
}) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const slideIds = [
        "achievements",
        "repos",
        "reputation",
        "tools",
        "languages",
      ];
      const userName =
        data.userMetadata?.name || data.userMetadata?.username || "my-wrapped";
      await exportSlidesAsZip(slideIds, userName);
    } catch (error) {
      console.error("Failed to export slides:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const totalRepos =
    data.achievements.find((r) => r.label === "Public Repositories")?.value ??
    0;
  const totalStars =
    data.achievements.find((r) => r.label === "Total Stars Earned")?.value ?? 0;
  const topLanguage = data.languages[0]?.language ?? "code";
  const topTool = data.tools[0]?.tool ?? "tools";

  return (
    <Slide slideId={slideId}>
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-40 flex gap-2">
        {onEdit && (
          <motion.div {...fadeInUp(0.1)}>
            <Button
              onClick={onEdit}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 rounded-full px-3 py-2 md:px-4 md:py-2 border border-primary/30 hover:border-primary/70 hover:bg-primary/10 text-xs md:text-sm"
            >
              <Pencil className="w-4 h-4" />
              <span className="hidden sm:inline">Edit Details</span>
            </Button>
          </motion.div>
        )}
        <motion.div {...fadeInUp(0.1)}>
          <Button
            onClick={handleExport}
            disabled={isExporting}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 rounded-full px-3 py-2 md:px-4 md:py-2 border border-primary/30 hover:border-primary/70 hover:bg-primary/10 text-xs md:text-sm"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">
              {isExporting ? "Saving..." : "Save as Images"}
            </span>
          </Button>
        </motion.div>
      </div>

      <div className="flex flex-col justify-center items-center h-full px-6 max-w-4xl mx-auto">
        <motion.h1
          {...fadeInUp()}
          className="text-5xl md:text-7xl font-black text-foreground mb-8 text-center"
        >
          Keep Crunching Numbers!
        </motion.h1>

        <motion.div
          {...fadeInUp(0.4)}
          className="mb-6 text-lg md:text-xl text-muted-foreground text-center"
        >
          <p>Your journey in data science is impressive!</p>
        </motion.div>

        <motion.div
          {...fadeInUp(0.2)}
          className="text-lg md:text-xl flex flex-col gap-3 text-primary text-center mb-6"
        >
          {totalRepos > 0 && (
            <p>
              With <span className="font-bold text-primary">{totalRepos}</span>{" "}
              public
              {totalRepos === 1 ? " repository" : " repositories"} and{" "}
              <span className="font-bold text-primary">{totalStars}</span> stars
              earned, you&apos;re making an impact.
            </p>
          )}
          <p>
            Keep coding in{" "}
            <span className="font-bold text-primary">{topLanguage}</span>,
            building with{" "}
            <span className="font-bold text-primary">{topTool}</span>, and
            sharing your knowledge with the community.
          </p>
        </motion.div>

        <motion.div
          {...fadeInUp(0.4)}
          className="text-lg md:text-xl text-muted-foreground text-center"
        >
          <p>See you in {data.year + 1}!</p>
        </motion.div>

        <motion.div
          {...fadeInUp(0.6)}
          className="mt-12 text-xs text-muted-foreground/50 text-center"
        >
          <p>Data powered by GitHub and StackOverflow public APIs</p>
        </motion.div>
      </div>
    </Slide>
  );
}
