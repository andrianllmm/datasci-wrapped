import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";

export default function BackHomeButton() {
  return (
    <motion.div
      {...fadeInUp()}
      className="fixed top-4 left-4 md:top-6 md:left-6 z-40"
    >
      <Link
        href="/"
        className="flex items-center gap-1 text-primary hover:text-foreground transition-colors text-xs md:text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Back</span>
      </Link>
    </motion.div>
  );
}
