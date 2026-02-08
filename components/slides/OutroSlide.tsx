import Slide from "@/components/Slide";
import { fadeInUp } from "@/lib/animations";
import { ScrollAnimate } from "../ScrollAnimate";
import { WrappedData } from "@/types/wrapped";
import Link from "next/link";

export default function OutroSlide({ data }: { data: WrappedData }) {
  return (
    <Slide>
      <div className="flex flex-col justify-between items-center x-6 max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <ScrollAnimate animation={() => fadeInUp(0)}>
            <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
              See you next year!
            </h1>
          </ScrollAnimate>
          <ScrollAnimate animation={() => fadeInUp(0.2)}>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">
              in{" "}
              <Link href={`/${data.year + 1}`} className="underline">
                {data.year + 1}
              </Link>
              !
            </h2>
          </ScrollAnimate>
        </div>
      </div>
    </Slide>
  );
}
