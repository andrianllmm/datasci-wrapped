import Slide from "@/components/Slide";
import { fadeInUp } from "@/lib/animations";
import { ScrollAnimate } from "../ScrollAnimate";
import LanguagesChart from "../charts/LanguagesChart";
import { PersonalWrappedData } from "@/types/wrapped";

export default function PersonalLanguagesSlide({
  data,
}: {
  data: PersonalWrappedData;
}) {
  return (
    <Slide>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <ScrollAnimate animation={() => fadeInUp()}>
          <h1 className="text-center text-2xl md:text-5xl sm:text-4xl font-black text-foreground mb-4 flex flex-wrap justify-center items-center gap-3">
            You code primarily in{" "}
            <span className="text-primary">
              {data.languages[0]?.language ?? "multiple languages"}
            </span>
          </h1>
        </ScrollAnimate>
        <LanguagesChart data={data.languages} />
        <ScrollAnimate animation={() => fadeInUp(0.2)}>
          <h1 className="text-center text-lg md:text-xl font-semibold text-primary mb-4">
            Your most used programming languages
          </h1>
        </ScrollAnimate>
      </div>
    </Slide>
  );
}
