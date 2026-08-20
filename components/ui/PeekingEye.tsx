"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Olha pro lado, pausa, olha pro outro, volta ao centro, descansa —
// nunca um jitter contínuo. `repeatDelay` é o que garante o "sutil":
// a pupila passa a maior parte do tempo parada, só "acordando" a cada
// ~5.4s (3.6s de movimento + 1.8s de pausa). Ver docs/ui-web.md, seção
// "Olhinho nos CTAs de mobilização".
const LOOK_TRANSITION = {
  duration: 3.6,
  times: [0, 0.15, 0.4, 0.55, 0.8, 1] as number[],
  repeat: Infinity,
  repeatDelay: 1.8,
  ease: "easeInOut" as const,
};

interface PeekingEyeProps {
  size?: number;
  className?: string;
}

/**
 * Olho cartunesco decorativo — branco + pupila (`--color-bg`/
 * `--color-text`, sempre token, nunca hex solto) em vez das cores do
 * botão em si, pra ler como um "olhinho" de verdade sobre qualquer
 * variante (`components/ui/Button.tsx` primary, `MagneticButton`
 * laranja) em vez de tentar casar com cada paleta. Puramente
 * decorativo — `aria-hidden`, nunca carrega texto/estado que leitor de
 * tela precise anunciar.
 */
export function PeekingEye({ size = 16, className = "" }: Readonly<PeekingEyeProps>) {
  const reducedMotion = usePrefersReducedMotion();
  const pupilRange = size * 0.16;

  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex shrink-0 items-center justify-center rounded-pill bg-bg ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.span
        className="block rounded-pill bg-text"
        style={{ width: size * 0.42, height: size * 0.42 }}
        animate={
          reducedMotion
            ? undefined
            : { x: [0, -pupilRange, -pupilRange, pupilRange, pupilRange, 0] }
        }
        transition={reducedMotion ? undefined : LOOK_TRANSITION}
      />
    </span>
  );
}
