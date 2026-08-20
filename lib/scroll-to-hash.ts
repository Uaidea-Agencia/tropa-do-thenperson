/**
 * Navegação por âncora interna (`#id`) que sempre rola, mesmo clicando
 * de novo no mesmo item. O `next/link` só faz scroll quando a URL muda
 * — como o site inteiro é uma página só, clicar duas vezes seguidas na
 * mesma seção (ou clicar nela de novo depois de já ter rolado pra
 * longe manualmente) faz o segundo clique não fazer nada, porque a URL
 * já está em `#id` e o Link não repete o `scrollIntoView`. Chamar isso
 * no `onClick`, antes do Link processar o clique, resolve pros dois
 * casos (URL muda ou não) da mesma forma.
 *
 * Retorna `true` quando encontrou o alvo e assumiu a navegação — nesse
 * caso o chamador deve dar `preventDefault()` no clique original.
 */
export function scrollToHash(href: string): boolean {
  if (!href.startsWith("#") || href.length < 2) return false;

  const id = href.slice(1);
  const target = document.getElementById(id);
  if (!target) return false;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });

  if (window.location.hash !== href) {
    window.history.pushState(null, "", href);
  }

  return true;
}
