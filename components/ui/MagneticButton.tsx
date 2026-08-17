"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { BUTTON_BASE_CLASSES, BUTTON_SIZE_CLASSES } from "./Button";

const MAGNET_RANGE = 90;
const PULL_STRENGTH = 0.35;
const MAX_PULL = 22;

interface MagneticButtonProps {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function MagneticButton({
  href,
  icon,
  children,
  className = "",
}: Readonly<MagneticButtonProps>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [wipeOrigin, setWipeOrigin] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  useEffect(() => {
    if (reducedMotion) return;

    function handleMove(event: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.hypot(dx, dy);
      if (distance < MAGNET_RANGE) {
        const pullX = Math.max(-MAX_PULL, Math.min(MAX_PULL, dx * PULL_STRENGTH));
        const pullY = Math.max(-MAX_PULL, Math.min(MAX_PULL, dy * PULL_STRENGTH));
        x.set(pullX);
        y.set(pullY);
      } else {
        x.set(0);
        y.set(0);
      }
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reducedMotion, x, y]);

  function updateWipeOrigin(event: React.MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setWipeOrigin({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }

  const isExternal = /^https?:\/\//.test(href);

  return (
    <motion.div
      style={reducedMotion ? undefined : { x: springX, y: springY }}
      className="inline-block"
    >
      <Link
        ref={ref}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        onMouseEnter={(event) => {
          updateWipeOrigin(event);
          setHovered(true);
        }}
        onMouseMove={updateWipeOrigin}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setWipeOrigin({ x: 50, y: 50 })}
        className={`relative isolate inline-flex items-center justify-center overflow-hidden bg-cta text-text-on-accent focus-visible:outline-2 focus-visible:outline-focus ${BUTTON_BASE_CLASSES} ${BUTTON_SIZE_CLASSES.md} ${className}`}
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          {icon}
          {children}
        </span>

        <motion.span
          aria-hidden="true"
          className="absolute inset-0 z-0 flex items-center justify-center gap-2 bg-cta-hover text-text-inverse"
          initial={false}
          animate={
            reducedMotion
              ? { opacity: hovered ? 1 : 0 }
              : {
                  clipPath: hovered
                    ? `circle(150% at ${wipeOrigin.x}% ${wipeOrigin.y}%)`
                    : `circle(0% at ${wipeOrigin.x}% ${wipeOrigin.y}%)`,
                }
          }
          transition={
            reducedMotion ? { duration: 0.15 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
          }
        >
          {icon}
          {children}
        </motion.span>
      </Link>
    </motion.div>
  );
}
