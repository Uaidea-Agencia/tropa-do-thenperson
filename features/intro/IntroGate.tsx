"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { IntroOverlay } from "./IntroOverlay";

// Default true so anything reading this outside a provider (tests,
// isolated stories) doesn't block forever waiting for an intro that
// will never render.
const IntroReadyContext = createContext(true);

/**
 * True once the intro overlay is no longer covering the page — either
 * it finished/was skipped, or it never showed at all
 * (prefers-reduced-motion). `children` stays mounted (just `inert`)
 * the whole time the intro plays, so anything below it that only
 * checks viewport intersection (e.g. the Capa signature line's
 * `useInView`) sees itself "in view" from the very first paint, even
 * while the intro's opaque overlay is still covering it — gate any
 * "first appearance" animation on this instead.
 */
export function useIntroReady(): boolean {
  return useContext(IntroReadyContext);
}

export function IntroGate({ children }: Readonly<{ children: ReactNode }>) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [introDone, setIntroDone] = useState(false);
  const showIntro = !introDone && !prefersReducedMotion;

  useEffect(() => {
    if (!showIntro) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showIntro]);

  return (
    <IntroReadyContext.Provider value={!showIntro}>
      <AnimatePresence>
        {showIntro && <IntroOverlay key="intro" onDone={() => setIntroDone(true)} />}
      </AnimatePresence>
      <div inert={showIntro}>{children}</div>
    </IntroReadyContext.Provider>
  );
}
