import Slide from "@/components/Slide";
import { fadeInUp } from "@/lib/animations";
import { ScrollAnimate } from "../ScrollAnimate";
import { Button } from "../ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { WrappedData } from "@/data/types";
import Link from "next/link";

export default function OutroSlide({ data }: { data: WrappedData }) {
  return (
    <Slide>
      <div className="flex flex-col justify-between items-center x-6 max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <ScrollAnimate animation={() => fadeInUp(0)}>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
              See you next year!
            </h1>
          </ScrollAnimate>
          <ScrollAnimate animation={() => fadeInUp(0.2)}>
            <h2 className="text-4xl md:text-5xl font-bold text-purple-200 mb-8">
              in{" "}
              <Link
                href={`/${data.year + 1}`}
                className="text-purple-100 hover:text-purple-300 underline"
              >
                {data.year + 1}
              </Link>
              !
            </h2>
          </ScrollAnimate>
          <ScrollAnimate animation={() => fadeInUp(0.4)}>
            <p className="text-lg md:text-xl text-purple-100">
              by Andrian Lloyd Maagma from UP Data Science Society
            </p>
          </ScrollAnimate>
        </div>
        <ScrollAnimate animation={() => fadeInUp(0.6)}>
          <Button
            asChild={true}
            className="bg-purple-900 text-white hover:bg-purple-800"
          >
            <a
              href="https://github.com/andrianllmm/updssoc-bnc-internship"
              target="_blank"
              rel="noreferrer"
            >
              <SiGithub />
              View Source Code
            </a>
          </Button>
        </ScrollAnimate>
      </div>
    </Slide>
  );
}
