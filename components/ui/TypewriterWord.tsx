"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const TYPE_MS = 90;
const DELETE_MS = 50;
const HOLD_MS = 1600;
const PAUSE_MS = 350;

type Phase = "typing" | "holding" | "deleting" | "pausing";

interface TypewriterWordProps {
  words: readonly string[];
  className?: string;
}

/** Chat-style type/hold/delete loop through a list of words, one at a
 * time, with a blinking cursor bar — same phase-machine shape as
 * PropostasWatermark's loop, just cycling through several words
 * instead of typing/deleting one fixed string. */
export function TypewriterWord({ words, className }: Readonly<TypewriterWordProps>) {
  const reducedMotion = usePrefersReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [charCount, setCharCount] = useState(words[0]?.length ?? 0);
  const [phase, setPhase] = useState<Phase>("holding");

  useEffect(() => {
    if (reducedMotion) return undefined;
    const currentWord = words[wordIndex] ?? "";

    if (phase === "typing") {
      if (charCount < currentWord.length) {
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

    if (phase === "deleting") {
      if (charCount > 0) {
        const timer = setTimeout(() => setCharCount((count) => count - 1), DELETE_MS);
        return () => clearTimeout(timer);
      }
      const timer = setTimeout(() => setPhase("pausing"), 0);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setWordIndex((index) => (index + 1) % words.length);
      setPhase("typing");
    }, PAUSE_MS);
    return () => clearTimeout(timer);
  }, [phase, charCount, wordIndex, words, reducedMotion]);

  const text = reducedMotion ? (words[0] ?? "") : (words[wordIndex] ?? "").slice(0, charCount);

  return (
    <span className={className}>
      <span aria-hidden="true">
        {text}
        {!reducedMotion && (
          <span className="ml-0.5 inline-block h-[0.85em] w-0.75 translate-y-[0.1em] animate-blink bg-current align-middle" />
        )}
      </span>
      <span className="sr-only">{words[0]}</span>
    </span>
  );
}
