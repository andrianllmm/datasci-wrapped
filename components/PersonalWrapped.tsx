"use client";

import PersonalToolsSlide from "@/components/slides/PersonalToolsSlide";
import PersonalReposSlide from "@/components/slides/PersonalReposSlide";
import PersonalIntroSlide from "@/components/slides/PersonalIntroSlide";
import PersonalLanguagesSlide from "@/components/slides/PersonalLanguagesSlide";
import PersonalReputationSlide from "@/components/slides/PersonalReputationSlide";
import PersonalOutroSlide from "@/components/slides/PersonalOutroSlide";
import PersonalAchievementsSlide from "@/components/slides/PersonalAchievementsSlide";
import BackHomeButton from "@/components/BackHomeButton";
import { PersonalWrappedData } from "@/types/wrapped";

export default function PersonalWrapped({
  data,
  onEdit,
}: {
  data: PersonalWrappedData;
  onEdit?: () => void;
}) {
  return (
    <>
      <BackHomeButton />
      <div className="snap-y snap-mandatory h-screen w-screen overflow-y-scroll bg-background">
        <PersonalIntroSlide data={data} onEdit={onEdit} slideId="intro" />
        <PersonalAchievementsSlide data={data} slideId="achievements" />
        <PersonalReposSlide data={data} slideId="repos" />
        <PersonalReputationSlide data={data} slideId="reputation" />
        <PersonalToolsSlide data={data} slideId="tools" />
        <PersonalLanguagesSlide data={data} slideId="languages" />
        <PersonalOutroSlide data={data} onEdit={onEdit} slideId="outro" />
      </div>
    </>
  );
}
