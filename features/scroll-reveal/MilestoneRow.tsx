"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import type { Milestone, MilestonePhoto } from "@/content/milestones";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DURATION, EASE_BRAND } from "@/lib/motion";
import { FundoOrigem } from "@/components/origem/FundoOrigem";

interface MilestoneRowProps {
  milestone: Milestone;
  photoIndexOffset: number;
  /** Exposes the marker dot's DOM node so TrajetoriaTimeline can measure
   *  its position and route the shared traveling dot through it. */
  markerRef?: (el: HTMLSpanElement | null) => void;
}

function Photo({
  photo,
  fromLeft,
  wide,
  delayIndex,
  animated,
}: Readonly<{
  photo: MilestonePhoto;
  fromLeft: boolean;
  wide: boolean;
  delayIndex: number;
  animated: boolean;
}>) {
  const image = (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes="(min-width: 1024px) 320px, 45vw"
      className="object-cover"
    />
  );

  const className = `relative aspect-3/4 w-full overflow-hidden rounded-card ${wide ? "tablet:w-2/3" : ""}`;

  if (!animated) {
    return <div className={className}>{image}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: fromLeft ? -32 : 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: DURATION.block, ease: EASE_BRAND, delay: delayIndex * 0.08 }}
    >
      {image}
    </motion.div>
  );
}

/**
 * Único marco com fundo full-bleed (foto real + loop em traço) em vez
 * do grid padrão texto/fotos — ver PROMPT_CLAUDE_CODE_INTEGRAR_ORIGEM.md.
 * O marcador troca de ring (branco → azul profundo) porque aqui o
 * "furo" precisa recortar contra um fundo escuro, não contra o branco
 * do resto da timeline.
 *
 * ⚠ Layout diferente abaixo de `tablet` (640px): testado no olho (ver
 * critério de aceite do prompt), a placa "futuro do comércio" ficava
 * atrás do bloco de texto — o texto (5 linhas) precisa de ~380px a
 * partir do fim da linha, mas a placa ocupa até 61% da altura da foto
 * quando ela cobre a linha inteira; forçar 380px de folga exigiria uma
 * linha de ~1000px no mobile. Em vez disso, no mobile a foto vira uma
 * faixa própria (`aspect-square`) no topo, sem crop vertical, e o texto
 * flui normalmente abaixo dela, sem se sobrepor. De `tablet` em diante
 * (foto e texto lado a lado, não empilhados) volta a ser full-bleed
 * atrás do texto, como no design original.
 *
 * Por isso a linha tem `bg-primary-dark` própria: no mobile o texto
 * (branco/laranja claro) fica numa área abaixo da foto, não mais em
 * cima dela — sem esse fundo ficaria texto claro sobre o branco da
 * seção. De `tablet` em diante a foto cobre a linha inteira por cima
 * dessa cor, então não faz diferença visível.
 */
function OrigemFotoRow({
  milestone,
  markerRef,
}: Readonly<{
  milestone: Milestone;
  markerRef?: (el: HTMLSpanElement | null) => void;
}>) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const animated = !prefersReducedMotion;

  const marcador = (
    <motion.span
      ref={markerRef}
      aria-hidden="true"
      className={`absolute left-0 top-1 z-10 h-3 w-3 -translate-x-1/2 rounded-pill border-2 border-primary-dark ${
        isInView ? "bg-accent" : "bg-text-inverse/40"
      }`}
      initial={false}
      animate={animated && isInView ? { scale: [1, 1.35, 1] } : { scale: 1 }}
      transition={{ duration: DURATION.block, ease: EASE_BRAND }}
    />
  );

  const texto = (
    <div className="relative max-w-xl">
      <p className="font-body text-eyebrow uppercase text-accent-light">{milestone.eyebrow}</p>
      <p className="mt-4 font-body text-body text-text-inverse/90">{milestone.text}</p>
    </div>
  );

  return (
    <div
      ref={ref}
      className="relative isolate border-b border-border bg-primary-dark pb-8 last:border-b-0 tablet:min-h-155 tablet:py-12 desktop:min-h-170 desktop:py-16"
    >
      {/* Full-bleed: sangra até a borda da viewport. No mobile, faixa
          própria (aspect-square) no fluxo normal, cancelando o padding
          do Container pai com -mx-5; de `tablet` em diante volta a ser
          a camada de fundo inteira atrás do texto, ignorando o max-w do
          Container via `calc(50%-50vw)`. */}
      <div className="relative -mx-5 aspect-square overflow-hidden tablet:absolute tablet:inset-y-0 tablet:-z-10 tablet:mx-0 tablet:aspect-auto tablet:left-[calc(50%-50vw)] tablet:right-[calc(50%-50vw)]">
        <FundoOrigem />
      </div>

      <div className="relative mt-6 pl-6 tablet:mt-0 tablet:flex tablet:h-full tablet:min-h-149 tablet:items-end desktop:min-h-163 desktop:pl-8">
        {marcador}
        {animated ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: DURATION.block, ease: EASE_BRAND }}
          >
            {texto}
          </motion.div>
        ) : (
          texto
        )}
      </div>
    </div>
  );
}

/** O layout padrão da timeline: marcador + eyebrow + citação opcional +
 *  texto de um lado, fotos alternando lado do outro (quando existem). */
function StandardMilestoneRow({
  milestone,
  photoIndexOffset,
  markerRef,
}: Readonly<MilestoneRowProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const animated = !prefersReducedMotion;

  // The connecting line itself is one shared element drawn by
  // TrajetoriaTimeline (it needs every marker's real Y position to route
  // through them) — this dot is just the waypoint marker, still local:
  // it pops and switches from track-gray to accent the moment its own
  // milestone scrolls into view, independent of where the traveling dot
  // currently is.
  const textContent: ReactNode = (
    <div className="relative pl-6 desktop:pl-8">
      <motion.span
        ref={markerRef}
        aria-hidden="true"
        className={`absolute left-0 top-1 h-3 w-3 -translate-x-1/2 rounded-pill border-2 border-bg ${
          isInView ? "bg-accent" : "bg-border"
        }`}
        initial={false}
        animate={animated && isInView ? { scale: [1, 1.35, 1] } : { scale: 1 }}
        transition={{ duration: DURATION.block, ease: EASE_BRAND }}
      />
      <p className="font-body text-eyebrow uppercase text-marker-dark">{milestone.eyebrow}</p>
      {milestone.quote && (
        <blockquote className="mt-4 rounded-card border border-border/60 bg-bg-muted/70 px-5 py-4 font-heading text-h3 font-bold italic text-primary backdrop-blur-sm">
          “{milestone.quote}”
        </blockquote>
      )}
      <p className="mt-4 max-w-prose font-body text-body text-text-muted">{milestone.text}</p>
    </div>
  );

  return (
    <div
      ref={ref}
      className="grid gap-8 border-b border-border py-12 last:border-b-0 desktop:grid-cols-[1fr_1fr] desktop:items-center desktop:gap-16 desktop:py-16"
    >
      {animated ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: DURATION.block, ease: EASE_BRAND }}
        >
          {textContent}
        </motion.div>
      ) : (
        <div>{textContent}</div>
      )}

      {milestone.photos.length > 0 && (
        <div
          className={`grid gap-4 desktop:gap-5 ${
            milestone.photos.length === 1 ? "grid-cols-1 justify-items-center" : "grid-cols-2"
          }`}
        >
          {milestone.photos.map((photo, index) => (
            <Photo
              key={photo.src}
              photo={photo}
              fromLeft={(photoIndexOffset + index) % 2 === 0}
              wide={milestone.photos.length === 1}
              delayIndex={index}
              animated={animated}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function MilestoneRow({
  milestone,
  photoIndexOffset,
  markerRef,
}: Readonly<MilestoneRowProps>) {
  if (milestone.illustration === "origem-foto") {
    return <OrigemFotoRow milestone={milestone} markerRef={markerRef} />;
  }

  return (
    <StandardMilestoneRow
      milestone={milestone}
      photoIndexOffset={photoIndexOffset}
      markerRef={markerRef}
    />
  );
}
