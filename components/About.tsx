"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { fadeInDown, fadeInUp } from "@/lib/animations";
import Slide from "@/components/Slide";
import BackHomeButton from "@/components/BackHomeButton";
import { Button } from "@/components/ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import {
  Sparkles,
  TrendingUp,
  Users,
  BarChart2Icon,
  ExternalLink,
  UserIcon,
} from "lucide-react";
import { UpdssocLogo } from "./ui/updssoc-logo";

export default function About() {
  const features = [
    {
      icon: TrendingUp,
      title: "Industry Insights",
      description:
        "Explore real-world data science trends with interactive visualizations",
    },
    {
      icon: Sparkles,
      title: "Personalized Wrapped",
      description:
        "Connect your GitHub and StackOverflow profiles to generate a personalized summary of your data science journey and contributions.",
    },
    {
      icon: Users,
      title: "Community Focused",
      description:
        "Discover how your skills compare to industry trends and celebrate your achievements in data science.",
    },
    {
      icon: BarChart2Icon,
      title: "Interactive Charts",
      description:
        "Engaging visualizations that bring data to life, from programming languages to in-demand roles.",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Explore Industry Data",
      description:
        "Start by viewing the latest data science trends. Browse through visualizations of popular programming languages, in-demand roles, market size trends, and more powered by real GitHub and Stack Overflow data.",
    },
    {
      step: "02",
      title: "Connect Your GitHub Profile",
      description:
        "Create a personalized wrapped by authenticating with GitHub. We analyze your public repositories, contributions, and coding patterns to generate insights about your data science journey.",
    },
    {
      step: "03",
      title: "Discover Your Wrapped",
      description:
        "Get your personalized DataSci Wrapped featuring your achievements, top languages, tools, and repositories. Share your summary with the community and celebrate your contributions!",
    },
  ];

  return (
    <>
      <BackHomeButton />

      {/* Hero Section */}
      <Slide>
        <motion.div className="max-w-3xl mx-auto text-center px-4">
          <motion.div {...fadeInDown()} className="mb-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 mb-6">
              <p className="text-sm font-medium text-primary">
                About this project
              </p>
            </div>
          </motion.div>

          <motion.h1
            {...fadeInDown(0.1)}
            className="text-4xl md:text-6xl font-black text-foreground mb-6"
          >
            DataSci Wrapped
          </motion.h1>

          <motion.p
            {...fadeInDown(0.2)}
            className="text-lg md:text-xl text-muted-foreground mb-8"
          >
            A data-driven web application inspired by{" "}
            <span className="underline">Spotify Wrapped</span> to visualizing
            data science industry trends and celebrating your personal
            contributions.
          </motion.p>

          <motion.p
            {...fadeInUp()}
            className="flex justify-center items-center gap-2 text-lg"
          >
            <a
              href="https://andrianllmm.github.io"
              target="_blank"
              rel="noreferrer"
            >
              <span className="ml-1 text-primary font-medium hover:underline">
                Andrian Lloyd Maagma
              </span>
            </a>
            <span className="text-primary">X</span>
            <span className="text-primary">
              <UpdssocLogo className="size-6 inline-block mr-1" />
              UP DSSoc
            </span>
          </motion.p>
        </motion.div>
      </Slide>

      {/* Features Section */}
      <Slide>
        <motion.div className="max-w-5xl mx-auto w-full px-4">
          <motion.h2
            {...fadeInDown()}
            className="text-4xl md:text-5xl font-black text-foreground mb-12 text-center"
          >
            What You Can Explore
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  {...fadeInUp(index * 0.1)}
                  className="p-6 rounded-xl bg-card/50 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/20">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Slide>

      {/* How It Works Section */}
      <Slide>
        <motion.div className="max-w-3xl mx-auto w-full px-4">
          <motion.h2
            {...fadeInDown()}
            className="text-4xl md:text-5xl font-black text-foreground mb-12 text-center"
          >
            How It Works
          </motion.h2>

          <div className="space-y-6">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                {...fadeInUp(index * 0.1)}
                className="flex gap-6 items-start"
              >
                <div className="shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 border border-primary/40">
                    <span className="text-lg font-bold text-primary">
                      {item.step}
                    </span>
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Slide>

      {/* Context Section */}
      <Slide>
        <motion.div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2
            {...fadeInDown(0.1)}
            className="text-3xl md:text-5xl font-black text-foreground mb-6"
          >
            An Internship Project
          </motion.h2>

          <motion.p
            {...fadeInUp(0.2)}
            className="text-lg text-muted-foreground mb-8 leading-relaxed"
          >
            DataSci Wrapped was developed by <b>Andrian Lloyd Maagma</b>
            <br /> as part Associate&apos;s Internship at the UP Data Science
            Society (DSSoc).
          </motion.p>

          <motion.div {...fadeInUp()}>
            <Button asChild variant="secondary" size="lg">
              <a
                href="https://andrianllmm.github.io"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4" />
                About the Developer
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </Slide>

      {/* CTA Section */}
      <Slide>
        <motion.div className="max-w-2xl mx-auto px-4 text-center">
          <motion.h2
            {...fadeInDown()}
            className="text-3xl md:text-5xl font-black text-foreground mb-6"
          >
            Ready to Explore?
          </motion.h2>

          <motion.p
            {...fadeInDown(0.1)}
            className="text-lg text-muted-foreground mb-8"
          >
            Start exploring trends and create your personalized wrapped summary
            today.
          </motion.p>

          <motion.div
            {...fadeInUp(0.2)}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button asChild size="lg">
              <Link href="/">Back to Home</Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href="/faq">FAQ</Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <a
                href="https://github.com/andrianllmm/datasci-wrapped"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center"
              >
                <SiGithub /> View on GitHub
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </Slide>
    </>
  );
}
