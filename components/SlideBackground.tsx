"use client";

import { motion } from "motion/react";
import React from "react";
import { float } from "@/lib/animations";

const BUBBLE_COUNT = 5;

type Bubble = {
  width: number;
  height: number;
  left: number;
  top: number;
  xMove: number;
  yMove: number;
  duration: number;
  delay: number;
};

export default function SlideBackground() {
  const [bubbles, setBubbles] = React.useState<Bubble[]>([]);

  React.useEffect(() => {
    const generated = Array.from({ length: BUBBLE_COUNT }, () => ({
      width: Math.random() * 400 + 100,
      height: Math.random() * 400 + 100,
      left: Math.random() * 100,
      top: Math.random() * 100,
      xMove: Math.random() * 60 - 30,
      yMove: Math.random() * 60 - 30,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
    }));
    setBubbles(generated);
  }, []);

  return (
    <>
      <div className="absolute inset-0 bg-linear-to-br from-purple-700 to-purple-900" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((bubble, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-purple-400 opacity-5"
            style={{
              width: bubble.width,
              height: bubble.height,
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
            }}
            {...float(
              bubble.xMove,
              bubble.yMove,
              bubble.duration,
              bubble.delay,
            )}
          />
        ))}
      </div>
    </>
  );
}
