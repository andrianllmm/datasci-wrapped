"use client";

import PersonalToolsSlide from "@/components/slides/PersonalToolsSlide";
import PersonalReposSlide from "@/components/slides/PersonalReposSlide";
import PersonalIntroSlide from "@/components/slides/PersonalIntroSlide";
import PersonalLanguagesSlide from "@/components/slides/PersonalLanguagesSlide";
import PersonalReputationSlide from "@/components/slides/PersonalReputationSlide";
import PersonalOutroSlide from "@/components/slides/PersonalOutroSlide";
import PersonalAchievementsSlide from "@/components/slides/PersonalAchievementsSlide";
import { PersonalWrappedData } from "@/types/wrapped";

export default function PersonalWrapped({
  data,
}: {
  data: PersonalWrappedData;
}) {
  return (
    <div className="snap-y snap-mandatory h-screen w-screen overflow-y-scroll bg-purple-700">
      <PersonalIntroSlide data={data} />
      <PersonalAchievementsSlide data={data} />
      <PersonalReposSlide data={data} />
      <PersonalReputationSlide data={data} />
      <PersonalToolsSlide data={data} />
      <PersonalLanguagesSlide data={data} />
      <PersonalOutroSlide data={data} />
    </div>
  );
}
