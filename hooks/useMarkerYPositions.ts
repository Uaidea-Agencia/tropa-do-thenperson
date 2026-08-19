"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";

/**
 * Measures the vertical center (in px, relative to `containerRef`) of a
 * sequence of marker elements — same measure-on-mount/fonts-ready/resize
 * shape as `useAnchorPoints` (used by the Capa signature line), just for
 * a straight vertical list instead of a 2D scattered layout, so no curve
 * fitting is needed downstream, only linear interpolation between
 * consecutive Y values.
 *
 * Returns `null` until every marker has been measured at least once —
 * callers should skip rendering anything position-dependent until then
 * (mirrors `useAnchorPoints` returning `null` pre-measurement).
 */
export function useMarkerYPositions(
  containerRef: RefObject<HTMLElement | null>,
  markerRefs: RefObject<(HTMLElement | null)[]>,
  count: number,
): number[] | null {
  const [ys, setYs] = useState<number[] | null>(null);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      setYs(null);
      return;
    }

    const positions: number[] = [];
    for (let i = 0; i < count; i++) {
      const el = markerRefs.current[i];
      if (!el) {
        setYs(null);
        return;
      }
      const rect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      positions.push(rect.top - containerRect.top + rect.height / 2);
    }
    setYs(positions);
  }, [containerRef, markerRefs, count]);

  useEffect(() => {
    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      if (!cancelled) measure();
    });

    document.fonts?.ready
      ?.then(() => {
        if (!cancelled) measure();
      })
      .catch(() => undefined);

    const container = containerRef.current;
    let observer: ResizeObserver | undefined;
    if (container && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => {
        if (!cancelled) measure();
      });
      observer.observe(container);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [measure, containerRef]);

  return ys;
}
