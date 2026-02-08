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
  onEdit,
}: {
  data: PersonalWrappedData;
  onEdit?: () => void;
}) {
  return (
    <div className="snap-y snap-mandatory h-screen w-screen overflow-y-scroll bg-background">
      <PersonalIntroSlide data={data} onEdit={onEdit} />
      <PersonalAchievementsSlide data={data} />
      <PersonalReposSlide data={data} />
      <PersonalReputationSlide data={data} />
      <PersonalToolsSlide data={data} />
      <PersonalLanguagesSlide data={data} />
      <PersonalOutroSlide data={data} />
    </div>
  );
}
