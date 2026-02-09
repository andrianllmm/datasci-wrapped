import Slide from "@/components/Slide";
import { fadeInUp } from "@/lib/animations";
import AnimatedCounter from "@/components/AnimatedCounter";
import { ScrollAnimate } from "../ScrollAnimate";
import AchievementsChart from "../charts/AchievementsChart";
import { PersonalWrappedData } from "@/types/wrapped";

export default function PersonalAchievementsSlide({
  data,
  slideId,
}: {
  data: PersonalWrappedData;
  slideId?: string;
}) {
  const topStat = data.achievements.sort((a, b) => b.value - a.value)[0];

  return (
    <Slide slideId={slideId}>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <ScrollAnimate animation={() => fadeInUp()}>
          <h1 className="text-center text-3xl md:text-6xl sm:text-5xl font-black text-foreground mb-2">
            <AnimatedCounter value={topStat?.value ?? 0} duration={3} />
          </h1>
          <h2 className="text-center text-xl md:text-2xl font-bold text-primary mb-8">
            {topStat?.label ?? "Your Stats"}
          </h2>
        </ScrollAnimate>
        <AchievementsChart data={data.achievements} />
        <ScrollAnimate animation={() => fadeInUp(0.2)}>
          <h1 className="text-center text-lg md:text-2l font-semibold text-primary/90 mb-4 px-4">
            Your achievements and contributions across GitHub and StackOverflow
          </h1>
        </ScrollAnimate>
      </div>
    </Slide>
  );
}
