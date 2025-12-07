import type { TMotion } from "../types";
import { Variants } from "framer-motion";

export const textVariant = () => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
      },
    },
  };
};

export const fadeIn = (
  direction: TMotion["direction"],
  type: TMotion["type"],
  delay: TMotion["delay"],
  duration: TMotion["duration"]
): Variants => {
  const allowedTypes = ["tween", "spring"] as const;
  const safeType = allowedTypes.includes(type as any) ? type : undefined;
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        ...(safeType ? { type: safeType } : {}),
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

export const zoomIn = (
  delay: TMotion["delay"],
  duration: TMotion["duration"]
) => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

export const slideIn = (
  direction: TMotion["direction"],
  type: TMotion["type"],
  delay: TMotion["delay"],
  duration: TMotion["duration"]
): Variants => {
  const allowedTypes = ["tween", "spring"] as const;
  const safeType = allowedTypes.includes(type as any) ? type : undefined;
  const xFrom = direction === "left"
    ? "-100%"
    : direction === "right"
    ? "100%"
    : 0;
  const yFrom = direction === "up" ? "100%" : direction === "down" ? "100%" : 0;
  return {
    hidden: {
      x: xFrom,
      y: yFrom,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        ...(safeType ? { type: safeType } : {}),
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};
