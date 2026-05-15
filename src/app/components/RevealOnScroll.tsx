import { CSSProperties, ReactNode } from "react";
import { useInView } from "../hooks/useInView";

export type RevealAnimation =
  | "fade-in"
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-in"
  | "blur-in";

interface RevealOnScrollProps {
  children: ReactNode;
  animation?: RevealAnimation;
  /** Delay in ms before the animation starts (applied when element enters viewport) */
  delay?: number;
  /** Total transition duration in ms */
  duration?: number;
  /** IntersectionObserver threshold (0–1) */
  threshold?: number;
  /** If true, animation fires only once; if false, reverses on exit */
  once?: boolean;
  className?: string;
  style?: CSSProperties;
}

// Initial (hidden) and final (visible) CSS states per animation type.
// Only uses opacity + transform + filter — GPU-composited, no layout thrash.
const VARIANTS: Record<RevealAnimation, { hidden: CSSProperties; visible: CSSProperties }> = {
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "fade-up": {
    hidden: { opacity: 0, transform: "translateY(28px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
  },
  "fade-down": {
    hidden: { opacity: 0, transform: "translateY(-28px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
  },
  // "fade-right": element enters sliding in from the left (moves rightward into position)
  "fade-right": {
    hidden: { opacity: 0, transform: "translateX(-32px)" },
    visible: { opacity: 1, transform: "translateX(0px)" },
  },
  // "fade-left": element enters sliding in from the right (moves leftward into position)
  "fade-left": {
    hidden: { opacity: 0, transform: "translateX(32px)" },
    visible: { opacity: 1, transform: "translateX(0px)" },
  },
  "scale-in": {
    hidden: { opacity: 0, transform: "scale(0.94)" },
    visible: { opacity: 1, transform: "scale(1)" },
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
};

// Checked once at module level — avoids repeated matchMedia calls.
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function RevealOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.1,
  once = true,
  className,
  style,
}: RevealOnScrollProps) {
  const { ref, inView } = useInView({ threshold, once });

  const variant = VARIANTS[animation];

  // When reduced motion is preferred, skip all animation styles.
  const animStyle: CSSProperties = prefersReducedMotion
    ? {}
    : {
        transitionProperty: "opacity, transform, filter",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        transitionDelay: inView ? `${delay}ms` : "0ms",
        ...(inView ? variant.visible : variant.hidden),
      };

  return (
    <div ref={ref} className={className} style={{ ...animStyle, ...style }}>
      {children}
    </div>
  );
}
