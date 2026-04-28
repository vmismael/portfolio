"use client";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type FadeUpProps = HTMLMotionProps<"div"> & {
  delay?: number;        // ms
  distance?: number;     // px translateY
  once?: boolean;
};

/**
 * Drop-in replacement for the IntersectionObserver-based <FadeUp> in the
 * HTML reference. Uses Framer Motion's `whileInView` so it works with SSR.
 *
 * Usage:
 *   <FadeUp delay={80}><h1>Hello</h1></FadeUp>
 */
export function FadeUp({
  delay = 0,
  distance = 14,
  once = true,
  children,
  ...rest
}: FadeUpProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0 }}
      transition={{
        duration: 0.5,
        delay: delay / 1000,
        ease: [0.2, 0.6, 0.2, 1],
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
