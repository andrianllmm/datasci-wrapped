"use client";

import Slide from "@/components/Slide";
import { Button } from "@/components/ui/button";
import { catalog } from "@/data/catalog";
import { fadeInDown, fadeInUp, slideInLeft } from "@/lib/animations";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { LucideArrowUpRight } from "lucide-react";
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
            className="text-center text-3xl md:text-5xl sm:text-4xl font-black text-purple-200 mb-0 flex gap-3"
          >
            Welcome to the
          </motion.h1>

          <motion.h1
            {...fadeInDown(0.1)}
            className="text-center text-4xl md:text-6xl sm:text-5xl font-black text-white mb-12 flex justify-center items-end gap-2"
          >
            DataSci{" "}
            <span className="hover-target text-5xl md:text-7xl sm:text-6xl">
              Wrapped
            </span>
          </motion.h1>

          <div className="flex flex-col justify-between items-start mb-12">
            {years.map((year, index) => {
              const isLatest = index === 0; // First year in the filtered list is the latest
              return (
                <motion.div key={year} {...slideInLeft(index * 0.1 + 0.1)}>
                  <Button
                    variant="link"
                    asChild
                    className={`flex justify-start text-purple-200 hover:text-purple-300 transition-transform duration-200 hover:-translate-y-1 ${
                      isLatest ? "font-extrabold text-white" : ""
                    }`}
                  >
                    <Link href={`/${year}/`} className="text-xl flex gap-1">
                      {year}
                      <LucideArrowUpRight />
                      {isLatest && (
                        <span className="ml-1 text-sm text-purple-300">
                          (Latest)
                        </span>
                      )}
                    </Link>
                  </Button>
                </motion.div>
              );
            })}
          </div>

          <motion.div {...fadeInUp(0.5)}>
            <Button
              asChild={true}
              className="mt-12 bg-purple-900 text-white hover:bg-purple-800 transition-transform duration-200 hover:-translate-y-1"
            >
              <a
                href="https://github.com/andrianllmm/datasci-wrapped"
                target="_blank"
                rel="noreferrer"
              >
                <SiGithub />
                View Source Code
              </a>
            </Button>
          </motion.div>
        </div>
      </Slide>
    </>
  );
}
