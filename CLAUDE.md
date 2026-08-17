# CLAUDE.md

Guia operacional para trabalhar neste repositório. Leia isto antes de
qualquer tarefa; leia os docs referenciados antes de tocar em UI, copy ou
design.

## O projeto

Site de campanha (single page, mobile-first) de **Thenperson do Vale**,
pré-candidato a Deputado Estadual por Minas Gerais (Avante — 70), Vale do
Jequitinhonha. Cliente da agência UAIdea.

## Primeira tarefa

Se este repositório ainda não tem código de aplicação: execute
`PROMPT_CLAUDE_CODE.md` na íntegra, na ordem em que está escrito (Passo 0
a 4 + checklist). Não pule o Passo 0 (descoberta de stack) mesmo que
pareça óbvio qual framework usar.

Se o repositório já tem código: os cinco docs abaixo continuam sendo a
fonte de verdade. Qualquer PR que mude UI, copy ou design deve citar qual
doc justifica a mudança.

## Onde está cada verdade

| Pergunta | Resposta em |
|---|---|
| Qual cor/fonte/espaçamento usar? | `docs/marca.md` (lei) |
| Como o candidato fala, que frases evitar? | `docs/tom-de-voz.md` |
| Como as seções se comportam, o que anima e como? | `docs/ui-web.md` |
| O que é fato confirmado vs. o que é pendente? | `docs/referencia.md` |
| Quem é o projeto, público, escopo confirmado? | `docs/negocio.md` (crie no Passo 1, a partir de `docs/referencia.md`) |
| Arquivos originais (logo, artes, fotos, PDF do dossiê) | `docs/referencias/` |

## Regras que nunca se quebram, mesmo sob pressão de prazo

1. Nenhum hex, peso, espaçamento solto no código — sempre token, sempre
   vindo de `docs/marca.md`.
2. Nenhum fato biográfico, proposta ou número que não esteja em
   `docs/referencia.md`. Falta de dado = placeholder visível, nunca
   invenção.
3. Nenhuma copy pede voto de forma explícita e antecipada — é
   pré-candidatura, não candidatura oficial. CTA é sempre mobilização
   (grupo de WhatsApp/Telegram), nunca "vote em mim".
4. As filhas do candidato: só menção textual, nunca foto/vídeo/identificação.
5. Toda animação tem equivalente estático sob `prefers-reduced-motion`.
6. Logo do candidato e logo do Avante nunca são alteradas — arquivos
   originais em `docs/referencias/identidade/`.
7. `docs/referencias/estrategia/analise-estrategica-conteudo.pdf` é
   confidencial (marcação da própria UAIdea) — não expor fora deste
   repositório, não citar em conteúdo público do site além do que já foi
   filtrado para `docs/referencia.md`.

## Convenção de nome

Grafia oficial é **Thenperson** (com H) — não "Temperson". Ver
`docs/referencia.md`, seção 2, se aparecer a grafia errada em algum
arquivo de origem.

## Ao terminar uma tarefa

Rode mentalmente o checklist de saída no fim de `PROMPT_CLAUDE_CODE.md`
antes de considerar o PR pronto.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
