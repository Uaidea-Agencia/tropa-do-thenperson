"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { IntroOverlay } from "./IntroOverlay";

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
    <>
      <AnimatePresence>
        {showIntro && <IntroOverlay key="intro" onDone={() => setIntroDone(true)} />}
      </AnimatePresence>
      <div inert={showIntro}>{children}</div>
    </>
  );
}
