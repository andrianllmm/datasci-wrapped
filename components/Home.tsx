"use client";

import Slide from "@/components/Slide";
import { Button } from "@/components/ui/button";
import { catalog } from "@/data/catalog";
import { fadeInDown, fadeInUp, slideInLeft } from "@/lib/animations";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { LucideArrowUpRight, MessageCircle, StarsIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

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
            className="text-center text-3xl md:text-5xl sm:text-4xl font-black text-primary mb-0 flex gap-3"
          >
            Welcome to the
          </motion.h1>

          <motion.h1
            {...fadeInDown(0.1)}
            className="text-center text-4xl md:text-6xl sm:text-5xl font-black text-foreground mb-12 flex justify-center items-end gap-2"
          >
            DataSci{" "}
            <span className="hover-target text-5xl md:text-7xl sm:text-6xl">
              Wrapped
            </span>
          </motion.h1>

          <motion.div {...fadeInUp(0.2)} className="mb-8">
            <Button
              asChild
              size="lg"
              className="font-bold text-lg px-8 py-6 rounded-xl transition-all duration-200 hover:-translate-y-1 shadow-lg"
            >
              <Link href="/personal" className="flex gap-2 items-center">
                <StarsIcon /> Unwrap Your Year in Data Science
              </Link>
            </Button>
          </motion.div>

          <motion.div {...fadeInUp(0.3)} className="mb-6">
            <p className="text-muted-foreground text-center">
              or view industry trends
            </p>
          </motion.div>

          <div className="flex flex-col justify-between items-start mb-12">
            {years.map((year, index) => {
              const isLatest = index === 0; // First year in the filtered list is the latest
              return (
                <motion.div key={year} {...slideInLeft(index * 0.1 + 0.4)}>
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
            className="flex items-center justify-center gap-2"
          >
            <Button asChild variant="link">
              <Link href="/about">
                <span className="text-base">About</span>
              </Link>
            </Button>
            <Button asChild variant="link">
              <Link href="/faq">
                <span className="text-base">FAQ</span>
              </Link>
            </Button>
            <Button asChild variant="link">
              <Link href="/discussions" className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span className="text-base">Discussions</span>
              </Link>
            </Button>
            <Button asChild variant="link">
              <a
                href="https://github.com/andrianllmm/datasci-wrapped"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2"
              >
                <SiGithub />
                <span className="text-base">Source Code</span>
              </a>
            </Button>
          </motion.div>
        </div>
      </Slide>
    </>
  );
}
