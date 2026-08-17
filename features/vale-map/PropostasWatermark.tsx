"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { site } from "@/content/site";

const FULL_TEXT = site.electoralNumber;
const TYPE_MS = 180;
const DELETE_MS = 100;
const HOLD_MS = 1400;
const EMPTY_HOLD_MS = 500;

type Phase = "typing" | "holding" | "deleting";

export function PropostasWatermark() {
  const reducedMotion = usePrefersReducedMotion();
  const [charCount, setCharCount] = useState(FULL_TEXT.length);
  const [phase, setPhase] = useState<Phase>("holding");

  useEffect(() => {
    if (reducedMotion) return undefined;

    if (phase === "typing") {
      if (charCount < FULL_TEXT.length) {
        const timer = setTimeout(() => setCharCount((count) => count + 1), TYPE_MS);
        return () => clearTimeout(timer);
      }
      const timer = setTimeout(() => setPhase("holding"), 0);
      return () => clearTimeout(timer);
    }

    if (phase === "holding") {
      const timer = setTimeout(() => setPhase("deleting"), HOLD_MS);
      return () => clearTimeout(timer);
    }

    if (charCount > 0) {
      const timer = setTimeout(() => setCharCount((count) => count - 1), DELETE_MS);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setPhase("typing"), EMPTY_HOLD_MS);
    return () => clearTimeout(timer);
  }, [phase, charCount, reducedMotion]);

  const text = reducedMotion ? FULL_TEXT : FULL_TEXT.slice(0, charCount);

  return (
    <p
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-1/2 z-0 min-h-[1em] -translate-y-1/2 select-none whitespace-nowrap font-display text-[clamp(56px,20vw,160px)] leading-none text-border tablet:-right-10 tablet:text-[clamp(160px,34vw,460px)]"
    >
      {text}
      {!reducedMotion && <span className="opacity-40">|</span>}
    </p>
  );
}
