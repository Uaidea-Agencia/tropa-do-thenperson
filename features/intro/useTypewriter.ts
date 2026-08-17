"use client";

import { useEffect, useRef, useState } from "react";

interface UseTypewriterOptions {
  segments: readonly string[];
  msPerChar?: number;
  active: boolean;
  onDone?: () => void;
}

function sliceSegments(segments: readonly string[], charCount: number): string[] {
  let remaining = charCount;
  return segments.map((segment) => {
    const take = Math.max(0, Math.min(segment.length, remaining));
    remaining -= take;
    return segment.slice(0, take);
  });
}

export function useTypewriter({ segments, msPerChar = 40, active, onDone }: UseTypewriterOptions) {
  const totalLength = segments.reduce((sum, segment) => sum + segment.length, 0);
  const [charCount, setCharCount] = useState(0);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setCharCount((count) => Math.min(count + 1, totalLength));
    }, msPerChar);
    return () => clearInterval(interval);
  }, [active, totalLength, msPerChar]);

  useEffect(() => {
    if (active && totalLength > 0 && charCount >= totalLength) {
      onDoneRef.current?.();
    }
  }, [active, charCount, totalLength]);

  return { visibleSegments: sliceSegments(segments, charCount), done: charCount >= totalLength };
}
