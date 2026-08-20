"use client";

import { useEffect, useState } from "react";

export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const lastId = ids.at(-1) ?? null;

    // O callback do IntersectionObserver só entrega as entradas que
    // mudaram de estado desde a última chamada — não o estado atual de
    // cada seção sendo observada. Calcular "quem tá visível agora" só a
    // partir do lote mais recente (como a versão anterior
    // fazia, `entries.filter(...)`) dá resultado errado sempre que a
    // seção realmente visível não foi uma das que mudou nesse lote
    // específico — o que acontece com frequência em scroll rápido. Esse
    // era o bug relatado ("às vezes marca, às vezes não"). Corrigido
    // guardando o último estado conhecido de cada seção e recalculando
    // a partir desse conjunto completo, não do lote isolado.
    const lastKnown = new Map<Element, IntersectionObserverEntry>();

    // A faixa de detecção do observer fica ancorada no topo da viewport
    // (rootMargin), não no fim do documento — se o rodapé depois da
    // última seção for curto o bastante, dá pra rolar até o fim da
    // página com ela ainda visível mas fora da faixa. Reforça à parte.
    function isAtBottom() {
      return window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    }

    function recompute() {
      if (isAtBottom()) {
        setActive(lastId);
        return;
      }

      const visible = [...lastKnown.values()].filter((entry) => entry.isIntersecting);
      if (visible.length === 0) {
        setActive(null);
        return;
      }

      const current = visible.reduce(
        (a, b) => (a.boundingClientRect.top >= b.boundingClientRect.top ? a : b),
        visible[0],
      );
      setActive(current.target.id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) lastKnown.set(entry.target, entry);
        recompute();
      },
      { rootMargin: "-64px 0px -70% 0px", threshold: 0 },
    );

    for (const element of elements) observer.observe(element);

    window.addEventListener("scroll", recompute, { passive: true });
    recompute(); // cobre já carregar a página rolada até o fim (voltar com o navegador, por ex.)

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", recompute);
    };
  }, [ids]);

  return active;
}
