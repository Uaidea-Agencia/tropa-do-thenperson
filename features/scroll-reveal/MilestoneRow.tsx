"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import type { Milestone, MilestonePhoto } from "@/content/milestones";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DURATION, EASE_BRAND } from "@/lib/motion";

interface MilestoneRowProps {
  milestone: Milestone;
  photoIndexOffset: number;
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

  const className = `relative aspect-3/4 w-full overflow-hidden rounded-card ${wide ? "desktop:w-2/3" : ""}`;

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

export function MilestoneRow({ milestone, photoIndexOffset }: Readonly<MilestoneRowProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const animated = !prefersReducedMotion;

  const textContent: ReactNode = (
    <>
      <p className="font-body text-eyebrow uppercase text-accent-dark">{milestone.eyebrow}</p>
      {milestone.quote && (
        <blockquote className="mt-3 font-heading text-h3 font-bold italic text-secondary">
          “{milestone.quote}”
        </blockquote>
      )}
      <p className="mt-4 max-w-prose font-body text-body text-text-muted">{milestone.text}</p>
    </>
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
