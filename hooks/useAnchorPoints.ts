"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";
import type { Point } from "@/lib/catmull-rom";

/** Closest point ON the (filled) rect's boundary to an external point. */
function closestPointOnRect(rect: DOMRect, containerRect: DOMRect, from: Point): Point {
  const left = rect.left - containerRect.left;
  const right = rect.right - containerRect.left;
  const top = rect.top - containerRect.top;
  const bottom = rect.bottom - containerRect.top;
  return {
    x: Math.min(Math.max(from.x, left), right),
    y: Math.min(Math.max(from.y, top), bottom),
  };
}

function centerOf(rect: DOMRect, containerRect: DOMRect): Point {
  return {
    x: rect.left - containerRect.left + rect.width / 2,
    y: rect.top - containerRect.top + rect.height / 2,
  };
}

/**
 * Measures real DOM positions of a sequence of "tag" elements plus a
 * final "destination" element, relative to a container, and returns
 * anchor points suitable for a curve that visits them in order.
 *
 * Anchor point rule: the first tag uses its center (no previous point
 * to aim from); every point after that uses the point on its own
 * bounding box closest to the previous anchor, so the curve tangents
 * each element instead of piercing through its middle.
 *
 * tagRefs/containerRef/nameRef must be stable (useRef) across renders
 * — an inline array literal would re-trigger the measuring effect on
 * every render.
 */
export function useAnchorPoints(
  containerRef: RefObject<HTMLElement | null>,
  tagRefs: RefObject<(HTMLElement | null)[]>,
  tagCount: number,
  nameRef: RefObject<HTMLElement | null>,
): Point[] | null {
  const [points, setPoints] = useState<Point[] | null>(null);

  const measure = useCallback(() => {
    const container = containerRef.current;
    const nameEl = nameRef.current;
    if (!container || !nameEl) {
      setPoints(null);
      return;
    }

    const tagRects: DOMRect[] = [];
    for (let i = 0; i < tagCount; i++) {
      const el = tagRefs.current[i];
      if (!el) {
        setPoints(null);
        return;
      }
      tagRects.push(el.getBoundingClientRect());
    }

    const containerRect = container.getBoundingClientRect();
    const result: Point[] = [];
    let prev = centerOf(tagRects[0], containerRect);
    result.push(prev);
    for (let i = 1; i < tagRects.length; i++) {
      prev = closestPointOnRect(tagRects[i], containerRect, prev);
      result.push(prev);
    }
    result.push(closestPointOnRect(nameEl.getBoundingClientRect(), containerRect, prev));

    setPoints(result);
  }, [containerRef, tagRefs, tagCount, nameRef]);

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

  return points;
}
