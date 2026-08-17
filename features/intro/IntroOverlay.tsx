"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { site } from "@/content/site";
import { pilares } from "@/content/pilares";
import { PILAR_ICONS } from "@/lib/pilar-icons";
import { FloatingPilarTag } from "@/components/ui/FloatingPilarTag";
import { FloatingTag } from "@/components/ui/FloatingTag";
import { DURATION, EASE_BRAND } from "@/lib/motion";
import { useTypewriter } from "./useTypewriter";

const NAME_SEGMENTS = ["THENPERSON", "DO VALE"] as const;
const PORTRAIT_MS = 900;
const TYPE_MS_PER_CHAR = 38;
const HOLD_MS = 350;

const TAGS = [
  { x: 6, y: 16, position: "left-[6%] top-[16%]" },
  { x: 93, y: 22, position: "right-[7%] top-[22%]" },
  { x: 8, y: 80, position: "left-[8%] bottom-[20%]" },
  { x: 94, y: 84, position: "right-[6%] bottom-[16%]" },
  { x: 18, y: 48, position: "left-[18%] top-[48%] hidden tablet:flex" },
  { x: 81, y: 44, position: "right-[19%] top-[44%] hidden tablet:flex" },
] as const;

type Phase = "portrait" | "typing" | "hold" | "collapsing";

interface IntroOverlayProps {
  onDone: () => void;
}

export function IntroOverlay({ onDone }: Readonly<IntroOverlayProps>) {
  const [phase, setPhase] = useState<Phase>("portrait");
  const skipButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    skipButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (phase !== "portrait") return;
    const timer = setTimeout(() => setPhase("typing"), PORTRAIT_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  const { visibleSegments } = useTypewriter({
    segments: NAME_SEGMENTS,
    msPerChar: TYPE_MS_PER_CHAR,
    active: phase === "typing",
    onDone: () => setPhase("hold"),
  });

  useEffect(() => {
    if (phase !== "hold") return;
    const timer = setTimeout(() => setPhase("collapsing"), HOLD_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "collapsing") return;
    const timer = setTimeout(onDone, DURATION.block * 1000);
    return () => clearTimeout(timer);
  }, [phase, onDone]);

  const collapsing = phase === "collapsing";
  const line1Typing = phase === "typing" && visibleSegments[0].length < NAME_SEGMENTS[0].length;
  const line2Typing =
    phase === "typing" &&
    visibleSegments[0].length === NAME_SEGMENTS[0].length &&
    visibleSegments[1].length < NAME_SEGMENTS[1].length;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Abertura — ${site.candidateName}`}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-primary-dark"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: collapsing ? 0 : 1, scale: collapsing ? 1.04 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DURATION.block, ease: EASE_BRAND }}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/35 via-transparent to-black/55" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {pilares.map((pilar, index) => (
          <motion.div
            key={pilar.id}
            className={`absolute ${TAGS[index].position}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: DURATION.block, ease: EASE_BRAND, delay: 0.1 + index * 0.06 }}
          >
            <FloatingPilarTag
              icon={PILAR_ICONS[pilar.icon]}
              label={pilar.titulo}
              animated={phase !== "portrait"}
              delay={index * 0.4}
            />
          </motion.div>
        ))}
      </div>

      <div className="relative flex flex-col items-center px-6 text-center" aria-hidden="true">
        <motion.div
          className="w-56 tablet:w-64 desktop:w-72"
          initial={{ opacity: 0, scale: 0.35, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: PORTRAIT_MS / 1000, ease: EASE_BRAND }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: PORTRAIT_MS / 1000,
            }}
          >
            <Image
              src="/images/institucionais/institucional-03-cutout.webp"
              alt=""
              width={700}
              height={880}
              priority
              sizes="288px"
              className="h-auto w-full drop-shadow-[0_20px_32px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
        </motion.div>

        <FloatingTag className="relative -mt-3 min-w-44 text-center">
          <p className="font-display text-display leading-none text-text-inverse">
            {visibleSegments[0]}
            {line1Typing && <span className="text-accent">|</span>}
          </p>
          <p className="-mt-1 font-heading text-h2 font-extrabold text-accent">
            {visibleSegments[1]}
            {line2Typing && <span className="text-text-inverse">|</span>}
          </p>
        </FloatingTag>
      </div>

      <button
        ref={skipButtonRef}
        type="button"
        onClick={onDone}
        className="absolute right-5 top-5 z-10 rounded-pill border border-text-inverse/40 bg-primary-dark/60 px-4 py-2 font-body text-button uppercase text-text-inverse backdrop-blur-sm transition-colors duration-150 ease-brand hover:bg-text-inverse hover:text-text tablet:right-8 tablet:top-8"
      >
        Pular
      </button>
    </motion.div>
  );
}
