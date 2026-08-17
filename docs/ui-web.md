# Thenperson do Vale — Camada de UI web

⚠ Nada aqui vem do manual de marca — cobre o que ele não trata. Padrão do
repositório, não lei. Pode ser revisado sem aprovação de marca, mas
qualquer mudança relevante deve ser registrada aqui no mesmo PR.

Site é **single page, mobile-first**, cinco seções em sequência fixa:
Intro → Capa → Sobre → Propostas → Quer saber mais?.

## Header (fixo)

⚠ Não fazia parte das 5 seções originais — pedido do cliente, adicionado
depois do primeiro corte do site (`components/layout/Header.tsx`).

- Fixo no topo (`position: fixed`), altura `4rem` (`h-16`) quando
  fechado, acima de todo o conteúdo (`z-40` — abaixo só da Intro, que é
  `z-50`).
- Fundo Azul Profundo sólido (`--color-primary-dark`), sempre — não
  muda ao rolar. Como a Capa (hero) começa com o mesmo fundo, não há
  salto de cor — mesma regra que fez o header trocar de v1 (Terra do
  Vale) para v2 (Azul Profundo) junto com o hero, não para o Azul Vale
  genérico das demais seções escuras.
- Conteúdo: logo do candidato à esquerda, colorida, fundo removido de
  verdade (`thenperson-colorido-sem-fundo.png` — ver `docs/marca.md`,
  seção Logo > Candidato), sempre visível (substituiu o ícone quadrado +
  nome em texto separado — agora é uma peça só), aumentada a pedido do
  cliente ("aumente mais a logo no header" — `h-12` no mobile, `h-14` a
  partir de `nav`, era `h-10`/`h-11`); logo do Avante (variante
  monocromática branca oficial, ver `docs/marca.md`, seção Logo >
  Avante) logo em seguida, só a partir de `nav` (960px — ver breakpoint
  abaixo). Navegação para as seções no centro, só a partir de `nav`. CTA
  de mobilização à direita (`Button` `size="sm"`, aponta para
  `#quer-saber-mais`) — visível a partir de `xs` (480px) até sumir de
  novo a partir de `nav` (vira parte do painel do menu); abaixo de `xs`
  some por completo e mora só dentro do menu responsivo. ⚠ Esse `xs`
  já foi 400px; pedido do cliente: "no tamanho 430 de tela pode colocar
  o botão quero fazer parte já dentro do menu" — ou seja, em 430px o
  botão ainda aparecia solto no header, e o cliente queria que essa
  largura já contasse como "só no menu". Subido para 480px, com folga
  acima de 430px. No lugar do CTA + nav inline, abaixo de `nav`, um
  botão hambúrguer. Nunca pedido de voto (mesma regra do resto do
  site).
- **Breakpoint próprio do menu**: `--breakpoint-nav` (`app/globals.css`)
  — diferente do `tablet` (640px) usado no resto do site, porque nessa
  largura o header já tem logo + Avante + 3 links + CTA competindo por
  espaço, e 640px ficava apertado. Pedido original do cliente foi 800px
  ("a partir de 800 pode fazer o menu responsivo"); depois de aumentar a
  logo ("aumente mais a logo no header") e trocar "Sobre" por "Sobre
  mim" (mais largo), 800px passou a quebrar linha — subido para 960px
  com folga, ajuste técnico pra caber o que foi pedido depois, não
  mudança do pedido original. `--breakpoint-xs: 480px` controla só a
  visibilidade do CTA (histórico de mudança logo acima).
- **Menu responsivo de tela cheia** (pedido do cliente — antes o mobile
  não tinha navegação nenhuma; depois pedido para cobrir a tela toda e
  travar o scroll): abaixo de `nav`, a navegação vira um botão
  hambúrguer (`Menu`/`X` do Lucide, `aria-expanded`/`aria-controls`) que
  abre um painel **fixo, cobrindo toda a tela abaixo do header**
  (`fixed inset-x-0 top-16 bottom-0`, `z-30` — abaixo do header, que
  continua visível por cima com o botão de fechar), com os links e o
  CTA centralizados verticalmente. Enquanto o painel está aberto, o
  scroll do `<body>` é travado via `useEffect`
  (`document.body.style.overflow = "hidden"`, restaurado ao fechar —
  mesmo padrão de `features/intro/IntroGate.tsx`). O painel sempre
  fecha antes de qualquer navegação, via `onClick` nos links.
- **Seção ativa marcada** (pedido do cliente: "marque a seção no menu
  quando a pessoa estiver nela", depois refinado: "só fique laranja o
  item se ele estiver sobre aquela seção, no caso da tela inicial não é
  para ficar laranja nenhuma opção") — `hooks/useActiveSection.ts`, um
  `IntersectionObserver` por seção com uma faixa fina logo abaixo do
  header como referência. O link correspondente troca de cor
  (`--color-accent-light` — laranja pequeno sobre azul precisa da
  variante clara, ver `docs/marca.md`, Acessibilidade) e ganha
  `aria-current="true"`, tanto na
  navegação inline quanto no painel mobile; nunca por hover. Na Capa
  (fora da lista rastreada) nenhum item fica laranja — o hook retorna
  `null` explicitamente sempre que nenhuma seção rastreada toca a faixa,
  em vez de manter "grudado" o último valor visto.
- **Borda animada da esquerda pra direita** (pedido do cliente: "quando
  entrar em alguma seção, a opção no header que venha uma borda de baixo
  da esquerda para a direita") — `NavItem` (dentro de `Header.tsx`), um
  `motion.span` de 2px sob o texto, `scaleX` 0→1 com origem à esquerda
  (`originX: 0`), acionado pelo mesmo estado de seção ativa. Encolhe do
  mesmo jeito ao desativar. Sob `prefers-reduced-motion`, a transição
  vira instantânea (`duration: 0`) em vez de desligar a borda — ela
  continua marcando a seção ativa, só sem a animação de entrada.
- Rótulo do link para a seção Sobre é "Sobre mim", não só "Sobre"
  (pedido do cliente — mesma convenção de site de campanha real usada
  como referência, `nikolasferreira.com.br`, que também chama o próprio
  item de menu de "Sobre mim").
- Toda seção com `id` (`section[id]`) ganha `scroll-margin-top: 4rem`
  (`app/globals.css`) pra não nascer escondida atrás do header ao
  navegar por âncora — vale tanto pros links de navegação quanto pro
  clique na logo (que aponta pra `#capa`, ou seja, também serve como
  "voltar ao topo").
- Fica `inert` junto com o resto da página enquanto a Intro está ativa
  (é filho do mesmo wrapper — ver `components/sections/Intro.tsx`).

## Botão "voltar ao topo"

⚠ Não fazia parte da estrutura original — pedido do cliente
(`features/back-to-top/BackToTopButton.tsx`): clicar na logo do header
já volta pro topo, mas ele queria um atalho mais rápido/visível.

- Fixo, canto inferior direito, `z-30` (abaixo do header e da Intro).
- Cor `--color-accent`/`--color-accent-dark` (laranja — pedido do
  cliente: "deixar o botão de ir para cima laranja"), texto
  `--color-text-on-accent` (grafite, não branco — regra de contraste de
  `docs/marca.md` para qualquer fundo laranja). Era azul
  (`--color-primary`) desde a migração para a paleta v2.
- Some enquanto a Capa está visível; aparece assim que ela sai da tela
  (`IntersectionObserver` na seção `#capa`, com `rootMargin` descontando
  a altura do header).
- Clique rola pro topo com `scrollTo({ behavior: "smooth" })` — instantâneo
  (`"auto"`) sob `prefers-reduced-motion`.
- Continua no DOM sempre (`aria-hidden`/`tabIndex` alternam com a
  visibilidade) — não soma nem remove elemento a cada scroll.

## Movimento — regras gerais

- Durações: micro-interação (hover, foco) 120–160ms · transição de bloco
  240–320ms · sequência orquestrada (intro) até 2.5s no total.
- Easing padrão: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out expressivo) —
  entradas aceleram e desaceleram suave, nunca linear.
- **`prefers-reduced-motion: reduce` é obrigatório em qualquer animação**
  desta página. As três mecânicas abaixo (Intro, Sobre, Propostas)
  dependem de scroll ou tempo — todas precisam de um estado estático
  equivalente:
  - Intro: pula direto para a Capa, sem sequência de revelação.
  - Sobre: fotos aparecem na posição final sem animação de entrada
    alternada; texto da trajetória em ordem, sem stagger.
  - Propostas: mapa aparece já preenchido, pilares listados em ordem
    vertical simples, sem sincronismo de scroll.
- Foco de teclado sempre visível — anel na cor `--color-focus`
  (`#00A8B4`), nunca `outline: none` sem substituto.
- Seleção de texto (`::selection`, `app/globals.css`) no laranja de
  marca (`--color-accent`) com texto grafite (`--color-text-on-accent`)
  — pedido do cliente ("ao selecionar algo, selecione com a cor
  primária" — "primária" no sentido coloquial de "cor de assinatura da
  marca", não do token `--color-primary`, que na v2 é azul), no lugar
  do azul padrão do navegador. ⚠ Migração v2: antes de vir de
  `--color-accent`, esse laranja vinha de `--color-primary` (v1) — o
  hex nunca mudou, só o token que o carrega.

## Cursor personalizado

⚠ Proposta técnica — pedido do cliente, a partir de uma especificação de
componente ("Cursor" — seta com spring física + etiqueta de nome
arrastada atrás, balançando com a velocidade do mouse; "ao invés de
Robert, coloque eleitor"). Nasceu restrito ao mapa 3D da seção
Propostas; pedido seguinte do cliente foi "sobre o cursor é no site
todo não é somente no mapa" — agora envolve `{children}` inteiro em
`app/layout.tsx`, cobrindo o site todo.

- `components/ui/CustomCursor.tsx`: seta SVG + etiqueta de texto
  (`"Eleitor"` por padrão) seguem o ponteiro com spring física
  (`useSpring` do motion) — a seta com mola mais rígida (resposta
  rápida), a etiqueta com mola mais solta (atraso perceptível, "arrasta
  atrás"). A etiqueta gira com a velocidade horizontal do cursor
  (`labelTiltStrength`, máximo de graus de inclinação), e ambos encolhem
  levemente enquanto um botão do mouse está pressionado (`pressScale`).
- Cor `--color-text` (Grafite Azulado) + texto branco — não as cores
  padrão branco/preto da especificação original, pra já nascer dentro
  da paleta da marca. ⚠ Migração v2: era Terra do Vale
  ("Branco sobre Terra", a combinação mais segura de contraste da v1,
  17.03) — a Terra saiu do sistema; `--color-text` é o neutro escuro
  que sobrou, sem virar nenhum dos azuis de seção (o cursor não é uma
  seção, não devia herdar a cor delas).
- ⚠ **Posicionamento via `position: fixed` + portal pro `document.body`**,
  não posição absoluta relativa a um contêiner. Primeira versão (só
  sobre o mapa) usava um `<div>` `relative` com as coordenadas do cursor
  calculadas a partir do `getBoundingClientRect()` desse contêiner —
  funcionava para uma superfície pequena e isolada, mas quebra assim que
  aplicado à página inteira: um contêiner alto (a altura da página toda)
  tem sua posição no viewport mudando conforme o usuário rola, então um
  elemento posicionado `absolute` dentro dele "rola junto" com a página
  em vez de ficar grudado no ponteiro real. `fixed` é relativo ao
  viewport (imune a scroll) e o portal evita qualquer ancestral com
  `transform`/`perspective`/`filter` (como o wrapper do *tilt* do mapa
  3D) virar sem querer o novo referencial do `fixed`.
- **Cursor nativo escondido em todo o site** — `.custom-cursor-active,
  .custom-cursor-active * { cursor: none !important; }` em
  `app/globals.css`. Precisa do `!important` e do seletor `*` porque
  elementos como `<a>` têm `cursor: pointer` do próprio navegador (folha
  de estilo do user-agent), que teria prioridade sobre um `cursor: none`
  só herdado de um ancestral.
- Nunca renderiza em `(pointer: coarse)` (touch) —
  `hooks/useCoarsePointer.ts` — nesses casos o cursor do sistema
  operacional continua normal (nem existe em touch). Passa cliques
  através (`pointer-events-none` nos elementos visuais), então nunca
  atrapalha nenhuma interação por baixo.
- **Bolhas de "click" caindo** (pedido do cliente: "poderia aparecer a
  palavra click bem fofinha e pequena várias vezes... surgindo e
  caindo toda torta, como uma animação de desenho animado quando um
  bloco cai e fica girando por conta do peso") — nasce um `click`
  pequeno (11px, cor `--color-accent`) perto da posição atual do cursor
  (`arrowX`/`arrowY`, com leve espalhamento aleatório), cai ~46px e some
  — `rotate` em keyframes (`[0, 22, -16, 4]`) simula o tombo/balanço de
  um objeto pesado assentando, não uma rotação uniforme. Cada bolha se
  autorremove (`onAnimationComplete`) depois de cair, limitado a 4
  simultâneas. Decorativo (`aria-hidden`), some inteiro sob
  `(pointer: coarse)` e `prefers-reduced-motion` (mesmo par de guardas
  do resto do cursor).
  - **Correção seguinte** (pedido do cliente: "a palavra click é para
    aparecer somente em uma mudança de estado do cursor... quando para
    em algo que seja clicável ou que seja um link") — a versão original
    nascia num timer aleatório (1,6–3,4s), ambiente, sem relação com o
    que estava sob o cursor. Trocado por detecção de estado: dentro do
    próprio `handleMove` (já ouvindo `pointermove` pra seta/etiqueta),
    `event.target.closest(CLICKABLE_SELECTOR)` — seletor semântico
    (`a[href]`, `button` não desabilitado, `[role="button"]`, campos de
    formulário, `[tabindex]` focável etc.), não `getComputedStyle(...).cursor
    === "pointer"`, porque o próprio `cursor: none !important` global
    do cursor customizado (ver abaixo) já sobrescreve o `cursor`
    computado de todo elemento — checar o computed style veria sempre
    "none", nunca "pointer". Uma bolha nasce só na transição
    false→true (`wasOverClickableRef`), nunca enquanto o cursor
    continua sobre o mesmo elemento clicável nem sobre texto comum.
  - **Ajuste seguinte** (pedido do cliente: "pode deixar em loop a
    palavra click... após sair desse estado clicável ele para") — nascer
    só uma vez na transição não bastava; o cliente queria a palavra
    repetindo enquanto o cursor *continuasse* parado sobre o link, não só
    no instante em que entra. A transição false→true agora dispara a
    primeira bolha **e** arma um `setInterval` (`BUBBLE_LOOP_MS`,
    550ms) que segue chamando `spawnBubble()` — funciona parado em cima
    do link, sem precisar mexer o mouse, porque é um timer, não mais
    algo amarrado a eventos de `pointermove`. A transição true→false
    (ou o cursor sair da janela de vez, `mouseleave`) limpa o
    `setInterval` na hora — nenhuma bolha nova nasce depois disso, só
    as que já estavam caindo terminam de cair sozinhas. Testado:
    parado sobre um link, a contagem de bolhas visíveis se estabiliza
    em ~2 simultâneas (duração de queda 1,1s ÷ intervalo de 550ms ≈ 2,
    o próprio ritmo do loop) e cai a 0 pouco depois de sair.

## Seção 1 — Intro

**Papel**: primeiro contato, rosto do candidato antes de qualquer texto.
Referência de ritmo de corte (só ritmo/edição, não elementos de marca):
`https://www.instagram.com/reel/DcAJJ9JsD-g`.

Mecânica atual: o retrato **flutua do fundo para o centro**, na mesma
linguagem visual da Capa, e a Intro vira uma prévia animada dela —
quando colapsa, a Capa já parece uma continuação, não um corte brusco.

⚠ **Histórico de idas e vindas na moldura do retrato** — registrado aqui
porque já foram três versões diferentes, todas a pedido do cliente:
(1) retângulo tracejado ao redor da foto; (2) contorno vetorial do corpo
real, extraído via potrace, com uma linha que antes visitava as seis
propostas em sequência ("tipo uma minhoca") e só depois traçava o corpo;
(3) **estado atual — sem moldura nenhuma** ("retire a borda pontilhada e
a borda da intro"). O componente `AnimatedPortraitFrame` e o arquivo
`lib/silhouette-path.ts` foram os dois removidos do repositório.

1. **Retrato entra flutuando** — `institucional-03-cutout.webp` (recorte
   com fundo removido, ver Seção 2 abaixo) nasce pequeno/transparente ao
   fundo e cresce até o centro da tela, ~900ms, **começando no instante
   em que a Intro monta** — não espera nenhuma fase terminar antes de
   começar a animar. ⚠ Bug já corrigido: numa versão anterior a entrada
   só COMEÇAVA a animar depois dos 900ms (a fase esperava, aí a animação
   rodava por cima), somando quase 1.8s de tela parada antes do retrato
   aparecer — sintoma relatado pelo cliente como "a intro está demorando
   iniciar". Ao chegar ao centro, passa a flutuar em loop (bob vertical
   leve), igual ao retrato da Capa. Sem moldura ao redor.
2. **Nome digita letra a letra** — "THENPERSON" e depois "DO VALE"
   aparecem caractere a caractere (efeito "máquina de escrever"), na
   mesma etiqueta/crachá flutuante da Capa, logo abaixo do retrato.
3. **Pilares de proposta aparecem ao redor** — os mesmos seis cards
   flutuantes da camada de fundo da Capa (`docs/referencia.md`,
   seção 5), surgindo com leve atraso entre eles.
4. Pausa curta (~350ms) com tudo revelado, depois colapsa (fade + scale
   leve) para a Capa. Soma total ≈ 2.2s — dentro do teto de 2.5s da
   seção "Movimento" acima.

- Tela cheia, sem scroll disponível até a sequência terminar ou o
  usuário pular.
- Botão "pular" sempre visível, canto superior, desde o primeiro frame.
- **Toca em toda visita/carregamento da página** — pedido explícito do
  cliente ("toda vez que entrar no site, mostra essa intro"). ⚠ Isso
  substitui a regra original deste documento (intro gravava uma flag em
  `sessionStorage` e não repetia na mesma sessão) — o hook
  `useIntroSeen` foi removido; `features/intro/IntroGate.tsx` só decide
  mais se a intro já terminou **nesta carga de página** (estado local),
  não entre cargas.
- Com `prefers-reduced-motion`: pula direto para a Capa, sem carregar a
  sequência de traço/retrato/digitação/pilares. Isso não muda — é regra
  inegociável de acessibilidade (PROMPT_CLAUDE_CODE.md, Passo 2, item 8),
  não uma preferência de repetição.

## Seção 2 — Capa (hero)

**Papel**: identificação imediata + primeiro CTA.

- Fundo: `--color-primary-dark` (Azul Profundo — era Terra do Vale na v1;
  hero e rodapé são os dois blocos que a v2 reserva pra esse tom mais
  escuro, ver `docs/marca.md`).
- `min-h-svh`, não `min-h-dvh` nem `min-h-screen`. ⚠ Já foi `min-h-dvh`
  — parecia certo (`dvh` desconta a barra de endereço), mas o cliente
  continuou relatando "tenho que rolar um pouco" mesmo depois de várias
  rodadas de espaçamento mais enxuto. Causa real: `dvh` é *dinâmico* —
  no primeiro paint, antes do navegador "decidir" se a barra de endereço
  vai ficar visível ou recolher, o Safari mobile em particular pode
  calcular `100dvh` como se a barra já estivesse recolhida (valor maior
  que a área realmente visível naquele instante), só corrigindo depois
  de o usuário rolar uma vez — ou seja, o conteúdo nasce um pouco mais
  alto que a tela de verdade, exigindo exatamente aquele "rolar um
  pouco" que o cliente descreveu. `svh` ("small viewport height") é
  estático: sempre assume a barra de navegador totalmente expandida
  (o pior caso, menor área visível possível), sem essa reavaliação
  dinâmica — mais conservador, mas confiável desde o primeiro frame.
  Espaçamento (retrato, margens do H1 e do botão) ficou num meio-termo:
  perto do original, só o suficiente para caber com folga dentro de
  ~550px de altura visível (testado via Playwright) — não precisou do
  corte agressivo tentado antes, porque a causa real nunca foi
  "conteúdo grande demais", era a unidade de altura errada. Não trocar
  de volta para `dvh` sem entender esse timing.
- Camada de fundo: cards de proposta (os seis pilares de
  `docs/referencia.md`, seção 5) flutuando em parallax leve — profundidade
  sutil, opacidade reduzida (~40–60%), nunca competindo com o retrato.
  Movimento contínuo lento (float vertical de poucos px, loop suave), não
  reage a hover para a posição em si — mas passar o mouse (ou focar via
  teclado) mostra a pauta do pilar num tooltip pequeno (pedido do
  cliente: "ao passar o mouse sobre a proposta poderia aparecer uma
  descrição"), ver `components/ui/FloatingPilarTag.tsx`. ⚠ As linhas
  finas conectando o retrato a cada card (`ConnectorLines`) existiram
  numa versão anterior e foram removidas a pedido do cliente — o
  componente foi apagado do repositório, não só escondido.
- **Linha-assinatura** (`PROMPT_LINHA_PROPOSTAS_MOTION.md`, colado
  inteiro pelo cliente): as seis tags acima ganharam uma segunda
  camada, um traço único que nasce na tag "Saúde", passa por todas as
  outras na ordem do prompt (Saúde → Trabalho e renda → Estradas →
  Juventude → Dinheiro público → Mineração) e mergulha no nome
  "THENPERSON DO VALE" — leitura pretendida: essas pautas convergem
  nessa pessoa. Dispara uma vez (`useInView once`, 300ms depois do
  reveal do retrato), nunca em loop; sob `prefers-reduced-motion` pula
  direto para o traço completo com todas as tags acesas (fade de
  200ms, sem percurso).
  - `components/capa/SignatureLine.tsx` + `hooks/useAnchorPoints.ts` +
    `lib/catmull-rom.ts`: o caminho é gerado a partir da posição real
    das tags no DOM (`getBoundingClientRect`, recalculado em
    `ResizeObserver` + `document.fonts.ready`), nunca coordenadas
    fixas — cada ponto de ancoragem é o ponto da própria tag mais
    próximo do ponto anterior (não o centro), pra linha tangenciar a
    borda em vez de atravessar o meio. Convertido pra curva suave com
    Catmull-Rom → Bézier cúbica escrito à mão (pedido do prompt: "sem
    biblioteca extra de path/animação").
  - **Posições das tags redesenhadas**: as seis tags já existiam
    (`FLOAT_POSITIONS`), mas na ordem antiga (mesma ordem de
    `content/pilares.ts`) o caminho ligando-as na ordem do prompt teria
    se cruzado. Reordenado num "ferradura" — sobe pelo lado esquerdo,
    atravessa o topo, desce pelo lado direito, terminando perto do
    nome — mesmas seis posições de tela de antes, só reatribuídas a
    pautas diferentes, verificado visualmente sem cruzamento em
    qualquer largura de tela.
  - **Camadas** (halo desfocado em ciano, rastro em opacidade baixa,
    "minhoca" com cauda que afina, cabeça circular) rodam a partir de
    um único `MotionValue` `progress` (0→1) via `animate()` imperativo
    do Framer Motion, com um patamar de ~160ms em cada tag (mesmo
    valor repetido duas vezes no array de keyframes, em tempos
    diferentes) — trecho de viagem entre tags proporcional à distância
    real percorrida (velocidade constante), não a tempo fixo. Cada tag
    acende (`useMotionValueEvent` comparando `progress` à posição
    normalizada da tag no caminho) no exato frame em que a cabeça
    chega nela.
  - **Só desktop** (`≥1024px`, mesmo breakpoint que já escondia essas
    tags no celular). Uma versão compacta pra `≤420px` (grade 2×2 +
    lista estática pras 2 tags restantes) chegou a ser construída e
    testada, mas junto com o resto do conteúdo da seção estourava o
    orçamento vertical da correção "CTA visível sem rolar" (acima) em
    telas curtas — revertida a pedido do cliente em vez de continuar
    comprimindo. No mobile a seção volta a ser exatamente como era
    antes deste prompt (sem tags, sem linha).
  - ⚠ Bug real descoberto ao ligar animação contínua (`animated`,
    usado pelo `IntroOverlay`) e o pulso de "acender" (`lit`, usado
    aqui) na mesma tag: os dois escrevem no prop `animate` do Framer
    Motion — um objeto simples sobrescrevendo o outro silenciosamente
    se combinados ingenuamente. `FloatingPilarTag.tsx` usa uma única
    `useAnimationControls()` para os dois, cada `useEffect` chamando
    `.start()` na sua própria condição, em vez de dois valores
    concorrentes no mesmo prop.
  - **Ajustes seguintes** (pedido do cliente): o tooltip de descrição
    que aparecia ao passar o mouse sobre uma tag (`description`/hover
    em `FloatingPilarTag.tsx`) foi removido — não tinha mais nenhum
    call site usando depois disso, então o código do tooltip (estado
    `hovered`, `onMouseEnter`/`onFocus` etc.) saiu junto, não só
    escondido. E as tags, que ficavam paradas (`animated={false}`)
    durante toda a cena pra não competir com a linha, agora retomam o
    float suave (mesmo bob do `IntroOverlay`) assim que a linha chega
    no nome — `Capa.tsx` guarda um estado `arrived` (setado dentro do
    callback `onArrive`) e passa `animated={arrived && !prefersReducedMotion}`.
  - **Ponta de flecha** (pedido do cliente: "na ponta da linha que vai
    em direção ao Thenperson deixe ela com uma ponta de flecha com uma
    animação legal ao parar nele") — a cabeça circular que percorre o
    caminho inteiro continua existindo e some no nome como antes (per
    o brief original); a flecha é um elemento novo e separado, fixo no
    ponto de destino (`points[points.length - 1]`, a âncora do nome),
    que **não** dissolve — fica ali, apontando, depois que a cena
    termina. Ângulo calculado uma vez (não a cada frame) a partir da
    tangente real da curva renderizada nos últimos 8px antes do fim
    (`getPointAtLength(total - 8)` → `getPointAtLength(total)`), não da
    linha reta entre os dois últimos pontos de ancoragem — a spline
    Catmull-Rom curva a aproximação, então amostrar a curva de verdade
    é o que mantém a flecha apontando pra onde a linha realmente chega
    visualmente. Animação de "pouso": `useAnimationControls()` próprio
    (`arrowControls`), disparado dentro do mesmo `fireArrival()` que já
    chama `onArrive()` — um pulo com overshoot
    (`scale: [0, 1.5, 0.8, 1.15, 1]`), não uma aparição instantânea.
  - **Corrigido: linha travava ao redimensionar** (relatado pelo
    cliente: "a linha trava toda vez que eu diminuo a tela, se eu volto
    ao tamanho padrao do navegador a linha fica totalmente travada") —
    causa raiz confirmada por reprodução (Playwright, sequência de
    resize cruzando repetidamente os 1024px, imitando um arrasto real
    de borda de janela): o efeito que dispara `animate()` dependia de
    `pathD`, que muda a cada tick de resize (`useAnchorPoints` remede
    via `ResizeObserver`). Um resize caindo dentro da janela de
    `START_DELAY_MS` (300ms) cancelava o `setTimeout` pendente
    (cleanup do efeito) e, ao rodar de novo, batia direto no guard
    `startedRef.current` — armado, mas nunca disparado, para sempre
    (a linha via que "já começou" e nunca tentava de novo, mesmo sem
    ter chamado `animate()` nenhuma vez). Corrigido trocando essa
    dependência por um estado `geometryReady` que só liga uma vez (a
    primeira vez que a geometria é medida) — o efeito de disparo não
    reage mais a cada remedição, só à transição real de "pronto para
    começar"; `buildKeyframes` continua lendo a geometria mais recente
    via ref no momento em que o timer dispara. `animate()` também
    passou a ser parado explicitamente (`controls.stop()`) no cleanup
    do efeito, evitando uma animação órfã rodando em segundo plano se o
    componente desmontar (`isDesktop` cruzando o breakpoint) enquanto
    ela ainda está em voo.
  - **Início condicionado ao fim da Intro** (pedido do cliente: "que a
    animação comece somente se a pessoa pular a intro ou a intro
    terminar de ser exibida") — antes, o disparo dependia só de
    `useInView` na seção da Capa, que fica "em view" desde o primeiro
    frame porque geometricamente a Capa já está no viewport por trás do
    overlay opaco da Intro (`IntroGate` só marca o resto da página
    `inert`, não a esconde do layout) — a linha podia desenhar inteira
    escondida atrás da Intro e, quando ela sumia, já aparecer parada ou
    quase pronta. `IntroGate.tsx` agora expõe um contexto
    (`useIntroReady`, `!showIntro`) consumido por `Capa.tsx` e repassado
    como prop `introReady` pro `SignatureLine` — o efeito de disparo
    exige `isInView && introReady` juntos, então só arma depois que a
    Intro terminou ou foi pulada, nunca antes.
- Retrato do candidato centralizado, flutuando (bob vertical leve, loop
  contínuo — mesma linguagem da camada de pilares), **sem moldura ao
  redor** (pedido do cliente — ver o histórico na Seção 1 acima; o
  componente que desenhava essa borda foi removido do repositório).
  Fonte: `institucional-03.jpg`
  (`docs/referencias/fotos-institucionais/`) com o fundo branco de
  estúdio removido de verdade (canal alfa), gerado nesta implementação e
  salvo como `public/images/institucionais/institucional-03-cutout.webp`.
  O arquivo original em `docs/referencias/` não é alterado — é só uma
  derivação.
- Nome "THENPERSON DO VALE" em Anton/Montserrat, grande, sobreposto na
  parte inferior da foto — tratado como **etiqueta/crachá flutuante**:
  fundo sólido ou com leve blur atrás do texto, cantos levemente
  arredondados. É um eco direto do crachá real visível em
  `fotos-institucionais/institucional-01.jpg` e `-02.jpg` — não é
  decoração aleatória, é uma referência ao objeto real. Sem sombra (ver
  "Raio, borda, elevação" abaixo).
- **Headline com palavra-chave em loop** (pedido do cliente: "no voz
  pode ser várias palavras chaves além de voz, ficar que nem uma
  máquina de escrever... como se fosse num chat") —
  `components/ui/TypewriterWord.tsx`: a última palavra de "O Vale do
  Jequitinhonha precisa de **voz**." cicla por
  `["voz", "representação", "atenção", "prioridade"]` — sinônimos do
  mesmo sentimento já aprovado (`docs/tom-de-voz.md` já define "voz"
  como "representação"), não uma proposta nova. Mesma máquina de
  estados type→hold→delete→pause de `PropostasWatermark.tsx`, só
  ciclando uma lista de palavras em vez de repetir uma string fixa.
  Cursor é uma barra (`<span>` com largura fixa, `animate-blink`
  definido em `globals.css`), não o caractere `|` — um glifo de pipe
  tem bearing de fonte imprevisível, que no `text-h1` (30–48px) deixava
  um espaço visível entre a palavra e o ponto final da frase; a barra
  desenhada por CSS tem largura exata. `aria-hidden` no texto que
  anima + um `sr-only` com a primeira palavra ("voz") por trás — leitor
  de tela ouve a frase de verdade uma vez, não o churn visual de
  digitar/apagar. `prefers-reduced-motion` mostra só a primeira
  palavra, parada (a regra global de `@keyframes blink` em
  `globals.css` já neutraliza o cursor piscando sozinho; o loop
  type/delete em si é JS, então tem sua própria checagem).
  - **Destaque nas palavras-chave** (pedido do cliente: "dê um destaque
    às palavras-chave de 'O Vale do Jequitinhonha precisa de', pode
    mudar de cor") — "Vale do Jequitinhonha" em `--color-accent`
    (Laranja Vale — texto grande e em negrito no `text-h1`, então o
    laranja puro passa mesmo sobre o Azul Profundo do hero, ver
    `docs/marca.md`, Acessibilidade), o resto da frase ("O" / "precisa
    de" / a palavra em loop) continua branco — mesmo tratamento de cor
    que "DO VALE" já recebe na etiqueta do nome logo acima, não uma cor
    nova.
- Um CTA primário (cor `--color-cta`) visível sem precisar rolar —
  aponta para a seção 5 (mobilização), não pede voto.

## Seção 3 — Sobre (trajetória)

**Papel**: humanizar através da história real, na ordem do dossiê.

- Fonte de conteúdo: `docs/referencia.md`, seção 4 "Confirmado" — usar a
  ordem cronológica tal como está lá (origem → BH → automação →
  retorno ao Vale → filha/protesto do caixão → preparação pessoal).
  Não adicionar cena que não esteja no dossiê.
- Mecânica: scroll-linked reveal. Conforme o usuário rola, marcos da
  trajetória entram em sequência; fotos de
  `docs/referencias/fotos-arquivo-pessoal/` entram alternando lado
  esquerdo/direito, uma nova foto a cada marco revelado — a quantidade de
  fotos visíveis cresce com o scroll, nunca todas de uma vez.
- Implementação sugerida: `IntersectionObserver` por marco (ou
  scroll-progress da seção inteira, dependendo da lib de animação
  escolhida no Passo 0) — threshold baixo o suficiente para sentir
  fluido em mobile.
- Texto de cada marco: curto, no tom de `docs/tom-de-voz.md` (gancho →
  fato, sem adjetivo de abertura).

## Seção 4 — Propostas (mapa do Vale)

**Papel**: transformar geografia real em argumento de proposta.

- Fonte de conteúdo: `docs/referencia.md`, seções 5 (pilares) e 7
  (geografia). `content/pilares.ts` continua sendo usado por outras
  seções do site (`Capa.tsx`, `features/intro/IntroOverlay.tsx`,
  `lib/pilar-icons.ts`) mas **não é mais** a fonte de dados do mapa —
  desde a versão atual (ver abaixo), o mapa tem sua própria fonte,
  `components/propostas/data/paradas.ts`, com cidades e eixos próprios
  pedidos em `PROMPT_MAPA_JEQUITINHONHA.md`. As duas listas de pilares
  não são idênticas por design (ver "Conteúdo — eixos e cidades" abaixo)
  — `content/pilares.ts` mantém a nomenclatura original aprovada
  (Mineração, Uso correto de recursos públicos) para as seções que ainda
  a usam; o mapa usa a nomenclatura do prompt (Identidade regional,
  Dinheiro público) com o mesmo conteúdo de fundo.
- **Mapa do Vale — histórico de cinco versões**, todo a pedido do
  cliente. As quatro primeiras (SVG estilizado a partir do desenho atrás
  do nome na logo → contorno traçado à mão a partir de
  `docs/referencias/identidade/vale-jequitinhonha.jpg` com tilt 2D em
  CSS → WebGL de verdade via Three.js/`@react-three/fiber` com o mesmo
  contorno traçado à mão extrudado em `THREE.ExtrudeGeometry` → o mesmo
  WebGL com o contorno trocado pelo `<path>` real de
  nikolasferreira.com.br) foram **inteiramente substituídas**, código e
  dependências (`three`, `@react-three/fiber`, `@react-three/drei`
  removidos do projeto), pelo prompt dedicado `PROMPT_MAPA_JEQUITINHONHA.md`
  colado na íntegra pelo cliente — que pede explicitamente malha oficial
  do IBGE em vez de contorno traçado (à mão ou extraído de outro site) e
  uma mecânica de preenchimento por scroll em vez de órbita 3D livre.
  **Versão atual**, seguindo esse prompt:
  1. **Geometria real do IBGE, gerada uma vez, nunca em runtime**
     (`scripts/gerar-mapa-jequitinhonha.mjs`) — confirma o código da
     mesorregião Jequitinhonha (3103) consultando a API do IBGE antes de
     seguir (o prompt pede essa confirmação explicitamente, "não siga
     adiante com o código errado"), baixa a malha das 5 microrregiões
     (`/api/v3/malhas/mesorregioes/3103`, `intrarregiao=microrregiao`),
     projeta com `d3-geo` (`geoMercator().fitSize(...)` + `geoPath`) e
     salva `components/propostas/data/jequitinhonha.paths.json`
     (viewBox, `d` de cada microrregião + centroide, `x`/`y` de cada
     cidade-parada). O componente só importa esse JSON estático — nunca
     faz fetch. ⚠ A malha do IBGE vem com as rings dos polígonos
     enroladas na direção oposta à que `d3-geo`/RFC 7946 esperam
     (achado nesta sessão, verificado empiricamente com o polígono de
     Almenara); sem corrigir, `geoPath` desenha um retângulo do tamanho
     do canvas inteiro por cima de cada região. O script reenrola cada
     ring (`rewindPolygon`) antes de projetar — comentário no próprio
     script explica o porquê.
  2. **`components/propostas/data/paradas.ts`** — fonte única de verdade
     das 6 paradas (cidade, microrregião, sub-região, lat/lng reais,
     ícone, eixo, título, texto, dado opcional). Coordenadas verificadas
     uma vez via Nominatim/OpenStreetMap e gravadas como dado estático
     (não geocodificadas em runtime). Trocar esse array muda mapa, painel
     e contador sem tocar em componente, como o prompt pede.
  3. **Conteúdo — eixos e cidades**: o prompt trazia uma tabela própria
     (Diamantina/Capelinha/Araçuaí/Itaobim/Pedra Azul/Almenara, eixos
     "Identidade regional" ... "Dinheiro público") que diverge dos 6
     pilares aprovados em `docs/referencia.md` §5 em dois pontos: excluía
     Mineração (alegando que era "tratada em outro lugar do site" — não
     encontrada em nenhum outro componente) e introduzia "Identidade
     regional" como eixo novo, não aprovado. Como o próprio prompt
     instrui ("se algo contradisser, o documento de referência vence —
     me avise"), perguntei ao cliente antes de codar; resposta:
     **seguir a tabela do prompt à risca, mas citar a mineração**. A
     parada de Diamantina ("Identidade regional") ficou com o texto
     aprovado da posição de equilíbrio sobre mineração embutido —
     mesma frase de `docs/referencia.md` §5, sem inventar redação nova
     no tema sensível (`docs/tom-de-voz.md`, "Temas que exigem revisão").
     Os outros 5 eixos mantêm o conteúdo já aprovado, só remapeado para
     as novas cidades-âncora reais do IBGE.
  4. **`components/propostas/MapaJequitinhonha.tsx`** — o SVG: 5
     `<path>` de microrregião (verde escalonado, ver tokens abaixo),
     traçado da rota via `d3-shape` (`line().curve(curveCatmullRom.alpha(0.5))`
     sobre os pontos já projetados das 6 paradas) revelado
     progressivamente por uma `<mask>` cujo `strokeDashoffset` é uma
     `MotionValue` derivada direto do `scrollYProgress` (via
     `useTransform`, sem re-render a cada frame de scroll — só o índice
     de parada ativa, que muda 6 vezes no total, passa por `useState`
     real). Cada ponto de cidade tem 3 estados (futuro/ativo/visitado);
     o estado visitado usa a posição real ao longo do traçado
     (`pathRef.current.getTotalLength()` + `getPointAtLength()` no
     mount, amostrado e comparado ao ponto real da cidade — não o
     índice da parada), para o ponto acender exatamente quando a linha
     desenhada o alcança visualmente, como o prompt pede. Rótulo de
     cidade em `--color-text` com halo (`stroke` claro,
     `paint-order="stroke"`) por trás do texto, para garantir contraste
     mesmo sobre o verde mais escuro, sem depender de qual microrregião
     está por baixo.
  5. **`components/propostas/PropostasScroll.tsx`** — wrapper: container
     alto (`${6 * 80 + 20}vh`, calculado a partir do número real de
     paradas) com painel `sticky`, `useScroll` + `useMotionValueEvent`
     define a parada ativa (`Math.floor(scrollYProgress * n)`), painel
     lateral com `AnimatePresence mode="wait"` e contador "03 / 06 —
     eixo". Abaixo de 1024px (`desktop:hidden`/`hidden desktop:block`,
     mesmo padrão responsivo do Header — os dois layouts convivem no DOM,
     CSS decide qual aparece, sem hook de media query) vira carrossel
     horizontal com `snap-x snap-mandatory`; o mapa reage ao card visível
     via `IntersectionObserver` com `root` apontando pro próprio
     contêiner de scroll horizontal (não a viewport — bug real desta
     sessão: sem isso, todos os cards contam como "visíveis" o tempo
     todo e o mapa nunca atualiza). Clique num ponto do mapa ou seta
     ←/→ com foco num ponto chama a mesma função de navegação nas duas
     versões: no desktop rola a página até a fração certa do contêiner
     (usando `getBoundingClientRect().top + window.scrollY`, não
     `element.offsetTop` — outro bug real: `offsetTop` é relativo ao
     ancestral posicionado mais próximo, que aqui é a própria `<section>`
     com `position: relative`, não o documento); no mobile faz
     `scrollIntoView` no card correspondente.
     - **Mapa mobile: sticky + tamanho proporcional** (dois pedidos do
       cliente). Primeiro: "o mapa podia dar uma levemente acompanhada
       para baixo no celular, porque eu arrasto para o lado as
       propostas e eu não vejo elas acompanharem o mapa" — sem
       `position: sticky`, rolar a página pra alcançar os cards
       (dependendo da altura da tela) já tirava o mapa de vista antes
       de começar a arrastar; agora fica `sticky top-16` (preso logo
       abaixo do header fixo) enquanto o carrossel é percorrido, e solta
       normalmente ao passar da seção inteira (confirmado por scroll
       longo — não fica grudado pra sempre). Segundo: "no breakpoint
       1022 já dá pra diminuir o mapa, porque ele está ficando por de
       trás das propostas" — a altura era fixa em `h-[60vh]`, mas a
       largura crescia com o contêiner; entre ~640px e 1024px (ainda no
       layout mobile — o breakpoint `desktop:` só troca em 1024px) o
       mapa ficava largo o bastante pra sua altura "natural" (a partir
       da proporção do SVG) passar longe de 60vh, cortando o contorno
       pela metade e deixando pouca folga antes dos cards. Trocado
       `h-[60vh]` por `aspect-900/684` (a proporção exata do
       `viewBox` de `jequitinhonha.paths.json`, então o contêiner nunca
       corta o mapa, em nenhuma largura) com `max-w-lg` — limita o
       quanto ele cresce nessa faixa "quase desktop", em vez de inflar
       até a largura toda do contêiner.
- **Referência `nikolasferreira.com.br`**: nesta versão a referência
  deixou de ser só estética — o cliente colou o SVG de produção real do
  mapa de mesorregiões do site (`<path data-name="Jequitinhonha">` etc.),
  que serviu de pista para confirmar que a malha correta viria da mesma
  fonte (IBGE) que o prompt pede diretamente.
- **Clique/toque num ponto → painel lateral, hover/foco → tooltip**
  (pedido original do cliente, mantido): passar o mouse ou focar por
  teclado mostra o nome da cidade acima do ponto; clicar ou apertar
  Enter/Espaço preenche o painel (desktop) ou rola até o card
  (mobile) — mesmo conteúdo dos cards de pilar de antes, badge de
  sub-região, ícone, título, texto, dado, agora dirigido por clique/scroll
  em vez de só scroll.
- Pilar de recursos públicos com ⚠ revisão jurídica pendente (ver
  `docs/referencia.md` §5) exibe o texto normal, sem selo de alerta
  visível ao público — a marcação (`revisaoJuridicaPendente` em
  `paradas.ts`) é só para quem edita o conteúdo antes de publicar.
- **Pin saltitante em Almenara** (pedido do cliente: "quando a pessoa
  parar em Almenara no mapa coloque um ponto pulando em cima
  sinalizando que o Thenperson está lá") — `paradas.ts` ganhou um campo
  `base?: boolean`, `true` só em Almenara (mesma cidade que
  `docs/referencia.md` §7 já cita como base do candidato). Quando essa
  parada fica ativa, um pino (formato de gota, cor `--color-accent`)
  aparece sobre o ponto e balança verticalmente em loop
  (`animate={{y:[...]}}`, `repeat: Infinity`); sob
  `prefers-reduced-motion` fica parado numa posição fixa, sem saltar. O
  `aria-label` do ponto (e a lista `sr-only`) ganham o sufixo "· base do
  candidato" nessa parada, pra quem usa leitor de tela receber o mesmo
  sinal.
- **Clicar numa cidade avança a parada** (pedido do cliente: "permita
  também clicar nas cidades para avançar no click") — já existia
  (`onClick` no `<g role="button">` de cada ponto → rola a página até a
  fração certa da parada, no desktop, ou centraliza o card
  correspondente, no mobile), mas o alvo de toque era só o círculo
  visível (6–9px de raio — pequeno demais pra dedo). Aumentado com um
  círculo invisível de raio maior (`fill="transparent"`, não `"none"` —
  precisa ser "pintado" pra contar no hit-test de clique/toque do SVG)
  por cima do mesmo ponto. No carrossel mobile, os cards em si também
  viraram `<button>` clicável (antes só reagiam a scroll/swipe) — tocar
  num card centraliza ele e atualiza o mapa, sem precisar mirar no ponto
  minúsculo do SVG.
- Cursor personalizado sobre o mapa: ver seção "Cursor personalizado"
  mais abaixo — não é restrito ao mapa, cobre o site inteiro.
- **`prefers-reduced-motion`**: desliga a animação de desenho da rota
  (o `dashOffset` fica fixo em 0 — traçado sempre completo) e a pulsação
  do ponto ativo; a troca de destaque entre paradas continua acontecendo
  (é resposta a scroll/clique do próprio usuário, não autoplay), como o
  prompt pede — "mostra o traçado completo e apenas troca o destaque da
  parada ativa, sem movimento".
- **Número eleitoral como marca d'água** (pedido do cliente: "coloque o
  número eleitoral em outro lugar, pode colocar como background na
  parte de proposta, um tom sobre tom bem grande") — saiu do header e do
  rodapé (onde vivia antes), agora é só um número gigante (fonte Anton)
  no canto superior direito do fundo da seção, cor `--color-border`
  (mesmo tom "um degrau abaixo do branco" que docs/marca.md já reserva
  para esse fundo — não é cor nova). `aria-hidden`, porque é
  decorativo/redundante: o mesmo número continua legível de verdade num
  badge logo abaixo do texto de abertura da seção, pra não depender só
  da marca d'água pra transmitir a informação. Tamanho e posição
  divergem por breakpoint (ver histórico de correções abaixo — a versão
  mobile foi revisada de novo depois da terceira correção): mobile
  ancorado no topo do wrapper (`top-0`) com `clamp(100px, 38vw, 320px)`
  — cresce com a largura da tela até preencher praticamente toda ela;
  `tablet:` (≥640px) mantém o comportamento centralizado verticalmente
  (`top-1/2 -translate-y-1/2`) com `clamp(160px, 34vw, 460px)`, herdado
  da terceira correção sem mudança. O mínimo de 160px aplicado a
  **todas** as telas (pedido original) deixava o número (5 dígitos,
  "70333") quase ilegível no celular: 160px é maior que a largura útil
  de boa parte dos telefones, então cada dígito só aparecia como um
  fragmento de curva cortado pelo `overflow-hidden`, não como número
  reconhecível ("quase não aparece", relatado pelo cliente) — corrigido
  baixando o mínimo só na faixa mobile.
  ⚠ O recorte (`overflow-hidden`) que impede o número de vazar da tela
  fica só no wrapper do cabeçalho da seção, nunca na `<section>` inteira
  — `position: sticky` (usado pelo mapa, acima) para de funcionar se
  qualquer ancestral tiver `overflow` diferente de `visible`. Já quebrou
  o mapa (parou de grudar no topo) antes desse ajuste.
  - **Correção seguinte** (pedido do cliente: "o número eleitoral como
    background dele sumiu para mobile, eu gostaria que aparecesse") — a
    redução de tamanho acima resolveu a ilegibilidade mas criou um novo
    problema: o offset `-top-16` (-64px) que puxa o número pra fora do
    próprio wrapper foi calibrado pro número GRANDE original (onde 64px
    é uma fração pequena da altura total, ~300–600px) — aplicado ao
    número pequeno novo (~56–160px de altura), a mesma distância fixa
    empurrava quase o bloco inteiro pra cima da borda de corte do
    `overflow-hidden`, deixando só uma lasca de ~15% visível (medido:
    14px de 78px). Corrigido com `-top-2` no mobile (efêmero — ver
    correção seguinte).
  - **Terceira correção** (pedido do cliente: "o número eleitoral que
    está sendo feito de background está quebrando a página") —
    investigado a fundo: **não havia overflow horizontal real** (medido
    `document.documentElement.scrollWidth` em várias larguras — nunca
    excedeu `clientWidth` durante scroll natural/gradual; a única vez
    que apareceu um overflow de 12px foi com salto instantâneo de
    scroll, causado por uma foto de `MilestoneRow.tsx` presa no estado
    `initial` da animação — artefato de teste, não bug real, não
    relacionado a este componente). O problema de verdade era outro: com
    `-top-2`, o número ficava colado na borda SUPERIOR do wrapper —
    numa seção com ~380px de altura no mobile, isso deixava o número
    visível só nos primeiros ~100px de scroll dentro da seção (medido:
    caía a 0px de área visível já em +150px de scroll), uma janela
    estreita demais pra aparecer de forma confiável durante scroll
    normal — o suficiente pra parecer "quebrado" mesmo sem overflow
    técnico. Trocado o posicionamento inteiro: em vez de ancorar no
    topo do wrapper com offset calibrado por breakpoint (frágil, dois
    ajustes seguidos não resolveram de vez), agora centraliza
    verticalmente (`top-1/2 -translate-y-1/2`) — mesma regra em
    qualquer largura, sem offset mágico por breakpoint, e a área
    visível passa a acompanhar o quanto do wrapper está em tela, não só
    uma fatia fina no topo. Medido depois do ajuste: 100% do número
    dentro da área de corte do wrapper (mobile) durante toda a
    passagem natural pela seção.
  - **Quarta correção, só mobile** (pedido do cliente: "o numero
    eleitoral para celular pode deixar no topo da seção de propostas,
    cubrindo todo espaço necessario e que exista em relação a largura")
    — pedido oposto ao da terceira correção, desta vez explicitamente
    restrito ao celular: `tablet:` (onde a terceira correção já
    funcionava bem, confirmado visualmente) foi mantido intacto. Só a
    regra *sem* prefixo (mobile) voltou a ancorar no topo (`top-0`, sem
    o `-top-2`/offset negativo que causou a quebra original — desta vez
    o wrapper tem altura de sobra porque o número também cresceu) e o
    tamanho subiu de `clamp(56px, 20vw, 160px)` para
    `clamp(100px, 38vw, 320px)`, grande o suficiente para a largura do
    número (5 dígitos) se aproximar da largura útil da tela em vez de
    ficar pequeno no meio do fundo. Testado via screenshot em 375/390/
    414/430px (larguras reais de celular) — número legível, cobrindo a
    largura, sem cortar de forma ilegível; `overflow-hidden` do wrapper
    ainda garante que nenhum salto horizontal escape para o resto da
    página.
  - **Loop de "máquina de escrever"** (pedido do cliente: "o 70333 pode
    ficar indo e voltando digitando em loop no background") —
    `features/vale-map/PropostasWatermark.tsx`: digita o número
    caractere a caractere, segura um instante completo, apaga caractere
    a caractere, segura um instante vazio, digita de novo — looping
    infinito, com um cursor `|` piscando junto. Sob
    `prefers-reduced-motion` mostra o número completo, parado, sem loop
    (mesma regra de toda animação do site).

## Seção 5 — Quer saber mais?

**Papel**: CTA final de mobilização.

- Fundo escuro (`--color-primary` — Azul Vale, o fundo padrão de seção
  escura que não é hero nem rodapé). ⚠ Migração v2: era
  `--color-bg-dark` (Terra) ou `--color-bg-dark-alt` (Grafite quente),
  os dois eliminados — esta seção não é hero nem rodapé, então não
  herda o Azul Profundo dos dois.
- Dois CTAs: grupo de WhatsApp e Instagram — o candidato não tem canal
  de Telegram, então o segundo CTA nunca foi Telegram de fato (era só o
  rótulo genérico enquanto os links reais não tinham chegado).
- Ambos com link real confirmado (`docs/referencia.md`, seção 4,
  Confirmado) — `content/cta-links.ts`. `CtaButton`
  (`components/ui/CtaButton.tsx`) ainda sabe renderizar um estado "em
  breve" (`href: null` → botão visualmente completo, `aria-disabled`,
  sem destino) para qualquer canal futuro sem link confirmado.
- **Botão magnético do WhatsApp** (pedido do cliente, a partir de uma
  especificação de um componente "Magnetic Hover Button", "mantendo as
  cores originais") — `components/ui/MagneticButton.tsx`, só no CTA de
  WhatsApp (Instagram continua `CtaButton` normal). Dois efeitos:
  1. O botão é puxado na direção do cursor um pouco antes de ser tocado
     (campo magnético de ~90px de raio, força limitada) — `useMotionValue`
     + `useSpring` do motion, sobre `mousemove` do `window`.
  2. Uma cor entra em "varredura" a partir do ponto exato onde o cursor
     entrou no botão (`clip-path: circle()` animado), trocando o texto
     de cor junto.
  Cores mantidas as originais do botão (pedido do cliente): fundo laranja
  em repouso continua `--color-cta`/texto grafite; a varredura usa
  `--color-cta-hover` (o mesmo laranja escuro já usado como hover em
  todo o site) com texto branco — "Branco sobre Laranja Queimado" é a
  combinação com AA sancionada em docs/marca.md para esse fundo
  específico (a variante grafite não está tabelada pra esse tom mais
  escuro). Sob `prefers-reduced-motion`: sem ímã (nunca se move) e a cor
  troca instantânea, sem a varredura animada.

## Rodapé

⚠ Não fazia parte das 5 seções originais — mesma origem do header
(`components/layout/Footer.tsx`).

- Fundo Azul Profundo (`--color-primary-dark` — era Terra na v1; mesma
  regra do hero, ver Seção 2 acima), logo mono branca do candidato +
  nome/cargo à esquerda; logo mono branca do Avante + rótulo "Filiação"
  à direita. Número eleitoral **não fica mais aqui** — pedido do
  cliente ("coloque o número eleitoral em outro lugar"), agora vive só
  na seção Propostas (ver Seção 4 acima).
- A logo do Avante é um link para o site oficial do partido
  (`https://avante70.org.br/`, `target="_blank"`, `rel="noopener
  noreferrer"`) — pedido do cliente.
- **Linha de copyright com ano automático** (pedido do cliente: "a data
  do copyright deixe de forma automática") — `© {new
  Date().getFullYear()} Thenperson do Vale. Todos os direitos
  reservados.`, calculado em tempo de render, nunca um ano fixo escrito
  no código (senão vira tarefa manual todo ano-novo).
- **Crédito da agência** (pedido do cliente: "coloque no footer que o
  site foi gerado pela UAIdea Agência") — linha própria abaixo da faixa
  de copyright, "Site desenvolvido por UAIdea Agência · Instagram", os
  dois como link (`https://uaidea-agencia.vercel.app/` e
  `https://www.instagram.com/uaidea.agencia/`, `target="_blank"`,
  `rel="noopener noreferrer"`, ambos do próprio pedido do cliente).
  Texto discreto (`text-inverse/40`, mais apagado que as outras duas
  linhas do rodapé) — é crédito de produção, não informação da
  campanha, não deve competir visualmente com o resto do rodapé.

## Favicon

⚠ Proposta técnica — pedido do cliente ("o favicon.ico pode ser um T
laranja com esse fundo da página"). `app/icon.png` (convenção de
metadata do Next.js App Router): um "T" (`--color-accent`, Laranja
Vale) sobre o Azul Profundo (`--color-primary-dark`) — mesma dupla de
cores do header/rodapé, sem depender de nenhuma fonte instalada
(desenhado como duas barras sólidas com cantos levemente arredondados,
gerado via `sharp` a partir de um SVG simples, 512×512px). ⚠ Migração
v2: era laranja sobre Terra do Vale (`--color-primary`/`--color-bg-dark`
na v1) — regenerado nesta migração com os mesmos dois retângulos, só
trocando os hex.

## Raio, borda, elevação

⚠ Proposta técnica — não definida no manual de marca.
- Raio: 4px em cards e inputs, 999px (pill) em botões e badges/tags —
  ecoa o formato das caixas de texto já usadas nas artes de campanha
  (`docs/referencias/artes-campanha/`).
- Sombra: token `--shadow-floating` disponível para elementos flutuantes
  sobre fundo claro ou foto — nunca em cards sobre fundo claro liso, onde
  a borda (`--color-border`) já resolve a separação. A etiqueta de nome
  (crachá "THENPERSON DO VALE", Capa e Intro) **não usa mais sombra** —
  pedido do cliente, sobre o fundo escuro (já escuro, terra na v1, azul
  na v2) ela só sujava o contorno em vez de separar a peça.

## Gradiente

⚠ Proposta técnica. Uso permitido: transição sutil entre `--color-primary-dark`
e preto puro no topo/base da Intro e da Capa, para dar profundidade ao
fundo por trás do retrato. Nunca gradiente laranja→ciano direto — as
artes de campanha usam essas cores em blocos sólidos adjacentes, não
misturadas.

## Links

⚠ Proposta técnica — pedido do cliente ("substitua toda tag a por tag
Link do next"). Todo link do site — âncora interna (`#sobre`), externa
(WhatsApp, Instagram, site do Avante) ou dentro de um botão reutilizável
(`Button`, `CtaButton`, `MagneticButton`) — usa `<Link>` de `next/link`,
nunca `<a>` puro. `Link` já renderiza um `<a>` por baixo e aceita
`target`/`rel` normalmente, então links externos continuam abrindo em
nova aba com `rel="noopener noreferrer"` do mesmo jeito.

## Ícones

⚠ Proposta técnica. Uma biblioteca única (ex. Lucide, já compatível com
React/Vue) — nunca duas bibliotecas de ícone no mesmo projeto. Peso de
traço médio (não hairline, não bold extremo) para combinar com o peso
alto da Montserrat/Anton.

Exceção pontual: `lucide-react` não tem ícones de marca (removidos da
biblioteca — Instagram, Facebook etc.). O ícone do CTA de Instagram
(Seção 5) é um SVG avulso desenhado à mão no mesmo traço do Lucide
(`components/icons/InstagramIcon.tsx`) — não é uma segunda biblioteca,
só um ícone que a biblioteca escolhida não oferece.

## Direção fotográfica

⚠ Proposta técnica, baseada no banco de fotos real já disponível — não é
recomendação de estilo genérico, é catalogação do que existe:

1. **Retrato de estúdio** (`fotos-institucionais/institucional-01.jpg`
   a `-03.jpg`) — fundo neutro, camiseta preta, braços cruzados ou
   apontando para a câmera. Uso: Capa, Intro, cards de proposta se
   precisar de rosto pequeno. `institucional-03.jpg` tem uma versão
   derivada com o fundo removido
   (`public/images/institucionais/institucional-03-cutout.webp`) usada
   na Intro, na Capa e no avatar do marcador final do mapa (seção
   Propostas) — ver Seção 1, Seção 2 e Seção 4 acima.
2. **Documental institucional** (`institucional-04.jpg` a `-09.jpg`) —
   Assembleia Legislativa, tribuna, crachá visível, luz ambiente do
   plenário. Uso: seção Sobre, trecho final da trajetória (chegada à
   vida pública).
3. **Arquivo pessoal** (`fotos-arquivo-pessoal/arquivo-pessoal-01.jpg` a
   `-07.jpg`) — trabalho de automação, viagens, trabalho na roça, retrato
   casual. Uso: seção Sobre, trechos iniciais da trajetória (antes da
   vida pública).

Tratamento sugerido para consistência entre as três origens (câmeras e
luzes diferentes): saturação levemente reduzida, sem filtro que achate
contraste — o material já é de alto contraste por natureza (ver análise
de cor em `docs/marca.md`). ⚠ Migração v2: a v1 pedia temperatura
puxando para quente, pra combinar com o fundo terra
(`--color-bg-dark`, eliminado). Com a base azul, o PDF v2 inverte essa
regra: fotos devem ir para o frio, com sombras levemente azuladas, para
não brigar com `--color-primary`/`--color-primary-dark` — vale
principalmente para as fotos de estúdio com fundo neutro (Seção 1 e 2
acima). Ainda não reprocessado nos assets já usados no site; registrado
aqui para a próxima passada de tratamento de imagem.
