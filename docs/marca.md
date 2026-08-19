# Thenperson do Vale — Identidade visual

Fonte da paleta de cores e da tipografia: `docs/referencias/identidade/V2
Thenperson_do_Vale_Cor_e_Tipografia_UAIdea.pdf` (UAIdea, **v2 — base
azul**, substitui integralmente a paleta da v1; a tipografia não muda,
mas o PDF v2 a reproduz inteira em sua seção 08, então vale como fonte
corrente). ⚠ O manual v1 original
(`manual-marca-cor-tipografia.pdf`, fonte histórica das regras de logo
abaixo) não está mais neste repositório — o kit de identidade foi
trocado por uma leva de arquivos v2 (`docs/referencias/identidade/`,
nomes `thenperson-*`/`avante-*` sem sufixo `_4000px`), sem PDF de regras
de logo equivalente ainda disponível. A seção Logo abaixo documenta o
kit v1 antigo (arquivos que não existem mais no repo) — precisa de uma
passada dedicada para remapear para o kit novo antes de confiar nela;
não foi tocada nesta migração de cor porque remapear qual arquivo novo
substitui qual uso é uma decisão própria, fora do escopo desta troca de
paleta. Tudo abaixo sem marcador é **lei** — não se negocia sem
aprovação. Itens com ⚠ não constam no manual e são **proposta técnica**
desta implementação, ajustáveis por quem aprova a marca.

## O que mudou da v1 para a v2

A v1 apostava no marrom-terra da logo como fundo escuro; o laranja era
a cor principal e o azul, cor secundária só de seções institucionais. A
v2 inverte: o **azul vira a base do site** (duas profundidades — Azul
Vale e Azul Profundo, no lugar do Terra do Vale único) e o **laranja
concentra-se no detalhe e na ação** (botões, números, ícones, fios —
presença menor em área, maior em importância). A cor terra sai do
sistema por completo, exceto dentro do arquivo-mestre da logo, que não
se altera. Tipografia inalterada.

## Paleta

### Base — azul
| Token | Hex | Função |
|---|---|---|
| `--color-primary` | `#0E3B80` | Azul Vale. Fundo padrão das seções escuras — é a cor que o site "é". |
| `--color-primary-dark` | `#06214F` | Azul Profundo. Hero, rodapé e qualquer bloco que precise receber laranja em texto pequeno. |
| `--color-primary-light` | `#3D74C8` | Fios, bordas internas e estados hover dentro de blocos azuis. |

### Detalhe — laranja e ciano
| Token | Hex | Função |
|---|---|---|
| `--color-accent` | `#F25316` | Laranja Vale. Botões, números grandes, ícones, fios. Texto pequeno sobre azul: não (ver Acessibilidade). |
| `--color-accent-dark` | `#C13C0B` | Laranja Queimado. Hover de botão e links em texto sobre fundo claro. |
| `--color-accent-light` | `#FF8A5B` | Laranja Claro. O laranja de texto sobre azul — eyebrows, links e legendas nos blocos escuros. |
| `--color-marker` | `#00A8B4` | Ciano Jequitinhonha. Grifos e tags, dose pequena — sobre azul, só em corpo grande ou área preenchida. |
| `--color-marker-dark` | `#00808A` | Ciano Profundo. Único ciano que pode receber texto branco. |

### Fundos
| Token | Hex | Função |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Blocos de leitura longa. |
| `--color-bg-muted` | `#F1F4FA` | Névoa. Alternância entre blocos claros — branco frio, substitui a Areia da v1. |

### Texto, borda e ação
| Token | Hex | Função |
|---|---|---|
| `--color-text` | `#10192B` | Grafite Azulado. Texto principal e texto sobre laranja. Preto puro nunca. |
| `--color-text-muted` | `#5A667E` | Cinza Azulado. Legendas e metadados sobre fundo claro. |
| `--color-text-inverse` | `#FFFFFF` | Texto sobre fundo escuro. |
| `--color-text-on-accent` | `#10192B` | Texto sobre laranja — grafite, não branco (ver Acessibilidade). |
| `--color-border` | `#DDE3EE` | Borda Névoa. Cards, divisores e inputs sobre fundo claro. |
| `--color-border-dark` | `#1B4F9E` | Borda Azul. Divisores dentro de blocos azuis — separa sem usar branco. |
| `--color-cta` | `var(--color-accent)` | Botão principal. |
| `--color-cta-hover` | `var(--color-accent-dark)` | Hover do botão principal. |
| `--color-focus` | `#00A8B4` | Anel de foco visível — obrigatório em todo elemento interativo. |

⚠ Migração v1 → v2: os tokens `--color-secondary` e
`--color-bg-dark-alt` deixaram de existir (sem substituto automático —
cada uso foi revisado manualmente e reclassificado como azul de seção
`--color-primary`, laranja `--color-accent` ou texto `--color-text`,
conforme o papel real que exercia), e `--color-primary` trocou de cor
(era laranja, virou azul; todo laranja de ação agora vive em
`--color-accent`).

### Cores do Avante — uso restrito
| Token | Hex | Função |
|---|---|---|
| `--color-party-orange` | `#D07900` | Aproximação visual lida do vetor oficial da logo do Avante. Só na assinatura do partido. |
| `--color-party-blue` | `#68A4AE` | Aproximação visual. Só dentro da logo do Avante. |

**Regra de convivência**: a logo do Avante aparece com as cores do
Avante — colorida (`avante-colorido-sem-fundo.png`) sobre fundo claro,
ou a variante monocromática branca oficial do próprio kit do partido
(`avante-mono-branco.png` — ver seção Logo) sobre fundo escuro. Todo o
resto do site — botões, títulos, seções — usa as cores do candidato.
Nunca misturar as duas paletas fora da logo do partido, e nunca recriar
uma variante de cor que o kit do Avante não forneça.

### Verdes do mapa — uso restrito
| Token | Hex | Função |
|---|---|---|
| `--color-mapa-verde-1` | `#EEF3EA` | Mais claro. |
| `--color-mapa-verde-2` | `#CDDCC2` | |
| `--color-mapa-verde-3` | `#A3C393` | |
| `--color-mapa-verde-4` | `#6F9C5C` | |
| `--color-mapa-verde-5` | `#3F6B32` | Mais escuro. Rótulo de cidade em texto
com halo claro por trás (`--color-text`, não um tom saturado puro) —
texto direto sobre este tom não bate 4,5:1 sem o halo. |

Escala fora da paleta da marca, pedida em `PROMPT_MAPA_JEQUITINHONHA.md`
especificamente para diferenciar as 5 microrregiões do mapa do Vale
(`components/propostas/MapaJequitinhonha.tsx`) — não usar em nenhum
outro lugar do site. Contraste de texto conferido contra as 5 (ver
`docs/ui-web.md`, seção Propostas).

### Proporção de uso
Invertida em relação à v1 — agora o escuro domina e o claro é que
alterna. 50% Azul Vale (o ambiente — fundo padrão das seções escuras) ·
18% Azul Profundo (marca abertura e fechamento — hero e rodapé) · 19%
claro/branco-névoa (blocos de leitura longa: propostas, biografia,
para não cansar a vista) · 10% ciano (marcador, grifos e tags) · 3%
laranja (só onde se clica ou onde o olho precisa parar — ocupa menos
área do que ocupava na v1, e por isso pesa mais). Os verdes do mapa
ficam fora dessa conta — são de uso restrito à seção Propostas.

## Tipografia

| Nível | Família | Peso | Tamanho | Entrelinha | Tracking |
|---|---|---|---|---|---|
| Display | Anton | 400 (único) | `clamp(40px, 9vw, 72px)` | 0.95 | 0.01em |
| H1 | Montserrat | 900 | `clamp(30px, 5.5vw, 48px)` | 1.1 | -0.02em |
| H2 | Montserrat | 800 | `clamp(24px, 4vw, 32px)` | 1.1 | -0.015em |
| H3 | Montserrat | 700 | 20–22px | 1.1 | 0 |
| Corpo | Poppins | 400 | 16–17px | 1.7 | 0 |
| Botão | Poppins | 600 | 14–15px | — | 0.04em, caixa alta |
| Legenda | Poppins | 400 | 12–13px | — | 0 |
| Eyebrow | Poppins | 600 | 11–12px | — | 0.24em, caixa alta |

Import: `https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap`

Três regras que mantêm o sistema limpo:
1. **Anton** nunca escreve frase inteira — só palavra ou número, no
   máximo um bloco por tela.
2. **Poppins** nunca vira título grande.
3. **Montserrat** nunca vira parágrafo corrido.

## Logo

### Candidato

- Nunca recolorir, distorcer, esticar ou recriar o lettering em outra
  fonte — regra que segue valendo para o arquivo-mestre.
- ⚠ Área de proteção e tamanho mínimo não estão definidos no manual —
  proposta técnica até validação: área de respiro mínima equivalente à
  altura do "T" de "THENPERSON" ao redor de toda a peça; tamanho mínimo
  de 120px de largura em tela.

O arquivo original de origem (`logo-thenperson-do-vale.png`, fundo
terra sólido) foi substituído no repositório por um kit oficial mais
completo, com o mesmo lettering, em `docs/referencias/identidade/`
(arquivos `thenperson_*_4000px.png`, canal alfa exceto as provas):

| Arquivo original | Derivado usado no site (`public/images/identidade/`) | Uso |
|---|---|---|
| `thenperson_colorido_sem_fundo_4000px.png` | `thenperson-colorido-sem-fundo.png` | Header — colorido, fundo removido de verdade (não é chapinha, não é recorte manual: é a variante oficial do kit). |
| `thenperson_mono_branco_4000px.png` | `thenperson-mono-branco.png` | Rodapé — mesma lógica da logo do Avante ao lado: marca cheia no header, monocromática discreta no rodapé. |
| `thenperson_mono_preto_4000px.png`, `thenperson_mono_laranja_4000px.png`, `thenperson_mono_terra_4000px.png` | *(não copiados — sem caso de uso)* | Reserva, variantes de um só tom para outros fundos. |
| `thenperson_h_*_4000px.png` | *(não usados)* | Versão horizontal alternativa do lockup (ícone lâmpada + barra tricolor, sem o contorno do Vale) — existe no kit, mas o site usa a versão com o contorno do Vale, mais próxima da identidade já publicada nas artes de campanha. |
| `*_prova_fundo_escuro.png` | — | Provas/mockup (fundo escuro embutido, sem transparência) — referência visual, não usar como asset. |

### Avante

Kit de variantes oficial do partido, em
`docs/referencias/identidade/` (arquivos `avante_*_4000px.png`, todos em
alta resolução, com canal alfa exceto a prova):

| Arquivo original | Derivado usado no site (`public/images/identidade/`) | Uso |
|---|---|---|
| `avante_colorido_sem_fundo_4000px.png` | `avante-colorido-sem-fundo.png` | Sobre fundo claro. Ainda sem uso no site atual (nenhuma seção clara mostra a logo do Avante hoje). |
| `avante_mono_branco_4000px.png` | `avante-mono-branco.png` | Sobre fundo escuro — Header e rodapé (fundo azul). É a variante que o próprio kit do Avante já entrega pronta para isso. |
| `avante_mono_preto_4000px.png` | *(não copiado ainda — sem caso de uso)* | Reserva, sobre fundo claro, se algum dia precisar de contraste maior que a colorida. |
| `avante_mono_laranja_4000px.png` | *(não copiado ainda — sem caso de uso)* | Reserva, variante em um só tom. |
| `avante_mono_branco_prova_fundo_escuro.png` | — | É uma prova/mockup (já vem com fundo escuro embutido, sem transparência) — referência visual, não usar como asset. |

Os derivados em `public/images/` são só redimensionados/comprimidos
(4000px → 640px, PNG) para peso de página — nenhum pixel de cor é
alterado. Nenhuma variante de cor fora dessa lista deve ser criada.

## Acessibilidade — contraste (WCAG 2.1)

Recalculado para a base azul. Referência WCAG 2.1: 4,5:1 texto normal,
3:1 texto grande (24px, ou 19px em negrito).

| Combinação | Razão | Status | Regra |
|---|---|---|---|
| Branco sobre Azul Vale `#0E3B80` | 10.74 | AAA | Livre, inclusive texto corrido. É o par padrão do site. |
| Branco sobre Azul Profundo `#06214F` | 15.69 | AAA | Combinação mais segura do sistema. |
| Laranja `#F25316` sobre Azul Vale | 3.08 | Só texto grande | **Regra crítica da v2.** Só em título ≥19px bold. Em texto pequeno, usar Laranja Claro. |
| Laranja `#F25316` sobre Azul Profundo | 4.50 | AA | No fundo mais escuro o laranja puro já passa — por isso o hero e o rodapé usam Azul Profundo. |
| Laranja Claro `#FF8A5B` sobre Azul Vale | 4.62 | AA | Padrão para texto laranja pequeno sobre azul (eyebrows, links). |
| Laranja Claro sobre Azul Profundo | 6.75 | AA | Legendas e links no hero e no rodapé. |
| Ciano `#00A8B4` sobre Azul Vale | 3.71 | Só texto grande | Números e grifos grandes. Nunca legenda. |
| Ciano sobre Azul Profundo | 5.43 | AA | Onde o ciano precisar carregar texto pequeno, o fundo tem que ser o profundo. |
| Grafite `#10192B` sobre Laranja | 5.04 | AA | Padrão para botão laranja — texto grafite, não branco. |
| Branco sobre Laranja | 3.49 | Só texto grande (≥19px bold) | Nunca em parágrafo. |
| Branco sobre Laranja Queimado `#C13C0B` | 5.36 | AA | Alternativa quando o botão precisa ser branco. |
| Branco sobre Ciano | 2.89 | Reprova | **Nunca.** Sobre ciano, texto grafite (6.07) ou trocar por Ciano Profundo `#00808A`. |
| Grafite sobre Branco / Névoa | 17.56 / 15.94 | AAA | Texto corrido nos blocos claros. |
| Azul Vale sobre Branco | 10.74 | AAA | Títulos nos blocos claros. |
| Cinza Azulado `#5A667E` sobre Branco | 5.77 | AA | Legendas nos blocos claros. |
| Laranja sobre Branco | 3.49 | Só texto grande | Para link em texto claro, usar Laranja Queimado `#C13C0B` (5.36). |

As três regras que resolvem quase tudo na v2:
1. Laranja puro sobre azul só em tipografia grande — abaixo disso,
   Laranja Claro.
2. O hero e o rodapé usam Azul Profundo justamente para liberar o
   laranja puro em texto.
3. O ciano nunca recebe texto branco, e sobre azul só aparece grande.

## ⚠ Superfícies em vidro (glassmorphism)

Não definido no manual original — proposta técnica (pedido do cliente:
"deixar o site mais atual, com efeitos em glass"). Formaliza um padrão
que já existia isolado na etiqueta flutuante da Capa
(`components/ui/FloatingTag.tsx`) e nos pilares flutuantes
(`components/ui/FloatingPilarTag.tsx`) — em vez de inventar um segundo
idioma visual, estendemos o mesmo para nav e cards.

- **Onde usar**: chrome de navegação (header fixo, menu mobile) e
  painéis flutuantes que ficam sobre imagem/textura (cards da seção
  Propostas, painel do mapa scroll-driven, carrossel mobile). **Onde não
  usar**: nunca atrás de texto de botão/CTA (laranja precisa de fundo
  sólido para bater WCAG — ver seção Acessibilidade) e nunca empilhado
  em mais de um elemento por tela, para não virar decoração.
- **Receita**: `bg-<token>/70–85 backdrop-blur-md`, com borda de 1px em
  `border-<token>/60` para separar do fundo sem depender só do blur.
  Alpha nunca abaixo de ~70% — mais transparente que isso deixa o
  contraste do texto por cima dependente do que está atrás (imagem,
  seção clara/escura), o que quebra as razões de contraste já
  auditadas nesta página. Em fundo escuro:
  `bg-primary-dark/75 backdrop-blur-md`; em fundo claro:
  `bg-bg/70 backdrop-blur-md` ou `bg-bg-muted/70 backdrop-blur-sm`.
- Sombra: `shadow-floating` (já um token) para separar o painel do que
  está atrás, em vez de aumentar o blur.
- É puramente visual/estático — não precisa de tratamento especial de
  `prefers-reduced-motion` por si só, mas qualquer transição de abertura
  (accordion, menu) que o acompanhe segue a regra normal da seção
  Movimento.

## ⚠ Espaçamento e grid

Não definido no manual original (é a próxima etapa da direção de arte).
Proposta técnica até validação, para não travar o desenvolvimento:

- Grid mobile-first: container fluido com `padding-inline` de 20px no
  mobile, 5–8% em desktop; breakpoints em 640 / 1024 / 1440px.
- Escala de espaçamento em múltiplos de 4px (4, 8, 12, 16, 24, 32, 48,
  64, 96) — mapear em tokens `--space-*` no sistema de estilo escolhido.
- Raio de borda: ver `docs/ui-web.md` (não é decisão de marca).
