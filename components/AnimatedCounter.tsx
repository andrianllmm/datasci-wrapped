"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "motion/react";
import { useInView } from "react-intersection-observer";

interface AnimatedCounterProps {
  value: number;
  duration?: number; // seconds
  formatter?: (value: number) => string;
  className?: string;
  delay?: number;
}

export default function AnimatedCounter({
  value,
  duration = 2,
  formatter,
  className,
  delay = 0,
}: AnimatedCounterProps) {
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const defaultFormatter = (num: number) => Math.floor(num).toLocaleString();

  useEffect(() => {
    if (!inView) return;

    const controls = animate(motionValue, value, {
      duration,
      delay,
      ease: [0.1, 0.8, 0.2, 1],
      onUpdate: (latest) => {
        setDisplayValue((formatter || defaultFormatter)(latest));
      },
    });

    return () => controls.stop();
  }, [inView, value, duration, delay, formatter, motionValue]);

  return (
    <motion.div
      ref={ref}
      className={`w-full text-center break-all ${className || ""}`}
    >
      {displayValue}
    </motion.div>
  );
}
