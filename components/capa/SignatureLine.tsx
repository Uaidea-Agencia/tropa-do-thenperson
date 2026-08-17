"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type RefObject } from "react";
import {
  animate,
  motion,
  useAnimationControls,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { useAnchorPoints } from "@/hooks/useAnchorPoints";
import { catmullRomCumulativePaths, catmullRomPath } from "@/lib/catmull-rom";

const EASE_LINE = [0.65, 0, 0.35, 1] as const;
const PLATEAU_S = 0.16;
const START_DELAY_MS = 300;
const WORM_DASH = "0.09 1";
const TAIL_DELTAS = [0.02, 0.04, 0.06] as const;
const TAIL_WIDTH_FACTORS = [1, 0.6, 0.3] as const;
const TAIL_OPACITY_FACTORS = [1, 0.6, 0.3] as const;

interface Keyframes {
  values: number[];
  times: number[];
}

/**
 * Builds the progress keyframes for a single animate() call: the head
 * travels at constant speed (time proportional to arc-length) between
 * tags, with a fixed ~160ms hold at every tag — repeating the same
 * value at two different times is what creates a plateau without a
 * second animate() call, keeping trail/worm/tags on one clock.
 */
function buildKeyframes(tagTs: number[], durationS: number, plateauS: number): Keyframes {
  const waypoints = [...tagTs, 1];
  const n = tagTs.length;
  const travelBudget = Math.max(0.01, durationS - n * plateauS);
  const totalDistance = Math.max(0.0001, (waypoints.at(-1) ?? 1) - waypoints[0]);

  const values: number[] = [waypoints[0]];
  const times: number[] = [0];
  let clock = 0;

  for (let k = 0; k < n; k++) {
    clock += plateauS;
    values.push(waypoints[k]);
    times.push(clock);

    const segDistance = Math.max(0, waypoints[k + 1] - waypoints[k]);
    const segTime = (segDistance / totalDistance) * travelBudget;
    clock += segTime;
    values.push(waypoints[k + 1]);
    times.push(clock);
  }

  const normalizedTimes = times.map((t, i) =>
    i === 0 ? 0 : Math.max(times[i - 1] / durationS + 0.0001, Math.min(1, t / durationS)),
  );
  normalizedTimes[normalizedTimes.length - 1] = 1;

  return { values, times: normalizedTimes };
}

interface SignatureLineProps {
  containerRef: RefObject<HTMLElement | null>;
  tagRefs: RefObject<(HTMLElement | null)[]>;
  tagCount: number;
  nameRef: RefObject<HTMLElement | null>;
  onTagLit: (litIndices: Set<number>) => void;
  onArrive: () => void;
  reducedMotion: boolean;
  introReady: boolean;
  durationS: number;
}

export function SignatureLine({
  containerRef,
  tagRefs,
  tagCount,
  nameRef,
  onTagLit,
  onArrive,
  reducedMotion,
  introReady,
  durationS,
}: Readonly<SignatureLineProps>) {
  const filterId = useId();
  const points = useAnchorPoints(containerRef, tagRefs, tagCount, nameRef);
  const pathD = useMemo(() => (points ? catmullRomPath(points) : ""), [points]);

  const progress = useMotionValue(0);
  const pathRef = useRef<SVGPathElement>(null);
  const totalLengthRef = useRef(0);
  const tagTsRef = useRef<number[] | null>(null);
  const startedRef = useRef(false);
  const arrivedRef = useRef(false);
  const runningAnimationRef = useRef<ReturnType<typeof animate> | null>(null);
  const [arrowAngle, setArrowAngle] = useState(0);
  // Latches true the first time geometry has been measured — a plain
  // state flag rather than reading `pathD` directly keeps the
  // animation-start effect below from re-arming on every resize tick
  // (pathD changes on every measurement, geometryReady only flips
  // once), which is what let a resize mid-flight leave the line
  // permanently stuck (see the animation-start effect for the full
  // story).
  const [geometryReady, setGeometryReady] = useState(false);
  const arrowControls = useAnimationControls();

  const fireArrival = useCallback(() => {
    if (arrivedRef.current) return;
    arrivedRef.current = true;
    onArrive();
    void arrowControls.start({
      scale: [0, 1.5, 0.8, 1.15, 1],
      transition: { duration: 0.6, ease: "easeOut" },
    });
  }, [onArrive, arrowControls]);

  const isInView = useInView(containerRef as RefObject<Element>, { once: true, amount: 0.4 });

  // Measure arc-length position of every tag along the final curve via
  // detached <path> elements — exact (no sampling), since each tag is
  // itself a segment boundary in the generated path.
  useEffect(() => {
    if (!points || !pathD) return undefined;

    const timer = setTimeout(() => {
      const full = document.createElementNS("http://www.w3.org/2000/svg", "path");
      full.setAttribute("d", pathD);
      const total = full.getTotalLength();
      totalLengthRef.current = total;

      // Arrowhead orientation: tangent direction of the last few units
      // of the actual rendered curve (not the raw last two points) —
      // Catmull-Rom bends the approach, so sampling the real curve
      // keeps the arrow pointing where the line visually arrives.
      const nearEnd = full.getPointAtLength(Math.max(0, total - 8));
      const end = full.getPointAtLength(total);
      setArrowAngle((Math.atan2(end.y - nearEnd.y, end.x - nearEnd.x) * 180) / Math.PI);

      const cumulative = catmullRomCumulativePaths(points);
      const ts = cumulative.slice(0, tagCount).map((d) => {
        const partial = document.createElementNS("http://www.w3.org/2000/svg", "path");
        partial.setAttribute("d", d);
        return total > 0 ? partial.getTotalLength() / total : 0;
      });
      tagTsRef.current = ts;
      setGeometryReady(true);

      if (reducedMotion && introReady) {
        progress.set(1);
        onTagLit(new Set(ts.map((_, i) => i)));
        fireArrival();
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [points, pathD, tagCount, reducedMotion, introReady, progress, onTagLit, fireArrival]);

  // Arms the draw-in animation exactly once geometry is ready, the
  // section is in view, and the intro is out of the way (never while
  // it's still covering the screen — `isInView` alone doesn't know
  // about the intro's opaque overlay, since geometrically Capa is
  // "in view" from the very first paint). Deliberately does NOT depend
  // on `pathD`/`points` directly: those change on every resize tick
  // (useAnchorPoints re-measures via ResizeObserver), and if this
  // effect re-ran on each one, a resize landing inside the
  // START_DELAY_MS window would cancel the pending timer (cleanup) and
  // immediately re-run into the `startedRef.current` guard — armed,
  // but never actually fired, forever. geometryReady only flips once,
  // so the timer is scheduled once and left alone; buildKeyframes
  // still reads the latest tagTsRef.current at fire time, so it uses
  // current geometry either way.
  useEffect(() => {
    if (
      reducedMotion ||
      startedRef.current ||
      !isInView ||
      !introReady ||
      !geometryReady ||
      !tagTsRef.current
    ) {
      return undefined;
    }
    startedRef.current = true;

    const timer = setTimeout(() => {
      const ts = tagTsRef.current;
      if (!ts) return;
      const { values, times } = buildKeyframes(ts, durationS, PLATEAU_S);
      const controls = animate(progress, values, {
        times,
        duration: durationS,
        ease: EASE_LINE,
      });
      runningAnimationRef.current = controls;
      controls.then(fireArrival);
    }, START_DELAY_MS);

    return () => {
      clearTimeout(timer);
      runningAnimationRef.current?.stop();
    };
  }, [reducedMotion, isInView, introReady, geometryReady, durationS, progress, fireArrival]);

  useMotionValueEvent(progress, "change", (p) => {
    const ts = tagTsRef.current;
    if (!ts) return;
    const lit = new Set<number>();
    ts.forEach((t, i) => {
      if (p >= t) lit.add(i);
    });
    onTagLit(lit);
  });

  const trailOffset = useTransform(progress, (p) => 1 - p);
  const wormOffset = useTransform(progress, (p) => -p);
  const fadeOutOpacity = useTransform(progress, [0.94, 1], [1, 0]);

  // TAIL_DELTAS/TAIL_OPACITY_FACTORS are fixed-length module constants
  // (always 3 entries) — calling hooks in this fixed loop keeps a
  // stable call order/count across renders, but is unrolled explicitly
  // below anyway so static analysis (eslint-plugin-react-hooks) doesn't
  // need to reason about it.
  const tailOffset0 = useTransform(progress, (p) => -p + TAIL_DELTAS[0]);
  const tailOffset1 = useTransform(progress, (p) => -p + TAIL_DELTAS[1]);
  const tailOffset2 = useTransform(progress, (p) => -p + TAIL_DELTAS[2]);
  const tailOpacity0 = useTransform(fadeOutOpacity, (v) => v * TAIL_OPACITY_FACTORS[0]);
  const tailOpacity1 = useTransform(fadeOutOpacity, (v) => v * TAIL_OPACITY_FACTORS[1]);
  const tailOpacity2 = useTransform(fadeOutOpacity, (v) => v * TAIL_OPACITY_FACTORS[2]);
  const tailLayers = [
    { offset: tailOffset0, opacity: tailOpacity0 },
    { offset: tailOffset1, opacity: tailOpacity1 },
    { offset: tailOffset2, opacity: tailOpacity2 },
  ];

  const headX = useTransform(progress, (p) => {
    const pathEl = pathRef.current;
    if (!pathEl || totalLengthRef.current === 0) return 0;
    return pathEl.getPointAtLength(p * totalLengthRef.current).x;
  });
  const headY = useTransform(progress, (p) => {
    const pathEl = pathRef.current;
    if (!pathEl || totalLengthRef.current === 0) return 0;
    return pathEl.getPointAtLength(p * totalLengthRef.current).y;
  });

  if (!points || !pathD) return null;

  const endPoint = points[points.length - 1];

  if (reducedMotion) {
    return (
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <motion.path
          d={pathD}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={2}
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.2 }}
        />
        <motion.g
          style={{ x: endPoint.x, y: endPoint.y, rotate: arrowAngle }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <path
            d="M-7,-6 L9,0 L-7,6 Z"
            fill="var(--color-accent)"
            stroke="var(--color-text)"
            strokeWidth={1}
            strokeLinejoin="round"
          />
        </motion.g>
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <motion.path
        d={pathD}
        fill="none"
        stroke="var(--color-marker)"
        strokeWidth={9}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={WORM_DASH}
        opacity={0.35}
        filter={`url(#${filterId})`}
        style={{ strokeDashoffset: wormOffset, opacity: fadeOutOpacity }}
      />

      <motion.path
        d={pathD}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={2}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1 1"
        opacity={0.3}
        style={{ strokeDashoffset: trailOffset }}
      />

      {tailLayers.map((tail, i) => (
        <motion.path
          key={i}
          d={pathD}
          fill="none"
          stroke="var(--color-accent)"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={WORM_DASH}
          strokeWidth={3 * TAIL_WIDTH_FACTORS[i]}
          style={{ strokeDashoffset: tail.offset, opacity: tail.opacity }}
        />
      ))}

      <motion.path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={3}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={WORM_DASH}
        style={{ strokeDashoffset: wormOffset, opacity: fadeOutOpacity }}
      />

      <motion.circle
        r={4}
        fill="var(--color-accent)"
        style={{ cx: headX, cy: headY, opacity: fadeOutOpacity }}
      />

      {/* Arrowhead marking where the line points — the traveling head
          above dissolves into the name per the original brief, but
          this stays put and pointed at it, with a bouncy "landing"
          pulse (arrowControls, started in fireArrival) instead of
          fading away. */}
      <motion.g
        style={{ x: endPoint.x, y: endPoint.y, rotate: arrowAngle }}
        initial={{ scale: 0 }}
        animate={arrowControls}
      >
        <path
          d="M-7,-6 L9,0 L-7,6 Z"
          fill="var(--color-accent)"
          stroke="var(--color-text)"
          strokeWidth={1}
          strokeLinejoin="round"
        />
      </motion.g>
    </svg>
  );
}
