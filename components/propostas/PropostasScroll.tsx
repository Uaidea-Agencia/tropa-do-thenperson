"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll } from "motion/react";
import { MapaJequitinhonha } from "./MapaJequitinhonha";
import { paradas, SUB_REGIAO_LABEL, type Parada } from "./data/paradas";
import { PILAR_ICONS } from "@/lib/pilar-icons";
import { Badge } from "@/components/ui/Badge";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DURATION, EASE_BRAND } from "@/lib/motion";

const VH_PER_PARADA = 80;
const VH_FOLGA = 20;

export function PropostasScroll() {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [paradaAtiva, setParadaAtiva] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const index = Math.min(paradas.length - 1, Math.max(0, Math.floor(value * paradas.length)));
    setParadaAtiva((current) => (current === index ? current : index));
  });

  function handleSelect(index: number) {
    const container = containerRef.current;
    if (!container) return;
    const clamped = Math.min(paradas.length - 1, Math.max(0, index));
    const fraction = (clamped + 0.5) / paradas.length;
    // getBoundingClientRect + scrollY, not offsetTop: offsetTop is relative
    // to the nearest positioned ancestor (here, the section's own
    // position:relative), not the document — it silently returns the
    // wrong number whenever a positioned ancestor sits in between.
    const documentTop = container.getBoundingClientRect().top + window.scrollY;
    const target = documentTop + fraction * (container.offsetHeight - window.innerHeight);
    window.scrollTo({ top: target, behavior: reducedMotion ? "auto" : "smooth" });
  }

  const heightVh = paradas.length * VH_PER_PARADA + VH_FOLGA;

  return (
    <div>
      <div
        ref={containerRef}
        className="relative hidden desktop:block"
        style={{ height: `${heightVh}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center py-10">
          <div className="grid grid-cols-5 items-center gap-10">
            <div className="col-span-3">
              <MapaJequitinhonha
                progress={scrollYProgress}
                paradaAtiva={paradaAtiva}
                onSelect={handleSelect}
                reducedMotion={reducedMotion}
              />
            </div>
            <div className="col-span-2">
              <PainelParada
                parada={paradas[paradaAtiva]}
                index={paradaAtiva}
                total={paradas.length}
                reducedMotion={reducedMotion}
              />
            </div>
          </div>
        </div>
      </div>

      <MobileCarousel reducedMotion={reducedMotion} onNavigate={handleSelect} />

      <noscript>
        <div className="mt-10 grid gap-6">
          {paradas.map((parada) => (
            <div key={parada.slug} className="rounded-card border border-border p-5">
              <p className="font-body text-caption uppercase tracking-wide text-text-muted">
                {SUB_REGIAO_LABEL[parada.subRegiao]} · {parada.cidade}
              </p>
              <h3 className="mt-2 font-heading text-h3 font-bold text-text">{parada.titulo}</h3>
              <p className="mt-2 font-body text-body text-text">{parada.texto}</p>
              {parada.dado && (
                <p className="mt-2 font-body text-caption text-text-muted">{parada.dado}</p>
              )}
            </div>
          ))}
        </div>
      </noscript>
    </div>
  );
}

interface PainelParadaProps {
  parada: Parada;
  index: number;
  total: number;
  reducedMotion: boolean;
}

function PainelParada({ parada, index, total, reducedMotion }: Readonly<PainelParadaProps>) {
  const Icon = PILAR_ICONS[parada.icon];

  return (
    <div className="rounded-card border border-border/40 bg-bg/35 p-6 backdrop-blur-lg desktop:p-8">
      <p className="font-body text-caption font-medium uppercase tracking-wide text-text-muted">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} — {parada.eixo}
      </p>
      <AnimatePresence mode="wait">
        <motion.div
          key={parada.slug}
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -24 }}
          transition={{ duration: reducedMotion ? 0 : DURATION.block, ease: EASE_BRAND }}
        >
          <Badge tone="glass" className="mt-3">
            {SUB_REGIAO_LABEL[parada.subRegiao]}
          </Badge>
          <div className="mt-4 flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-primary text-text-inverse">
              <Icon size={22} aria-hidden="true" />
            </span>
            <h3 className="font-heading text-h3 font-bold text-text">{parada.titulo}</h3>
          </div>
          <p className="mt-3 font-body text-body text-text">{parada.texto}</p>
          {parada.dado && (
            <p className="mt-2 font-body text-caption text-text-muted">{parada.dado}</p>
          )}
          <p className="mt-4 font-body text-caption uppercase tracking-wide text-text-muted">
            {parada.cidade} · {parada.microrregiao}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

interface MobileCarouselProps {
  reducedMotion: boolean;
  onNavigate: (index: number) => void;
}

function MobileCarousel({ reducedMotion, onNavigate }: Readonly<MobileCarouselProps>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);
  const staticProgress = useMotionValue(1);

  useEffect(() => {
    const cards = cardRefs.current.filter((el): el is HTMLButtonElement => el !== null);
    const root = rowRef.current;
    if (cards.length === 0 || !root) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const mostVisible = visible.reduce((a, b) =>
          a.intersectionRatio >= b.intersectionRatio ? a : b,
        );
        const index = Number(mostVisible.target.getAttribute("data-index"));
        setActiveIndex((current) => (current === index ? current : index));
      },
      { root, threshold: 0.6 },
    );

    for (const card of cards) observer.observe(card);
    return () => observer.disconnect();
  }, []);

  function handleSelect(index: number) {
    const card = cardRefs.current[index];
    card?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
    onNavigate(index);
  }

  return (
    <div className="desktop:hidden">
      {/* sticky, not a fixed h-[Nvh]: a vh-based height stayed constant
          while the map's actual width (and so its rendered height,
          since the SVG keeps its own aspect ratio) grew with the
          container — near the desktop breakpoint (mobile layout still
          active just under 1024px) that mismatch cropped the shape and
          made it look like it was colliding with the cards below.
          aspect-[900/684] matches jequitinhonha.paths.json's viewBox
          exactly, so the container's height always matches the SVG's
          natural height — nothing to crop, at any width. max-w-lg caps
          how wide (and so how tall) it gets in that same near-desktop
          range. sticky top-16 keeps it in view, right below the fixed
          header, while the proposals are swiped/scrolled below it. */}
      <div className="sticky top-16 z-10 mx-auto aspect-900/684 w-full max-w-lg overflow-hidden rounded-card bg-bg-muted">
        <MapaJequitinhonha
          progress={staticProgress}
          paradaAtiva={activeIndex}
          onSelect={handleSelect}
          reducedMotion={reducedMotion}
        />
      </div>

      <div
        ref={rowRef}
        className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
        aria-label="Paradas do mapa"
      >
        {paradas.map((parada, index) => {
          const Icon = PILAR_ICONS[parada.icon];
          const ativo = index === activeIndex;
          return (
            <button
              key={parada.slug}
              type="button"
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              data-index={index}
              onClick={() => handleSelect(index)}
              aria-pressed={ativo}
              aria-label={`${parada.cidade} — ${parada.eixo}: ${parada.titulo}${parada.base ? " · base do candidato" : ""}`}
              className="w-[85%] shrink-0 snap-center rounded-card border border-border/40 bg-bg/35 p-5 text-left backdrop-blur-lg outline-none focus-visible:outline-2 focus-visible:outline-focus"
            >
              <p className="font-body text-caption font-medium uppercase tracking-wide text-text-muted">
                {String(index + 1).padStart(2, "0")} / {String(paradas.length).padStart(2, "0")} —{" "}
                {parada.eixo}
              </p>
              <Badge tone="glass" className="mt-3">
                {SUB_REGIAO_LABEL[parada.subRegiao]}
              </Badge>
              <div className="mt-4 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-primary text-text-inverse">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="font-heading text-h3 font-bold text-text">{parada.titulo}</h3>
              </div>
              <p className="mt-3 font-body text-body text-text">{parada.texto}</p>
              {parada.dado && (
                <p className="mt-2 font-body text-caption text-text-muted">{parada.dado}</p>
              )}
              <p className="mt-4 font-body text-caption uppercase tracking-wide text-text-muted">
                {parada.cidade} · {parada.microrregiao}
                {parada.base ? " · base do candidato" : ""}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
