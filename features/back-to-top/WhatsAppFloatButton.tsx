"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "motion/react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ctaLinks } from "@/content/cta-links";
import { EASE_BRAND } from "@/lib/motion";

interface IconDrop {
  id: number;
  offsetX: number;
  startY: number;
  duration: number;
}

// Espaçado de propósito — um ícone por vez, num intervalo aleatório
// bem largo (6–11s), pra não parecer notificação/spam (pedido do
// cliente: "de pouco em pouco"). Cai desde o início da área visível
// (logo abaixo do header), não só uma queda curta dentro do próprio
// botão — pedido do cliente: "pegue lá do início da view".
const DROP_DELAY_MIN_MS = 6000;
const DROP_DELAY_MAX_MS = 11000;
// Onde o ícone nasce: logo abaixo do header fixo (`h-16` = 64px), com
// 12px de respiro.
const START_FROM_VIEWPORT_TOP_PX = 76;
// Onde a queda "pousa": topo do próprio botão em relação à base da
// viewport — `bottom-19` (76px) + `h-11` (44px de altura) = 120px.
const BUTTON_TOP_FROM_VIEWPORT_BOTTOM_PX = 120;

/**
 * Atalho fixo pro grupo do WhatsApp, empilhado acima do botão "voltar
 * ao topo" (mesmo `right`, `bottom` maior o bastante pra não colidir:
 * 24px do botão de baixo + 44px de altura + 8px de respiro = 76px).
 * Fundo `bg-whatsapp`/verde oficial + `WhatsAppIcon` em `variant="glyph"`
 * (só o glifo branco, já que o próprio botão é o círculo verde) — ver
 * `docs/marca.md`, seção "Cor do WhatsApp — uso restrito".
 *
 * ⚠ Pedido do cliente: "quero que o botão do WhatsApp flutuante já
 * apareça no início da página" — ao contrário do botão "voltar ao
 * topo" (`BackToTopButton`, que só faz sentido depois de rolar), este
 * não depende de `useScrolledPastHero()` nenhum: fica visível e
 * interativo desde o primeiro render (só some enquanto a Intro cobre a
 * tela, igual a todo o resto da página — `components/sections/Intro.tsx`).
 *
 * Solta uma "cópia" pequena do próprio ícone caindo desde o topo da
 * área visível até pousar no botão de vez em quando, com um pulso de
 * chegada no ícone principal — ver `docs/ui-web.md`, seção "Ícones
 * caindo do botão de WhatsApp".
 */
export function WhatsAppFloatButton() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [drops, setDrops] = useState<IconDrop[]>([]);
  const dropIdRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iconControls = useAnimationControls();

  useEffect(() => {
    if (prefersReducedMotion) return;

    function scheduleNext() {
      const delay = DROP_DELAY_MIN_MS + Math.random() * (DROP_DELAY_MAX_MS - DROP_DELAY_MIN_MS);
      timeoutRef.current = setTimeout(() => {
        const viewportHeight = window.innerHeight;
        const anchorTopY = viewportHeight - BUTTON_TOP_FROM_VIEWPORT_BOTTOM_PX;
        // Negativo — a distância (em px) que o ícone nasce acima do
        // próprio botão, calculada a cada disparo (a viewport pode ter
        // mudado de altura entre um e outro).
        const startY = START_FROM_VIEWPORT_TOP_PX - anchorTopY;
        const duration = Math.min(3, Math.max(1.6, Math.abs(startY) / 320));
        setDrops((current) => [
          ...current,
          { id: dropIdRef.current++, offsetX: (Math.random() - 0.5) * 14, startY, duration },
        ]);
        scheduleNext();
      }, delay);
    }

    scheduleNext();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [prefersReducedMotion]);

  function handleDropArrive(id: number) {
    setDrops((current) => current.filter((drop) => drop.id !== id));
    // Pulso de "chegou" no ícone do botão — mesmo gesto já usado no CTA
    // do header quando a seção alvo chega (`HeaderCta`, em
    // `components/layout/Header.tsx`), reaproveitado em vez de inventar
    // um novo.
    void iconControls.start({
      scale: [1, 1.25, 1],
      transition: { duration: 0.4, ease: EASE_BRAND },
    });
  }

  if (!ctaLinks.whatsapp.href) return null;

  return (
    <a
      href={ctaLinks.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Entrar no grupo do WhatsApp da campanha"
      className="fixed bottom-19 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-pill bg-whatsapp shadow-floating transition-colors duration-150 ease-brand hover:bg-whatsapp-dark tablet:right-8"
    >
      <motion.span animate={iconControls} className="flex">
        <WhatsAppIcon size={22} variant="glyph" />
      </motion.span>

      {drops.map((drop) => (
        <motion.span
          key={drop.id}
          aria-hidden="true"
          className="pointer-events-none absolute flex h-5 w-5 items-center justify-center drop-shadow-[0_4px_6px_rgba(16,25,43,0.35)]"
          style={{ left: `calc(50% + ${drop.offsetX}px)`, top: 0, x: "-50%" }}
          initial={{ opacity: 0, y: drop.startY, scale: 0.6 }}
          animate={{
            y: [drop.startY, 0],
            opacity: [0, 1, 1, 0],
            rotate: [0, -12, 10, -6, 3, 0],
            scale: [0.6, 1, 1, 0.75],
          }}
          transition={{
            y: { duration: drop.duration, ease: "easeIn" },
            opacity: { duration: drop.duration, times: [0, 0.08, 0.85, 1] },
            rotate: { duration: drop.duration, ease: "easeInOut" },
            scale: { duration: drop.duration, times: [0, 0.5, 0.85, 1] },
          }}
          onAnimationComplete={() => handleDropArrive(drop.id)}
        >
          <WhatsAppIcon size={20} />
        </motion.span>
      ))}
    </a>
  );
}
