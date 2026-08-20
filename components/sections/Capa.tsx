"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimationControls } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FloatingTag } from "@/components/ui/FloatingTag";
import { FloatingPilarTag } from "@/components/ui/FloatingPilarTag";
import { PeekingEye } from "@/components/ui/PeekingEye";
import { TypewriterWord } from "@/components/ui/TypewriterWord";
import { Button } from "@/components/ui/Button";
import { SignatureLine } from "@/components/capa/SignatureLine";
import { PROPOSTA_TAGS } from "@/content/propostas-tags";
import { site } from "@/content/site";
import { useIntroReady } from "@/features/intro/IntroGate";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { PILAR_ICONS } from "@/lib/pilar-icons";

// Horseshoe sweep around the portrait — up the left side, across the
// top, down the right side — chosen so connecting the tags *in copy
// order* (Saúde → ... → Mineração) never crosses itself, ending near
// the bottom-right, close to where the name sits below the portrait.
// Same six slots as the original FLOAT_POSITIONS, just reassigned.
const DESKTOP_POSITIONS = [
  "desktop:left-[3%] desktop:bottom-[28%]", // Saúde
  "desktop:left-[13%] desktop:top-[46%]", // Trabalho e renda
  "desktop:left-[4%] desktop:top-[10%]", // Estradas
  "desktop:right-[5%] desktop:top-[15%]", // Juventude
  "desktop:right-[14%] desktop:top-[42%]", // Dinheiro público
  "desktop:right-[6%] desktop:bottom-[18%]", // Mineração
] as const;

const TAG_COUNT = PROPOSTA_TAGS.length;
const LINE_DURATION_S = 3;

// Sinônimos de "voz" (docs/tom-de-voz.md já define "voz" como
// "representação") — mesmo sentimento do headline aprovado, não uma
// proposta nova.
const HEADLINE_WORDS = ["voz", "representação", "atenção", "prioridade"] as const;

// Signature line + tags are desktop-only (≥1024px, matching the
// `desktop:` breakpoint the tags themselves already use to stay
// hidden below it) — tried a compact mobile variant (2×2 grid, shrunk
// portrait/name/tags) and it kept crowding out the "CTA visible
// without scrolling" fix from earlier in the project on short phones;
// reverted per client request rather than keep compressing.
export function Capa() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const introReady = useIntroReady();

  const sectionRef = useRef<HTMLElement>(null);
  const tagRefs = useRef<(HTMLElement | null)[]>([]);
  const nameRef = useRef<HTMLDivElement>(null);
  const nameControls = useAnimationControls();

  const [litIndices, setLitIndices] = useState<Set<number>>(new Set());
  // Tags stay still ("o resto da seção fica quieto") while the
  // signature line runs, then resume their gentle float once it's
  // done arriving at the name — same bob IntroOverlay's tags use.
  const [arrived, setArrived] = useState(false);

  const handleTagLit = useCallback((next: Set<number>) => {
    setLitIndices(next);
  }, []);

  const handleArrive = useCallback(() => {
    void nameControls.start({
      scale: [1, 1.05, 1],
      filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
      transition: { duration: 0.45, ease: "easeOut" },
    });
    setArrived(true);
  }, [nameControls]);

  function setTagRef(index: number) {
    return (el: HTMLDivElement | null) => {
      tagRefs.current[index] = el;
    };
  }

  return (
    <section
      ref={sectionRef}
      id="capa"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-primary-dark pb-6 pt-20"
    >
      {isDesktop && (
        <SignatureLine
          containerRef={sectionRef}
          tagRefs={tagRefs}
          tagCount={TAG_COUNT}
          nameRef={nameRef}
          onTagLit={handleTagLit}
          onArrive={handleArrive}
          reducedMotion={prefersReducedMotion}
          introReady={introReady}
          durationS={LINE_DURATION_S}
        />
      )}

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 hidden desktop:block">
        {PROPOSTA_TAGS.map((tag, index) => (
          <FloatingPilarTag
            key={tag.id}
            ref={setTagRef(index)}
            icon={PILAR_ICONS[tag.icon]}
            label={tag.label}
            animated={arrived && !prefersReducedMotion}
            lit={litIndices.has(index)}
            dataProposta={tag.id}
            className={`pointer-events-auto absolute ${DESKTOP_POSITIONS[index]}`}
          />
        ))}
      </div>

      <Container className="relative flex flex-col items-center text-center">
        <p className="font-body text-eyebrow uppercase text-accent-light">
          {site.role} · {site.state}
        </p>

        <div className="relative mt-6 w-40 tablet:w-72 desktop:w-80">
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/images/institucionais/institucional-03-cutout.webp"
              alt={`Retrato de ${site.candidateName}`}
              width={700}
              height={880}
              priority
              className="h-auto w-full drop-shadow-[0_24px_36px_rgba(0,0,0,0.5)]"
            />
          </motion.div>

          <motion.div
            ref={nameRef}
            animate={nameControls}
            className="absolute left-1/2 top-full w-max max-w-[92vw] -translate-x-1/2 -translate-y-1/2"
          >
            <FloatingTag className="text-center">
              <p className="font-display text-display leading-none text-text-inverse">
                THENPERSON
              </p>
              <p className="-mt-1 font-heading text-h2 font-extrabold text-accent">DO VALE</p>
            </FloatingTag>
          </motion.div>
        </div>

        {/* mt-16, não mt-10: a etiqueta do nome é `absolute` sob o
            retrato (não soma na altura do wrapper) e no mobile
            transborda ~47px abaixo dele — com mt-10 (40px) o "DO VALE"
            encostava no título ("comendo" o H1, ver feedback do
            cliente). mt-16 (64px) dá ~17px de respiro sem empurrar o
            CTA pra fora da viewport em telas curtas. */}
        <h1 className="mt-16 max-w-2xl font-heading text-h1 font-black text-text-inverse tablet:mt-24 desktop:mt-32">
          O <span className="text-accent">Vale do Jequitinhonha</span> precisa de{" "}
          <TypewriterWord words={HEADLINE_WORDS} />.
        </h1>

        <div className="mt-5">
          <Button
            href="#quer-saber-mais"
            variant="primary"
            icon={<ChevronDown size={18} aria-hidden="true" />}
          >
            Quero fazer parte
            <PeekingEye />
            <PeekingEye />
          </Button>
        </div>
      </Container>
    </section>
  );
}
