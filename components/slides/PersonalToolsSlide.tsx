import Slide from "@/components/Slide";
import { fadeInUp } from "@/lib/animations";
import { ScrollAnimate } from "../ScrollAnimate";
import ToolsChart from "../charts/ToolsChart";
import { PersonalWrappedData } from "@/types/wrapped";

export default function PersonalToolsSlide({
  data,
  slideId,
}: {
  data: PersonalWrappedData;
  slideId?: string;
}) {
  return (
    <Slide slideId={slideId}>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <ScrollAnimate animation={() => fadeInUp()}>
          <h1 className="text-center text-2xl md:text-5xl sm:text-4xl font-black text-foreground mb-4 flex flex-wrap justify-center items-center gap-3">
            You love working with{" "}
            <span className="text-primary">
              {data.tools[0]?.tool ?? "various tools"}
            </span>
          </h1>
        </ScrollAnimate>
        <ToolsChart data={data.tools} />
        <ScrollAnimate animation={() => fadeInUp(0.2)}>
          <h1 className="text-center text-lg md:text-xl font-semibold text-primary mb-4">
            Tools and technologies found in your projects
          </h1>
        </ScrollAnimate>
      </div>
    </Slide>
  );
}
