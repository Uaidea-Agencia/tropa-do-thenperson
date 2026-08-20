"use client";

import { ArrowUp } from "lucide-react";
import { useScrolledPastHero } from "@/hooks/useScrolledPastHero";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function BackToTopButton() {
  const visible = useScrolledPastHero();
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Voltar ao topo"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-pill bg-accent text-text-on-accent shadow-floating transition-all duration-150 ease-brand hover:bg-accent-dark tablet:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  );
}
