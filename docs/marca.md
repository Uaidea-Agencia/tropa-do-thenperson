# Thenperson do Vale — Identidade visual

Fonte: `docs/referencias/identidade/manual-marca-cor-tipografia.pdf`
(UAIdea, v1). Tudo abaixo sem marcador é **lei** — não se negocia sem
aprovação. Itens com ⚠ não constam no manual e são **proposta técnica**
desta implementação, ajustáveis por quem aprova a marca.

## Paleta

### Marca
| Token | Hex | Função |
|---|---|---|
| `--color-primary` | `#F25316` | Laranja Vale. Cor principal — títulos de destaque, ícones, barras, estados ativos. |
| `--color-primary-dark` | `#C13C0B` | Hover de botão e qualquer laranja que precise carregar texto branco pequeno. |
| `--color-primary-light` | `#FF8A5B` | Links e apoio sobre fundo escuro. Nunca sobre branco. |
| `--color-secondary` | `#0E3B80` | Azul Noite. Seções institucionais: propostas, biografia, transparência. |
| `--color-secondary-dark` | `#082A5E` | Variante escura do azul. |
| `--color-accent` | `#00A8B4` | Ciano Jequitinhonha. Marcador de leitura: grifos, números, setas, tags. Dose pequena e constante. |
| `--color-accent-dark` | `#00808A` | Versão do ciano que pode receber texto branco (o ciano puro não pode — ver Acessibilidade). |

### Fundos
| Token | Hex | Função |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Fundo padrão do conteúdo. |
| `--color-bg-muted` | `#F7F3F0` | Areia. Alternância entre blocos — branco quente, não cinza. |
| `--color-bg-dark` | `#3A0C02` | Terra do Vale. Hero, rodapé, blocos de impacto — fundo da própria logo. |
| `--color-bg-dark-alt` | `#25201E` | Grafite quente. Fundo neutro escuro quando o terra ficar pesado demais. |

### Texto, borda e ação
| Token | Hex | Função |
|---|---|---|
| `--color-text` | `#1C1614` | Texto principal. Preto puro nunca. |
| `--color-text-muted` | `#6B605A` | Legendas, datas, apoio. |
| `--color-text-inverse` | `#FFFFFF` | Texto sobre fundo escuro. |
| `--color-text-on-primary` | `#1C1614` | Texto sobre laranja — grafite, não branco (ver Acessibilidade). |
| `--color-border` | `#E5DCD6` | Cards, divisores, inputs. |
| `--color-cta` | `var(--color-primary)` | Botão principal. |
| `--color-cta-hover` | `var(--color-primary-dark)` | Hover do botão principal. |
| `--color-focus` | `#00A8B4` | Anel de foco visível — obrigatório em todo elemento interativo. |

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
com halo claro por trás (não `--color-bg-dark` puro) — texto direto em
`--color-bg-dark` sobre este tom não bate 4,5:1. |

Escala fora da paleta da marca, pedida em `PROMPT_MAPA_JEQUITINHONHA.md`
especificamente para diferenciar as 5 microrregiões do mapa do Vale
(`components/propostas/MapaJequitinhonha.tsx`) — não usar em nenhum
outro lugar do site. Contraste de texto conferido contra as 5 (ver
`docs/ui-web.md`, seção Propostas).

### Proporção de uso
60% branco/areia (conteúdo) · 22% terra (hero e rodapé) · 11% laranja
(ação, foco do olho) · 5% azul (seções institucionais) · 2% ciano
(assinatura, raro por design). Os verdes do mapa ficam fora dessa conta
— são de uso restrito à seção Propostas.

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
| `avante_mono_branco_4000px.png` | `avante-mono-branco.png` | Sobre fundo escuro — Header e rodapé (fundo terra). É a variante que o próprio kit do Avante já entrega pronta para isso. |
| `avante_mono_preto_4000px.png` | *(não copiado ainda — sem caso de uso)* | Reserva, sobre fundo claro, se algum dia precisar de contraste maior que a colorida. |
| `avante_mono_laranja_4000px.png` | *(não copiado ainda — sem caso de uso)* | Reserva, variante em um só tom. |
| `avante_mono_branco_prova_fundo_escuro.png` | — | É uma prova/mockup (já vem com fundo escuro embutido, sem transparência) — referência visual, não usar como asset. |

Os derivados em `public/images/` são só redimensionados/comprimidos
(4000px → 640px, PNG) para peso de página — nenhum pixel de cor é
alterado. Nenhuma variante de cor fora dessa lista deve ser criada.

## Acessibilidade — contraste (WCAG 2.1)

| Combinação | Razão | Status | Regra |
|---|---|---|---|
| Grafite `#1C1614` sobre Laranja | 5.13 | AA | Padrão para botões laranja. |
| Branco sobre Laranja | 3.49 | Só texto grande (≥19px bold) | Nunca em parágrafo. |
| Branco sobre Laranja Queimado `#C13C0B` | 5.36 | AA | Alternativa quando o botão precisa ser branco. |
| Branco sobre Azul Noite | 10.74 | AAA | Livre, inclusive texto corrido. |
| Branco sobre Ciano | 2.89 | Reprova | **Nunca.** Usar grafite sobre ciano ou trocar por Ciano Profundo. |
| Grafite sobre Ciano | 6.18 | AA | Tags e badges com fundo ciano. |
| Branco sobre Terra | 17.03 | AAA | Combinação mais segura do sistema — base do hero. |
| Laranja sobre Terra | 4.88 | AA | Destaques dentro do hero. |
| Ciano sobre Terra | 5.89 | AA | Fios, números, legendas no hero. |
| Grafite sobre Branco/Areia | 17.88 / 16.21 | AAA | Texto corrido padrão. |

As duas regras que resolvem a maioria dos casos: texto pequeno sobre
laranja é sempre grafite, nunca branco; o ciano nunca recebe texto
branco.

## ⚠ Espaçamento e grid

Não definido no manual original (é a próxima etapa da direção de arte).
Proposta técnica até validação, para não travar o desenvolvimento:

- Grid mobile-first: container fluido com `padding-inline` de 20px no
  mobile, 5–8% em desktop; breakpoints em 640 / 1024 / 1440px.
- Escala de espaçamento em múltiplos de 4px (4, 8, 12, 16, 24, 32, 48,
  64, 96) — mapear em tokens `--space-*` no sistema de estilo escolhido.
- Raio de borda: ver `docs/ui-web.md` (não é decisão de marca).
