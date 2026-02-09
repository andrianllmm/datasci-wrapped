"use client";

import BackHomeButton from "@/components/BackHomeButton";
import { AboutHeroSlide } from "@/components/slides/AboutHeroSlide";
import { AboutFeaturesSlide } from "@/components/slides/AboutFeaturesSlide";
import { AboutHowItWorksSlide } from "@/components/slides/AboutHowItWorksSlide";
import { AboutContextSlide } from "@/components/slides/AboutContextSlide";
import { AboutCtaSlide } from "@/components/slides/AboutCtaSlide";

export default function About() {
  return (
    <div className="snap-y snap-mandatory h-screen w-screen overflow-y-scroll bg-background">
      <BackHomeButton />
      <AboutHeroSlide />
      <AboutFeaturesSlide />
      <AboutHowItWorksSlide />
      <AboutContextSlide />
      <AboutCtaSlide />
    </div>
  );
}
