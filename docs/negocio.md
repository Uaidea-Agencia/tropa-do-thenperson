# Thenperson do Vale — Negócio

Fonte única deste documento: `docs/referencia.md` (que por sua vez sintetiza
`docs/referencias/estrategia/analise-estrategica-conteudo.pdf`, já filtrado
e aprovado pelo cliente). Nenhum fato abaixo foi adicionado além do que já
está registrado lá. Onde `docs/referencia.md` marca algo como pendente,
este documento marca do mesmo jeito — nunca preenche a lacuna.

## Stack (descoberta — Passo 0 do `PROMPT_CLAUDE_CODE.md`)

Repositório era greenfield: nenhum `package.json` ou config de framework
existia antes desta tarefa. Stack escolhida com o cliente (pergunta feita
antes de qualquer código, conforme exigido no Passo 0):

- **Framework**: Next.js 16 (App Router), TypeScript.
- **Estilo**: Tailwind CSS v4 (tokens via `@theme` em `app/globals.css`,
  ver comentários no próprio arquivo citando `docs/marca.md`).
- **Animação**: `motion` (sucessor do Framer Motion) — cobre os três
  padrões scroll-linked (Intro, Sobre, Propostas) e suporta
  `prefers-reduced-motion` nativamente via `useReducedMotion`.
- **Ícones**: `lucide-react` — biblioteca única, ver `docs/ui-web.md`.
- **Fontes**: `next/font/google` (Anton, Montserrat, Poppins) — mesmas
  famílias e pesos de `docs/marca.md`, self-hosted pelo Next.js em vez do
  `<link>` do Google Fonts (equivalente visualmente, melhor performance;
  decisão técnica, não de marca).
- **Deploy alvo**: estático/Vercel-ready (sem uso de API routes ou banco de
  dados — site é uma landing page de conversão).
- **Rotas**: single page. Toda a experiência vive em `app/page.tsx`; sem
  rotas adicionais.

## Quem é o projeto

Site de campanha (single page, mobile-first) de **Thenperson do Vale**,
pré-candidato a Deputado Estadual por Minas Gerais pelo partido
**Avante — 70**, com base no **Vale do Jequitinhonha** (Almenara). Cliente
da agência **UAIdea**, que produziu todo o material de marca, conteúdo e
estratégia usado como fonte deste site.

Grafia oficial: **Thenperson** (com H) — nunca "Temperson" (ver
`docs/referencia.md`, seção 2).

## Público-alvo

- **Confirmado**: moradores do Vale do Jequitinhonha — a região que o
  candidato representa e de onde fala ("de dentro", não "sobre" — ver
  `docs/referencia.md`, seção 6, e `docs/tom-de-voz.md`).
- **Pendente**: faixa etária, classe social e localidade prioritárias
  dentro da região não foram definidas (`docs/referencia.md`, seção 4,
  "Pendente").

## Posicionamento central

O argumento central do site **não** é identidade regional genérica
("mineiridade", sotaque, folclore). É a distância real entre o Vale do
Jequitinhonha e o Minas Gerais desenvolvido (BH, Triângulo, Zona da
Mata) — e o fato de o candidato falar de dentro dessa distância, não de
fora olhando para dentro. O candidato rejeita explicitamente o rótulo
"vale da pobreza" / "vale da miséria": pode citar a expressão só para
desconstruí-la, nunca como descrição própria da região
(`docs/referencia.md`, seção 6).

## Oferta / escopo confirmado

- Site institucional de campanha, **página única**, mobile-first, cinco
  seções fixas: Intro → Capa → Sobre → Propostas → Quer saber mais?
  (detalhamento em `docs/ui-web.md`).
- **Objetivo primário**: converter visitante em apoiador dentro dos
  canais oficiais de mobilização (grupo de WhatsApp e Instagram — o
  candidato não tem canal de Telegram) — **não** é site de pedido de
  voto. O candidato está em pré-candidatura; pedido explícito de voto
  antes do período eleitoral permitido tem restrição na legislação
  eleitoral brasileira (regra inegociável, ver `PROMPT_CLAUDE_CODE.md`,
  Passo 2, item 10).
- **Trajetória exibida (seção Sobre)**: conteúdo literal de
  `docs/referencia.md`, seção 4 "Confirmado" — origem em Santo Antônio do
  Jacinto, mudança para BH aos 8 anos, 12 anos como técnico de automação
  em ~9 estados, retorno ao Vale para ser pai, origem do desejo político
  (motivada por uma das filhas e pelo protesto do caixão durante a
  pandemia), preparação pessoal antes de formalizar a candidatura.
- **Pilares de proposta exibidos (seção Propostas)**: os seis pilares já
  aprovados em `docs/referencia.md`, seção 5 — saúde (hospital regional),
  trabalho e economia (cooperativas, feiras, CEASA), infraestrutura
  (BR-367), juventude (retenção de jovens no Vale), uso correto de
  recursos públicos (fiscalização de emendas) e mineração (posição de
  equilíbrio). Os dois últimos exigem cautela/revisão jurídica antes de
  publicar — sinalizado no PR, não removido do site.
- **Geografia usada como estrutura da seção Propostas**: as três
  sub-regiões do Vale do Jequitinhonha — Baixo (Almenara, base do
  candidato), Médio (Araçuaí) e Alto (Diamantina) —
  `docs/referencia.md`, seção 7.

Fora de escopo até segunda ordem: qualquer proposta, número ou promessa
que não esteja listada acima; qualquer rota além da página única; pedido
de voto direto.

## Contato confirmado

Grupo do WhatsApp (`https://chat.whatsapp.com/E37S9PNOadYCo0CmB9MrKz?s=cl&p=i&mlu=4&amv=0`) e
Instagram (`https://www.instagram.com/thenperson/`) — `docs/referencia.md`,
seção 4. O candidato não tem canal de Telegram; o segundo CTA do site é
o Instagram. `content/cta-links.ts` guarda os dois; `CtaButton`
(`components/ui/CtaButton.tsx`) ainda sabe renderizar um estado visível
"em breve" (`aria-disabled="true"`, sem `href` real) para qualquer canal
futuro sem link confirmado — ver `docs/ui-web.md`, seção 5.

## Pendências institucionais

Copiado literalmente da seção "Pendente — não usar até confirmação" de
`docs/referencia.md`, seção 4:

- Nome completo e idade exata.
- Número exato e idade dos filhos, e quanto o candidato deseja expô-los
  em conteúdo de campanha. ⚠ Até confirmação, tratar como: **não expor
  as filhas em foto ou vídeo, apenas menção textual de contexto**
  (recomendação explícita do dossiê).
- Posição sobre segurança pública.
- Proposta de educação além de escolas técnicas/faculdades.
- Público-alvo prioritário (faixa etária, classe social, localidade).
- Todos os bordões que o candidato já usa e quer reforçar.
- Influenciadores locais parceiros e orçamento disponível.
- Orçamento total de campanha.

Todo item acima aparece no site (quando aparece) como placeholder visível
(`[ PENDENTE ]` ou estado "em breve"), nunca como conteúdo inventado.
