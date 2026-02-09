import Slide from "@/components/Slide";
import { fadeInUp } from "@/lib/animations";
import AnimatedCounter from "@/components/AnimatedCounter";
import { ScrollAnimate } from "../ScrollAnimate";
import MarketSizeChart from "../charts/MarketSizeChart";
import { WrappedData } from "@/types/wrapped";

export default function MarketSizeSlide({ data }: { data: WrappedData }) {
  return (
    <Slide>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <ScrollAnimate animation={() => fadeInUp()}>
          <h1 className="text-center text-4xl md:text-7xl sm:text-6xl font-black text-foreground mb-4 flex">
            $
            <AnimatedCounter
              value={
                (data.marketSize.find((d) => d.year === data.year)?.usd ?? 0) *
                1_000_000_000
              }
              duration={3}
            />
          </h1>
        </ScrollAnimate>
        <MarketSizeChart data={data.marketSize} />
        <ScrollAnimate animation={() => fadeInUp(0.2)}>
          <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-4">
            The market is set to reach USD{" "}
            <span className="font-black text-primary">1,826.9B</span> by 2033,
            growing at a <span className="font-black text-primary">28.8%</span>{" "}
            CAGR from 2024.
          </h1>
        </ScrollAnimate>
      </div>
    </Slide>
  );
}
