import Slide from "@/components/Slide";
import ReputationChart from "../charts/ReputationChart";
import { fadeInUp } from "@/lib/animations";
import AnimatedCounter from "@/components/AnimatedCounter";
import { ScrollAnimate } from "../ScrollAnimate";
import { PersonalWrappedData } from "@/types/wrapped";

export default function PersonalReputationSlide({
  data,
  slideId,
}: {
  data: PersonalWrappedData;
  slideId?: string;
}) {
  // Get the most recent reputation value
  const currentReputation =
    data.reputation[data.reputation.length - 1]?.reputation ?? 0;

  if (currentReputation === 0) {
    return (
      <Slide slideId={slideId}>
        <div className="w-full h-full flex flex-col items-center justify-center px-6">
          <ScrollAnimate animation={() => fadeInUp()}>
            <h1 className="text-center text-3xl md:text-5xl font-black text-foreground mb-8">
              StackOverflow Reputation
            </h1>
          </ScrollAnimate>
          <ScrollAnimate animation={() => fadeInUp(0.2)}>
            <p className="text-center text-xl md:text-2xl text-primary">
              Add your StackOverflow ID to see your reputation growth!
            </p>
          </ScrollAnimate>
        </div>
      </Slide>
    );
  }

  return (
    <Slide slideId={slideId}>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <ScrollAnimate animation={() => fadeInUp()}>
          <h1 className="flex flex-col gap-1 text-center text-3xl md:text-6xl sm:text-5xl font-black text-foreground mb-4">
            <AnimatedCounter value={currentReputation} duration={3} />
            <span className="text-xl md:text-3xl text-primary">
              StackOverflow Reputation
            </span>
          </h1>
        </ScrollAnimate>
        <ReputationChart data={data.reputation} />
        <ScrollAnimate animation={() => fadeInUp(0.2)}>
          <h1 className="text-center text-lg md:text-xl font-semibold text-primary mb-4">
            Your reputation earned through community contributions
          </h1>
        </ScrollAnimate>
      </div>
    </Slide>
  );
}
