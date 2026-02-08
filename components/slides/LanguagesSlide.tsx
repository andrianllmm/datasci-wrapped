import Slide from "@/components/Slide";
import { fadeInUp } from "@/lib/animations";
import { ScrollAnimate } from "../ScrollAnimate";
import LanguagesChart from "../charts/LanguagesChart";
import { WrappedData } from "@/types/wrapped";

export default function LanguagesSlide({ data }: { data: WrappedData }) {
  return (
    <Slide>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <ScrollAnimate animation={() => fadeInUp()}>
          <h1 className="text-center text-2xl md:text-5xl sm:text-4xl font-black text-foreground mb-4 flex flex-wrap justify-center items-center gap-3">
            We also seem to love{" "}
            <span className="text-primary">
              {data.languages[0].language.toLowerCase() === "python"
                ? "snakes"
                : data.languages[0].language}
            </span>{" "}
            more...
          </h1>
        </ScrollAnimate>
        <LanguagesChart data={data.languages} />
        <ScrollAnimate animation={() => fadeInUp(0.2)}>
          <h1 className="text-center text-2xl md:text-3xl font-bold text-primary mb-4">
            In job postings, Python is the most used programming language
            <br />
            followed by SQL and R
          </h1>
        </ScrollAnimate>
      </div>
    </Slide>
  );
}
