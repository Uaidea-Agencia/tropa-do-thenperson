"use client";

import { forwardRef, useEffect } from "react";
import { motion, useAnimationControls } from "motion/react";
import type { LucideIcon } from "lucide-react";

interface FloatingPilarTagProps {
  icon: LucideIcon;
  label: string;
  animated: boolean;
  delay?: number;
  lit?: boolean;
  dataProposta?: string;
  className?: string;
}

export const FloatingPilarTag = forwardRef<HTMLDivElement, Readonly<FloatingPilarTagProps>>(
  function FloatingPilarTag(
    { icon: Icon, label, animated, delay = 0, lit = false, dataProposta, className = "relative" },
    ref,
  ) {
    // animated (continuous bob, used by IntroOverlay and, after the
    // Capa signature line finishes, by Capa itself) and lit (one-shot
    // pulse while the line is still running) never happen at the same
    // call site at the same time, but both drive the *same* `animate`
    // prop — a single AnimationControls instance keeps that safe:
    // whichever effect fires last wins the current animation instead
    // of two plain-object `animate` targets silently clobbering each
    // other.
    const controls = useAnimationControls();

    useEffect(() => {
      if (!animated) return undefined;
      void controls.start({
        y: [0, -14, 0],
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
      });
      return () => controls.stop();
    }, [animated, delay, controls]);

    useEffect(() => {
      if (!lit) return;
      void controls.start({ scale: [1, 1.04, 1], transition: { duration: 0.3 } });
    }, [lit, controls]);

    return (
      <div ref={ref} data-proposta={dataProposta} className={className}>
        <motion.div
          className={`flex items-center gap-2 rounded-pill border-2 px-4 py-2 backdrop-blur-sm transition-colors duration-300 ease-brand ${
            lit
              ? "border-accent bg-text-inverse/15 opacity-100"
              : "border-transparent bg-text-inverse/10 opacity-55"
          }`}
          animate={controls}
        >
          <Icon size={16} className="text-marker" aria-hidden="true" />
          <span className="font-body text-caption text-text-inverse">{label}</span>
        </motion.div>
      </div>
    );
  },
);
