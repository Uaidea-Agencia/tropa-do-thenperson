"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { ctaLinks } from "@/content/cta-links";
import { site } from "@/content/site";
import { useIntroReady } from "@/features/intro/IntroGate";
import { useExitIntent } from "@/hooks/useExitIntent";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { playNotificationChime } from "@/lib/play-chime";
import { DURATION, EASE_BRAND } from "@/lib/motion";

// "De 1 em 1 min" (pedido do cliente, substitui o ritmo anterior de
// "no máximo 2 por sessão") — o mesmo aviso tem dois gatilhos
// independentes que competem pelo mesmo cooldown de 60s, então nenhum
// dos dois consegue disparar mais rápido que isso, de qualquer
// combinação: (1) exit-intent (`useExitIntent`, ver esse hook), (2) um
// timer periódico que tenta a cada 60s, dando o "de 1 em 1 min" mesmo
// que a pessoa nunca mova o mouse pro topo. Auto-esconde em 9s se
// ninguém interagir.
const SHOW_INTERVAL_MS = 60_000;
const AUTO_DISMISS_MS = 9_000;

// Copy ditada pelo cliente pra esse aviso especificamente (não é a
// mesma frase aprovada de docs/tom-de-voz.md/Seção 6 — essa é nova,
// registrada aqui como a fonte dela).
const MESSAGE_TEXT = "Quero apresentar minhas ideias para você. Entra agora mesmo no grupo do WhatsApp!";

export function ExitIntentWhatsApp() {
  const introReady = useIntroReady();
  const reducedMotion = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const lastShownAtRef = useRef(0);
  const autoDismissRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (autoDismissRef.current) clearTimeout(autoDismissRef.current);
    },
    [],
  );

  const handleTrigger = useCallback(() => {
    const now = Date.now();
    if (now - lastShownAtRef.current < SHOW_INTERVAL_MS) return;

    lastShownAtRef.current = now;
    setOpen(true);
    playNotificationChime();
    if (autoDismissRef.current) clearTimeout(autoDismissRef.current);
    autoDismissRef.current = setTimeout(() => setOpen(false), AUTO_DISMISS_MS);
  }, []);

  function handleClose() {
    setOpen(false);
    if (autoDismissRef.current) clearTimeout(autoDismissRef.current);
    // Só fecha esta aparição — não mexe em `lastShownAtRef`, então o
    // próximo tick do timer periódico ou um novo exit-intent continua
    // valendo normalmente daqui a 60s. "De 1 em 1 min" é pra continuar
    // de verdade, não parar no primeiro X.
  }

  const whatsappHref = ctaLinks.whatsapp.href;
  const enabled = introReady && Boolean(whatsappHref);

  useExitIntent(handleTrigger, enabled);

  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(handleTrigger, SHOW_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [enabled, handleTrigger]);

  if (!whatsappHref) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-19 z-35 flex justify-center px-4">
      <AnimatePresence>
        {open && (
          <motion.div
            role="status"
            aria-live="polite"
            className="pointer-events-auto relative w-full max-w-sm rounded-card border border-text-inverse/15 bg-primary-dark p-4 shadow-floating"
            initial={reducedMotion ? false : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: reducedMotion ? 0 : DURATION.block, ease: EASE_BRAND }}
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Fechar aviso"
              className="absolute right-3 top-3 rounded-xs p-1 text-text-inverse/60 transition-colors duration-150 ease-brand hover:text-text-inverse focus-visible:outline-2 focus-visible:outline-focus"
            >
              <X size={16} aria-hidden="true" />
            </button>

            {/* Corpo de mensagem no estilo de uma notificação de
                WhatsApp (avatar + nome + selo do app + texto + "agora")
                — pedido do cliente. Selo com o verde oficial do
                WhatsApp (`WhatsAppIcon`, `variant="badge"` padrão — ver
                `docs/marca.md`, "Cor do WhatsApp — uso restrito"). */}
            <div className="flex items-start gap-3 pr-5">
              <div className="relative shrink-0">
                <Image
                  src="/images/institucionais/institucional-01.jpg"
                  alt=""
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-pill object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 -right-1 rounded-pill ring-2 ring-primary-dark"
                >
                  <WhatsAppIcon size={20} />
                </span>
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate font-heading text-body font-bold text-text-inverse">
                    {site.candidateName}
                  </p>
                  <p className="shrink-0 font-body text-caption text-text-inverse/50">agora</p>
                </div>
                <p className="mt-0.5 font-body text-body text-text-inverse/85">{MESSAGE_TEXT}</p>
              </div>
            </div>

            <div className="mt-3 pl-14">
              <Button
                href={whatsappHref}
                variant="primary"
                size="sm"
                icon={<WhatsAppIcon size={16} />}
                onClick={handleClose}
              >
                {ctaLinks.whatsapp.label}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
