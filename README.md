# Thenperson do Vale — Site de campanha

Kit de partida para o site de campanha (single page, mobile-first) de
**Thenperson do Vale**, pré-candidato a Deputado Estadual por Minas
Gerais (Avante — 70), Vale do Jequitinhonha.

Produzido por **UAIdea Agência**.

> ⚠ **Confidencial.** Este repositório contém material interno de
> estratégia de campanha (`docs/referencias/estrategia/`). Não publicar,
> não compartilhar fora da equipe do projeto.

## O que tem aqui

O site já está implementado — Next.js (App Router) + TypeScript +
Tailwind CSS v4 + `motion`, seguindo o processo descrito em
`PROMPT_CLAUDE_CODE.md` (stack escolhida no Passo 0, registrada no topo
de `docs/negocio.md`).

```
.
├── PROMPT_CLAUDE_CODE.md   → prompt completo que guiou o desenvolvimento
├── CLAUDE.md               → guia operacional que o Claude Code lê automaticamente
├── README.md               → este arquivo
├── docs/
│   ├── referencia.md       → catálogo dos arquivos originais + dossiê do candidato (confirmado x pendente)
│   ├── marca.md            → paleta, tipografia, logo, contraste — lei da identidade visual
│   ├── tom-de-voz.md       → como o candidato fala, extraído de material real já aprovado
│   ├── ui-web.md           → como as 5 seções do site animam e se comportam
│   ├── negocio.md          → quem é o projeto, público, escopo confirmado, pendências
│   └── referencias/        → arquivos originais: logos, artes de campanha, fotos, manual de marca em PDF, dossiê estratégico
├── app/                    → App Router: layout, página única, fontes, tokens (globals.css)
├── components/
│   ├── ui/                 → átomos: Button, CtaButton, Badge, FloatingTag
│   ├── layout/             → Container, Footer
│   └── sections/           → Intro, Capa, Sobre, Propostas, QuerSaberMais
├── content/                → dados tipados: site.ts, milestones.ts, pilares.ts, cta-links.ts
├── features/               → mecânicas com lógica própria: intro/, scroll-reveal/, vale-map/
├── hooks/                  → usePrefersReducedMotion, useScrollProgress, useIntroSeen
├── lib/                    → tokens de movimento (motion.ts)
└── public/images/          → cópias dos ativos de docs/referencias/ usados pelo site
```

## Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run lint
```

## As cinco seções do site

1. **Intro** — abertura em tela cheia revelando o rosto do candidato.
2. **Capa** — propostas flutuando ao fundo, retrato central, nome como
   etiqueta/crachá sobreposta.
3. **Sobre** — trajetória real do candidato, revelada ao rolar, com
   fotos de arquivo entrando dos dois lados.
4. **Propostas** — mapa do Vale do Jequitinhonha preenchendo de uma ponta
   a outra conforme rola, com um pilar de proposta a cada trecho.
5. **Quer saber mais?** — CTA final para os grupos de WhatsApp e
   Telegram.

Detalhamento completo de cada seção está em `docs/ui-web.md`.

## Pendências conhecidas antes do lançamento

Lista completa em `docs/negocio.md` ("Pendências institucionais") e
`docs/referencia.md`, seção 4. As mais bloqueantes:
- Link real do grupo de WhatsApp e do Telegram (`content/cta-links.ts` —
  hoje em estado "em breve").
- Nome completo e idade exata do candidato.
- Confirmação de quantos filhos existem e nível de exposição permitido.
- Revisão jurídica dos pilares "Uso correto de recursos públicos" e
  "Mineração" (`content/pilares.ts`) antes de publicar.

## Contato

UAIdea Agência — uaideamg@gmail.com · @uaidea.agencia
