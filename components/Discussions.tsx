"use client";

import Slide from "@/components/Slide";
import GiscusComments from "@/components/GiscusComments";
import BackHomeButton from "@/components/BackHomeButton";

export default function DiscussionsContent() {
  return (
    <>
      <BackHomeButton />
      <Slide scrollable>
        <div className="flex flex-col gap-4 max-w-4xl mx-auto px-6">
          <div>
            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl  font-black text-foreground mb-2">
              DataSci Wrapped Discussions
            </h1>
            <p className="text-center text-foreground/70 text-sm sm:text-base md:text-lg">
              Share your thoughts, ask questions, and discuss anything related
              to DataSci Wrapped
            </p>
          </div>
          <div>
            <GiscusComments term="datasci-wrapped-general" />
          </div>
        </div>
      </Slide>
    </>
  );
}
