"use client";

import { useEffect, useState } from "react";

/**
 * True once the user has scrolled past the hero (`#capa`) — used to
 * reveal the "voltar ao topo" floating button only once there's
 * somewhere to come back from
 * (`features/back-to-top/BackToTopButton.tsx`).
 *
 * ⚠ Até aqui também era usado pelo botão flutuante de WhatsApp
 * (`WhatsAppFloatButton`), pra aparecerem em lockstep — pedido do
 * cliente mudou isso: "quero que o botão do WhatsApp flutuante já
 * apareça no início da página", então esse botão passou a ficar visível
 * desde o mount, sem depender deste hook. Só sobrou o "voltar ao topo"
 * como consumidor.
 */
export function useScrolledPastHero(): boolean {
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const capa = document.getElementById("capa");
    if (!capa) return;

    const observer = new IntersectionObserver(([entry]) => setScrolledPast(!entry.isIntersecting), {
      rootMargin: "-120px 0px 0px 0px",
    });
    observer.observe(capa);
    return () => observer.disconnect();
  }, []);

  return scrolledPast;
}
