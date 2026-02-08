import Slide from "@/components/Slide";
import { fadeInUp } from "@/lib/animations";
import { ScrollAnimate } from "../ScrollAnimate";
import ToolsChart from "../charts/ToolsChart";
import { WrappedData } from "@/types/wrapped";

export default function ToolsSlide({ data }: { data: WrappedData }) {
  return (
    <Slide>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <ScrollAnimate animation={() => fadeInUp()}>
          <h1 className="text-center text-2xl md:text-5xl sm:text-4xl font-black text-foreground mb-4 flex flex-wrap items-center justify-center gap-3">
            We seem to love{" "}
            <span className="text-primary">{data.tools[0].tool}</span> so
            much...
          </h1>
        </ScrollAnimate>
        <ToolsChart data={data.tools} />
        <ScrollAnimate animation={() => fadeInUp(0.2)}>
          <h1 className="text-center text-2xl md:text-3xl font-bold text-primary mb-4">
            Pandas was the most used tool with 77% adoption,
            <br />
            and NumPy followed at 72%.
          </h1>
        </ScrollAnimate>
      </div>
    </Slide>
  );
}
