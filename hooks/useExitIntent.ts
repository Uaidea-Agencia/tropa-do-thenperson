"use client";

import { useEffect, useRef } from "react";

// Faixa de tolerância no topo da viewport, não só `clientY === 0` —
// ver comentário grande abaixo ("ainda não funciona").
const TOP_EDGE_TOLERANCE_PX = 40;

/**
 * Exit-intent de desktop: dispara `onTrigger` quando o cursor sai da
 * janela por cima (rumo à barra de endereço/abas) — sinal clássico de
 * "vai fechar a aba ou trocar de site".
 *
 * ⚠ **Duas rodadas de bug relatado** ("a notificação não funcionou" →
 * corrigido pra `mouseleave` → "continua não aparecendo"):
 *
 * 1. Primeira versão: `mouseout` no `document`, filtrado por
 *    `relatedTarget === null`. Trocado porque esse filtro deixa passar
 *    ruído demais de transições internas da página.
 * 2. Segunda versão: só `mouseleave` em `document.documentElement`,
 *    com `clientY <= 0` estrito. Continuou falhando na prática — a
 *    suspeita mais forte é escala de tela fracionária (125%/150% no
 *    Windows, comum) fazendo o navegador disparar o evento com
 *    `clientY` em 1–2px, nunca exatamente `0` ou menos; e/ou o
 *    navegador só amostra `pointermove` periodicamente, então a
 *    última posição conhecida antes de sair pode não estar rente ao
 *    pixel 0 mesmo saindo por cima. **Nenhuma das duas foi testada de
 *    ponta a ponta com um gesto real de mouse saindo da janela** — só
 *    com evento sintético disparado via `dispatchEvent`, que prova que
 *    o handler funciona, não que o navegador real dispara o evento do
 *    jeito estrito que o código esperava.
 *
 * Correção: os dois listeners juntos (rede dupla — o que disparar
 * primeiro aciona), e uma faixa de tolerância (`TOP_EDGE_TOLERANCE_PX`,
 * 40px) em vez de exigir o pixel exato do topo.
 *
 * Só existe sinal confiável pra isso em mouse — não há evento
 * equivalente em touch (o próprio gesto de "sair" em mobile é trocar
 * de app ou usar o botão físico/gesto do sistema, fora do alcance do
 * JS da página). Restringir a desktop é o padrão usado pela indústria
 * pra esse tipo de aviso, não uma lacuna deste hook — ver
 * `docs/ui-web.md`, seção "Aviso de saída (exit-intent)".
 */
export function useExitIntent(onTrigger: () => void, enabled: boolean) {
  const onTriggerRef = useRef(onTrigger);

  useEffect(() => {
    onTriggerRef.current = onTrigger;
  }, [onTrigger]);

  useEffect(() => {
    if (!enabled) return;

    function handleMouseOut(event: MouseEvent) {
      if (event.relatedTarget === null && event.clientY <= TOP_EDGE_TOLERANCE_PX) {
        onTriggerRef.current();
      }
    }

    function handleMouseLeave(event: MouseEvent) {
      if (event.clientY <= TOP_EDGE_TOLERANCE_PX) {
        onTriggerRef.current();
      }
    }

    document.addEventListener("mouseout", handleMouseOut);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enabled]);
}
