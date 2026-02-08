import Slide from "@/components/Slide";
import DataVolumeChart from "../charts/DataVolumeChart";
import { fadeInUp } from "@/lib/animations";
import AnimatedCounter from "@/components/AnimatedCounter";
import { ScrollAnimate } from "../ScrollAnimate";
import { WrappedData } from "@/types/wrapped";

export default function DataVolumeSlide({ data }: { data: WrappedData }) {
  return (
    <Slide>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <ScrollAnimate animation={() => fadeInUp()}>
          <h1 className="text-center text-3xl md:text-6xl sm:text-5xl font-black text-white mb-4 flex">
            <AnimatedCounter
              value={
                (data.dataVolume.find((d) => d.year === data.year)
                  ?.zettabytes ?? 0) * 1_000_000_000_000_000_000
              }
              duration={5}
            />
          </h1>
        </ScrollAnimate>
        <DataVolumeChart data={data.dataVolume} />
        <ScrollAnimate animation={() => fadeInUp(0.2)}>
          <h1 className="text-center text-2xl md:text-3xl font-bold text-purple-200 mb-4">
            ...and we transformed this mountain into actionable insights
          </h1>
        </ScrollAnimate>
      </div>
    </Slide>
  );
}
