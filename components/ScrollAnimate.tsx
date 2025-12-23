"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { useInView } from "react-intersection-observer";

interface ScrollAnimateProps {
  children: ReactNode;
  animation: () => HTMLMotionProps<"div">;
}

export function ScrollAnimate({ children, animation }: ScrollAnimateProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const frame = requestAnimationFrame(() => setStart(true));
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  const { initial, animate: anim, transition } = animation();

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={start ? anim : initial}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
