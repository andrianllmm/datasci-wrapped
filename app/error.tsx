"use client";

import Slide from "@/components/Slide";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Slide>
      <div className="flex flex-col justify-between items-center x-6 max-w-4xl mx-auto gap-4">
        <h1 className="text-center text-3xl md:text-5xl sm:text-4xl font-black text-foreground mb-4 flex gap-3">
          Error :(
        </h1>
        <p className="text-center text-lg text-foreground">{error.message}</p>
        <Button onClick={() => reset()} variant="secondary">
          Try again
        </Button>
      </div>
    </Slide>
  );
}
