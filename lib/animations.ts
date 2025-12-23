"use client";

import { HTMLMotionProps, Transition } from "motion/react";

type MotionDivProps = Omit<HTMLMotionProps<"div">, "ref">;

type Easing = Transition["ease"];

// Fade in
export const fadeIn = (
  delay = 0,
  duration = 1,
  ease: Easing = "easeOut",
): MotionDivProps => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, delay, ease },
});

// Fade in up
export const fadeInUp = (
  delay = 0,
  distance = 30,
  duration = 1,
  ease: Easing = "easeOut",
): MotionDivProps => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease },
});

// Fade in down
export const fadeInDown = (
  delay = 0,
  distance = 30,
  duration = 1,
  ease: Easing = "easeOut",
): MotionDivProps => ({
  initial: { opacity: 0, y: -distance },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease },
});

// Slide in left
export const slideInLeft = (
  delay = 0,
  distance = 50,
  duration = 0.8,
  ease: Easing = "easeOut",
): MotionDivProps => ({
  initial: { opacity: 0, x: -distance },
  animate: { opacity: 1, x: 0 },
  transition: { duration, delay, ease },
});

// Slide in right
export const slideInRight = (
  delay = 0,
  distance = 50,
  duration = 0.8,
  ease: Easing = "easeOut",
): MotionDivProps => ({
  initial: { opacity: 0, x: distance },
  animate: { opacity: 1, x: 0 },
  transition: { duration, delay, ease },
});

// Scale in
export const scaleIn = (
  delay = 0,
  startScale = 0.8,
  endScale = 1,
  duration = 0.8,
  ease: Easing = "easeOut",
): MotionDivProps => ({
  initial: { opacity: 0, scale: startScale },
  animate: { opacity: 1, scale: endScale },
  transition: { duration, delay, ease },
});

// Scroll dot animation
export const scrollDot = (
  yStart = 4,
  yEnd = 12,
  duration = 1.5,
  ease: Easing = "easeInOut",
): MotionDivProps => ({
  animate: { y: [yStart, yEnd, yStart], opacity: [1, 0, 1] },
  transition: { duration, repeat: Infinity, ease },
});

// Bounce animation for container
export const bounceY = (
  yStart = 0,
  yEnd = -8,
  duration = 1.5,
  ease: Easing = "easeInOut",
): MotionDivProps => ({
  animate: { y: [yStart, yEnd, yStart] },
  transition: { duration, repeat: Infinity, ease },
});

// Float animation
export const float = (
  xMove = 60,
  yMove = 60,
  duration = 3,
  delay = 0,
  ease: Easing = "easeInOut",
): MotionDivProps => ({
  animate: {
    x: [0, xMove, -xMove, 0],
    y: [0, yMove, -yMove, 0],
    scale: [1, 1.1, 0.9, 1],
  },
  transition: { duration, delay, repeat: Infinity, ease },
});
