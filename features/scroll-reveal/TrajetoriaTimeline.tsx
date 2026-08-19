"use client";

import { useRef, type ReactElement } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { MilestoneRow } from "./MilestoneRow";
import type { Milestone } from "@/content/milestones";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMarkerYPositions } from "@/hooks/useMarkerYPositions";
import { EASE_BRAND } from "@/lib/motion";

interface TrajetoriaTimelineProps {
  milestones: Milestone[];
}

/**
 * Wraps the trajectory rows with one shared dot that travels from the
 * first milestone to the last as the reader scrolls, plus the static
 * track it rides on. Reuses the measure-real-DOM-positions technique
 * from `useAnchorPoints` (the Capa signature line) — just for a
 * straight vertical list, so no curve fitting, only linear
 * interpolation between each marker's real Y.
 */
export function TrajetoriaTimeline({ milestones }: Readonly<TrajetoriaTimelineProps>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lastMarkerRef = useRef<HTMLSpanElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const count = milestones.length;

  const markerYs = useMarkerYPositions(containerRef, markerRefs, count);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Piecewise-linear: the dot visits every marker's real Y in turn as
  // scrollYProgress advances through evenly spaced checkpoints — not
  // proportional to each row's actual height (that would need per-row
  // scroll distance, not worth it for an ambient effect), just always
  // hits every real dot along the way instead of drifting off text.
  const safeYs = markerYs ?? [0, 0];
  const inputRange = safeYs.map((_, i) => (safeYs.length > 1 ? i / (safeYs.length - 1) : 0));
  const travelerY = useTransform(scrollYProgress, inputRange, safeYs);

  // "Chegou no agora": the last milestone (`hoje`) scrolling into view,
  // independent of the imprecise progress math above — a plain
  // once-true inView check on its real marker, same primitive every
  // other reveal in this section already uses.
  const arrived = useInView(lastMarkerRef, { once: true, amount: 0.8 });

  const rows: ReactElement[] = [];
  let photoCount = 0;
  for (let i = 0; i < milestones.length; i++) {
    const milestone = milestones[i];
    const isLast = i === milestones.length - 1;
    rows.push(
      <MilestoneRow
        key={milestone.id}
        milestone={milestone}
        photoIndexOffset={photoCount}
        markerRef={(el) => {
          markerRefs.current[i] = el;
          if (isLast) lastMarkerRef.current = el;
        }}
      />,
    );
    photoCount += milestone.photos.length;
  }

  if (!markerYs) {
    return (
      <div ref={containerRef} className="relative">
        {rows}
      </div>
    );
  }

  const trackTop = markerYs[0];
  const trackHeight = markerYs[markerYs.length - 1] - trackTop;
  const finalY = markerYs[markerYs.length - 1];

  return (
    <div ref={containerRef} className="relative">
      <div
        aria-hidden="true"
        className="absolute left-0 w-0.5 -translate-x-1/2 bg-border"
        style={{ top: trackTop, height: trackHeight }}
      />

      {prefersReducedMotion ? (
        // Static equivalent: dot already parked at "agora", already at
        // its arrived size — no travel, no ripple, but the destination
        // still reads as reached.
        <div
          aria-hidden="true"
          className="absolute left-0 z-10 h-4.5 w-4.5 -translate-x-1/2 -translate-y-1/2 rounded-pill border-2 border-bg bg-accent"
          style={{ top: finalY }}
        />
      ) : (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 z-10 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-pill border-2 border-bg bg-accent"
            style={{ top: travelerY }}
            animate={{ scale: arrived ? 1.3 : 1 }}
            transition={{ duration: 0.5, ease: EASE_BRAND }}
          />
          {arrived && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 z-0 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-pill border-2 border-accent"
              style={{ top: finalY }}
              initial={{ opacity: 0.7, scale: 1 }}
              animate={{ opacity: 0, scale: 2.8 }}
              transition={{ duration: 0.9, ease: EASE_BRAND }}
            />
          )}
        </>
      )}

      {rows}
    </div>
  );
}
