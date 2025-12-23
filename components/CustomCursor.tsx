"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const [hovering, setHovering] = useState(false);

  // Motion values for pointer position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Inner dot follows pointer immediately
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 35, mass: 0.5 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 35, mass: 0.5 });

  // Outer halo trails behind with more delay
  const haloX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 1.2 });
  const haloY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 1.2 });

  // Reset hover state on route change
  useEffect(() => {
    // defer the state update to avoid sync render warning
    const id = setTimeout(() => setHovering(false), 0);
    return () => clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canUseCustomCursor =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(hover: none)").matches &&
      !shouldReduceMotion;

    if (!canUseCustomCursor) return;

    // Track pointer
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Hover detection for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          ".hover-target, a, button, input, textarea, select, label",
        )
      ) {
        setHovering(true);
      }
    };
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          ".hover-target, a, button, input, textarea, select, label",
        )
      ) {
        setHovering(false);
      }
    };

    document.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [mouseX, mouseY, shouldReduceMotion]);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {/* Outer trailing halo */}
      <motion.span
        style={{
          translateX: haloX,
          translateY: haloY,
        }}
        animate={{
          scale: hovering ? 2 : 1,
          opacity: hovering ? 0.25 : 0.15,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-orange-300/90 bg-orange-300/70 shadow-lg"
      />

      {/* Inner dot */}
      <motion.span
        style={{
          translateX: dotX,
          translateY: dotY,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-orange-400/50 shadow-md"
      />
    </motion.div>
  );
}
