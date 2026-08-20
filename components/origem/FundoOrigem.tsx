"use client";

import Image from "next/image";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Fundo full-bleed do marco "Origem do desejo político": a foto real do
 * protesto (duotone Azul Vale, placa "futuro do comércio" em Laranja
 * Vale) + o loop em traço de lápis por cima como textura de filme
 * (grão, tremido, flicker), em `mix-blend-multiply` com opacidade baixa.
 * Ver PROMPT_CLAUDE_CODE_INTEGRAR_ORIGEM.md.
 *
 * A foto sozinha já resolve a seção — a camada de vídeo é só reforço.
 * Cores vêm de `--color-primary-dark` (o mesmo Azul Profundo do
 * hero/rodapé), não um hex novo: o prompt original sugeria `#091F48`,
 * a marca já tem `#06214F` pro mesmo papel (ver docs/marca.md).
 */
export function FundoOrigem() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden bg-primary-dark">
      <Image
        src="/images/origem/foto-duotone.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-right"
      />

      {!prefersReducedMotion && (
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          tabIndex={-1}
          poster="/images/origem/traco-fallback.png"
          className="absolute inset-0 h-full w-full object-cover object-right opacity-20 mix-blend-multiply"
        >
          <source src="/images/origem/traco-loop.webm" type="video/webm" />
          <source src="/images/origem/traco-loop.mp4" type="video/mp4" />
        </video>
      )}

      {/* Scrim de legibilidade: vertical (de baixo) no mobile — a placa
          fica à direita, o texto embaixo; horizontal (da esquerda) a
          partir de `desktop`, onde o texto tem uma coluna própria à
          esquerda da foto. ⚠ Ajustado por inspeção visual: a primeira
          versão (via 80%) escurecia a placa antes mesmo do texto
          começar — no mobile ela sobe quase até o meio da cena. Corte
          mais raso (forte só nos ~40% de baixo, onde o texto realmente
          fica) deixa a placa clara acima disso. */}
      <div className="absolute inset-0 bg-linear-to-t from-primary-dark from-0% via-primary-dark/55 via-38% to-transparent to-62% desktop:bg-linear-to-r desktop:from-primary-dark desktop:via-primary-dark/85 desktop:to-transparent" />
    </div>
  );
}
