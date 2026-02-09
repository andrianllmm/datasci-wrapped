import Slide from "@/components/Slide";
import { motion } from "motion/react";
import { fadeInUp, bounceY, scrollDot, fadeInDown } from "@/lib/animations";
import { PersonalWrappedData } from "@/types/wrapped";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function PersonalIntroSlide({
  data,
  onEdit,
  slideId,
}: {
  data: PersonalWrappedData;
  onEdit?: () => void;
  slideId?: string;
}) {
  const userName =
    data.userMetadata?.name || data.userMetadata?.username || "there";
  const isNameAvailable =
    data.userMetadata?.name || data.userMetadata?.username;

  return (
    <Slide slideId={slideId}>
      {/* Edit Button */}
      {onEdit && (
        <motion.div
          {...fadeInUp(0.1)}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-40"
        >
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
      <div className="relative flex flex-col justify-between h-[80%] max-h-[80%] px-6 max-w-4xl mx-auto">
        {/* Intro Text */}
        <div className="text-center">
          {isNameAvailable && (
            <motion.p
              {...fadeInDown()}
              className="text-2xl md:text-3xl font-semibold text-primary/90 mb-4"
            >
              Hey there, {userName}!
            </motion.p>
          )}
          <motion.h1
            {...fadeInDown(isNameAvailable ? 0.1 : 0)}
            className="text-5xl md:text-6xl font-black text-foreground mb-4"
          >
            Your DataSci Wrapped
          </motion.h1>
          <motion.h2
            {...fadeInUp(isNameAvailable ? 0.3 : 0.2)}
            className="text-4xl md:text-6xl font-bold text-primary mb-8"
          >
            {data.year}
          </motion.h2>
          <motion.p
            {...fadeInUp(isNameAvailable ? 0.4 : 0.3)}
            className="text-lg md:text-xl text-foreground/90"
          >
            Your personal data science journey
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
