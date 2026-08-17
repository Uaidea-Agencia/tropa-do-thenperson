"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useCoarsePointer } from "@/hooks/useCoarsePointer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ClickBubble {
  id: number;
  x: number;
  y: number;
}

const BUBBLE_FALL_DISTANCE = 46;
const BUBBLE_DURATION_S = 1.1;
const BUBBLE_MAX_ALIVE = 4;
const BUBBLE_LOOP_MS = 550;
const CLICKABLE_SELECTOR =
  'a[href], button:not([aria-disabled="true"]):not(:disabled), [role="button"], input:not([type="hidden"]), select, textarea, label, summary, [tabindex]:not([tabindex="-1"])';

interface CustomCursorProps {
  children: ReactNode;
  size?: number;
  pressScale?: number;
  offsetX?: number;
  offsetY?: number;
  showLabel?: boolean;
  name?: string;
  color?: string;
  textColor?: string;
  labelTiltStrength?: number;
  labelOffsetUseDefault?: boolean;
  labelOffsetX?: number;
  labelOffsetY?: number;
}

export function CustomCursor({
  children,
  size = 56,
  pressScale = 0.92,
  offsetX = 0,
  offsetY = 0,
  showLabel = true,
  name = "Eleitor",
  color = "#3a0c02",
  textColor = "#ffffff",
  labelTiltStrength = 25,
  labelOffsetUseDefault = true,
  labelOffsetX = 25,
  labelOffsetY = 12,
}: Readonly<CustomCursorProps>) {
  const isCoarsePointer = useCoarsePointer();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [bubbles, setBubbles] = useState<ClickBubble[]>([]);
  const bubbleIdRef = useRef(0);

  const arrowX = useMotionValue(0);
  const arrowY = useMotionValue(0);
  const springArrowX = useSpring(arrowX, { stiffness: 800, damping: 35, mass: 0.3 });
  const springArrowY = useSpring(arrowY, { stiffness: 800, damping: 35, mass: 0.3 });

  const labelX = useMotionValue(0);
  const labelY = useMotionValue(0);
  const springLabelX = useSpring(labelX, { stiffness: 220, damping: 24, mass: 0.6 });
  const springLabelY = useSpring(labelY, { stiffness: 220, damping: 24, mass: 0.6 });

  const tilt = useMotionValue(0);
  const springTilt = useSpring(tilt, { stiffness: 200, damping: 20 });
  const pressSpring = useSpring(1, { stiffness: 500, damping: 26 });

  const lastXRef = useRef(0);
  const lastTRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  function removeBubble(id: number) {
    setBubbles((current) => current.filter((bubble) => bubble.id !== id));
  }

  const wasOverClickableRef = useRef(false);
  const loopIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isCoarsePointer) return undefined;

    const labelOffX = labelOffsetUseDefault ? size * 0.45 : labelOffsetX;
    const labelOffY = labelOffsetUseDefault ? size * 0.2 : labelOffsetY;

    function spawnBubble() {
      setBubbles((current) => {
        if (current.length >= BUBBLE_MAX_ALIVE) return current;
        const id = bubbleIdRef.current++;
        return [...current, { id, x: posRef.current.x, y: posRef.current.y - 12 }];
      });
    }

    function stopLoop() {
      if (loopIntervalRef.current !== null) {
        clearInterval(loopIntervalRef.current);
        loopIntervalRef.current = null;
      }
    }

    function handleMove(event: PointerEvent) {
      const x = event.clientX;
      const y = event.clientY;
      posRef.current = { x, y };

      arrowX.set(x + offsetX);
      arrowY.set(y + offsetY);
      labelX.set(x + offsetX + labelOffX);
      labelY.set(y + offsetY + labelOffY);

      const now = performance.now();
      const dt = Math.max(1, now - lastTRef.current);
      const vx = (x - lastXRef.current) / dt;
      lastXRef.current = x;
      lastTRef.current = now;
      tilt.set(Math.max(-labelTiltStrength, Math.min(labelTiltStrength, vx * 40)));
      setVisible(true);

      // "click" loops for as long as the cursor sits on something
      // clickable, and stops the instant it leaves — a running
      // interval started/stopped on the state *change*, not a bubble
      // per pointermove (would spawn far too many while the mouse is
      // still moving across the same link).
      const target = event.target;
      const isOverClickable = target instanceof Element && target.closest(CLICKABLE_SELECTOR) !== null;
      if (isOverClickable && !wasOverClickableRef.current && !prefersReducedMotion) {
        spawnBubble();
        stopLoop();
        loopIntervalRef.current = setInterval(spawnBubble, BUBBLE_LOOP_MS);
      } else if (!isOverClickable && wasOverClickableRef.current) {
        stopLoop();
      }
      wasOverClickableRef.current = isOverClickable;
    }

    function handleLeave() {
      setVisible(false);
      stopLoop();
      wasOverClickableRef.current = false;
    }
    function handleEnter() {
      setVisible(true);
    }
    function handleDown() {
      pressSpring.set(pressScale);
    }
    function handleUp() {
      pressSpring.set(1);
    }

    window.addEventListener("pointermove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.documentElement.addEventListener("mouseenter", handleEnter);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      stopLoop();
    };
  }, [
    isCoarsePointer,
    prefersReducedMotion,
    offsetX,
    offsetY,
    size,
    labelOffsetUseDefault,
    labelOffsetX,
    labelOffsetY,
    labelTiltStrength,
    arrowX,
    arrowY,
    labelX,
    labelY,
    tilt,
    pressSpring,
    pressScale,
  ]);

  const arrowSize = size * 0.5;
  const fontSize = Math.max(11, size * 0.22);

  return (
    <div className={isCoarsePointer ? "" : "custom-cursor-active"}>
      {children}

      {mounted &&
        !isCoarsePointer &&
        visible &&
        createPortal(
          <>
            <motion.svg
              aria-hidden="true"
              className="pointer-events-none fixed left-0 top-0 z-9999"
              style={{
                x: springArrowX,
                y: springArrowY,
                scale: pressSpring,
                width: arrowSize,
                height: arrowSize,
              }}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 2L20 10L12 12.5L9 20.5L4 2Z"
                fill={color}
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </motion.svg>

            {showLabel && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-9999 whitespace-nowrap rounded-pill px-3 py-1 font-body font-medium uppercase tracking-wide"
                style={{
                  x: springLabelX,
                  y: springLabelY,
                  rotate: springTilt,
                  scale: pressSpring,
                  backgroundColor: color,
                  color: textColor,
                  fontSize,
                }}
              >
                {name}
              </motion.div>
            )}

            {bubbles.map((bubble) => (
              <motion.span
                key={bubble.id}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-9999 select-none font-body text-[11px] font-semibold lowercase tracking-wide text-accent"
                style={{ x: bubble.x }}
                initial={{ opacity: 0, y: bubble.y - 6, rotate: 0, scale: 0.6 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [
                    bubble.y - 6,
                    bubble.y + BUBBLE_FALL_DISTANCE * 0.35,
                    bubble.y + BUBBLE_FALL_DISTANCE * 0.75,
                    bubble.y + BUBBLE_FALL_DISTANCE,
                  ],
                  rotate: [0, 22, -16, 4],
                  scale: [0.6, 1.1, 1, 0.85],
                }}
                transition={{ duration: BUBBLE_DURATION_S, ease: "easeIn", times: [0, 0.25, 0.7, 1] }}
                onAnimationComplete={() => removeBubble(bubble.id)}
              >
                click
              </motion.span>
            ))}
          </>,
          document.body,
        )}
    </div>
  );
}
