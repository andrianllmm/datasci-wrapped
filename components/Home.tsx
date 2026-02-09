"use client";

import Slide from "@/components/Slide";
import { Button } from "@/components/ui/button";
import { catalog } from "@/data/catalog";
import { fadeInDown, fadeInUp, slideInLeft } from "@/lib/animations";
import { SiGithub } from "@icons-pack/react-simple-icons";
import {
  CircleQuestionMarkIcon,
  InfoIcon,
  LucideArrowUpRight,
  MessageCircle,
  StarsIcon,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { UpdssocLogo } from "./ui/updssoc-logo";

const currentYear = new Date().getFullYear();
const years = Object.keys(catalog)
  .map(Number)
  .filter((year) => year < currentYear && catalog[year] !== null)
  .sort((a, b) => b - a) // Sort in descending order (latest first)
  .map(String);

export default function Home() {
  return (
    <>
      <Slide>
        <div className="flex flex-col justify-between items-center x-6 max-w-4xl mx-auto">
          <motion.h1
            {...fadeInDown()}
            className="text-center text-3xl md:text-5xl sm:text-4xl font-black text-primary mb-2 flex"
          >
            Welcome to the
          </motion.h1>

          <motion.h1
            {...fadeInDown(0.1)}
            className="mb-12 flex flex-wrap items-center justify-center gap-2 w-full text-center"
          >
            <motion.div
              className="size-8 sm:size-12 md:size-16"
              initial={{ rotate: 300 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "linear" }}
            >
              <UpdssocLogo className="size-8 sm:size-12 md:size-16" />
            </motion.div>

            <span className="hover-target text-4xl sm:text-6xl md:text-7xl font-black">
              DataSci Wrapped
            </span>
          </motion.h1>

          <motion.div {...fadeInUp(0.2)} className="mb-8">
            <Button
              asChild
              size="lg"
              className="
                group
                font-semibold text-lg rounded-full transition-all duration-400 bg-primary/30
                hover:-translate-y-1 shadow-xl
                hover:shadow-[0_0_28px_rgba(255,165,0,0.2)]
                focus:shadow-[0_0_32px_rgba(255,165,0,0.25)]
                focus:outline-none
              "
            >
              <Link href="/personal" className="flex gap-2 items-center">
                <StarsIcon className="transition-transform duration-500 group-hover:rotate-180" />
                Unwrap Your Year in Data Science
              </Link>
            </Button>
          </motion.div>

          <motion.div {...fadeInUp(0.3)} className="mb-6">
            <p className="text-muted-foreground text-center">
              or view industry trends
            </p>
          </motion.div>

          <div className="flex flex-col justify-between items-start">
            {years.map((year, index) => {
              const isLatest = index === 0; // First year in the filtered list is the latest
              return (
                <motion.div key={year} {...fadeInUp(index * 0.1 + 0.4)}>
                  <Button
                    variant="link"
                    asChild
                    className={`flex justify-start text-primary hover:text-primary/90 transition-transform duration-200 hover:-translate-y-1 ${
                      isLatest ? "font-extrabold text-foreground" : ""
                    }`}
                  >
                    <Link href={`/${year}/`} className="text-xl flex gap-1">
                      {year}
                      <LucideArrowUpRight />
                      {isLatest && (
                        <span className="ml-1 text-sm text-muted-foreground">
                          (Latest)
                        </span>
                      )}
                    </Link>
                  </Button>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            {...fadeInUp(0.5)}
            className="flex flex-wrap items-center justify-center gap-1 md:gap-2 mt-14"
          >
            <Button asChild variant="link">
              <Link href="/about" className="flex items-center gap-1">
                <InfoIcon className="w-4 h-4" />
                <span className="text-base md:text-lg">About</span>
              </Link>
            </Button>
            <Button asChild variant="link">
              <Link href="/faq" className="flex items-center gap-1">
                <CircleQuestionMarkIcon className="w-4 h-4" />
                <span className="text-base md:text-lg">FAQ</span>
              </Link>
            </Button>
            <Button asChild variant="link">
              <Link href="/discussions" className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span className="text-base md:text-lg">Discussions</span>
              </Link>
            </Button>
            <Button asChild variant="link">
              <a
                href="https://github.com/andrianllmm/datasci-wrapped"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1"
              >
                <SiGithub />
                <span className="text-base md:text-lg">Source Code</span>
              </a>
            </Button>
          </motion.div>
        </div>
      </Slide>
    </>
  );
}
