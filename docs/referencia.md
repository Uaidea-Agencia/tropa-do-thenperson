# Thenperson do Vale — Referência

Este documento tem duas funções: (1) catalogar os arquivos originais em
`docs/referencias/`, dizendo o que cada um é e para que serve; (2)
sintetizar, sem inventar nada além do que já está aprovado pelo cliente,
o que se sabe sobre o candidato e a campanha. Tudo aqui vem de material
já produzido pela UAIdea — nada foi criado para este documento.

⚠ **Confidencial.** O material de origem
(`docs/referencias/estrategia/analise-estrategica-conteudo.pdf`) é
marcado pela própria UAIdea como "uso interno da agência e do cliente".
Trate este arquivo e este documento com o mesmo cuidado — não publicar,
não expor fora do repositório do projeto.

---

## 1. O que foi excluído deste kit

`Exemplo_modelo_para_Thenperson_cliente.pdf` **não** foi incluído em
`docs/referencias/`. É a proposta comercial que a UAIdea usa para
apresentar o próprio serviço ao cliente — não é material de marca, de
conteúdo aprovado ou de referência de produto. Incluí-lo misturaria
material de vendas da agência com fonte de verdade do site.

## 2. Nota sobre grafia do nome

O documento de análise estratégica usa a grafia **"Temperson"** em todo o
texto (provável erro de digitação recorrente). A logo oficial, todas as
artes de campanha e o próprio cliente usam **"Thenperson"** — com H. Use
sempre **"Thenperson do Vale"**; a grafia "Temperson" não aparece em
nenhuma peça de marca aprovada.

---

## 3. Catálogo de `docs/referencias/`

### `identidade/`
| Arquivo | O que é | Uso |
|---|---|---|
| `logo-thenperson-do-vale.png` | Logo oficial do candidato, fundo terra | Fonte de verdade do logotipo. Não recriar, não recolorir. |
| `logo-avante70.png` | Logo oficial do partido Avante (versão colorida, fundo branco sólido) | Substituída no site pelas variantes abaixo, que têm transparência de verdade. |
| `avante_colorido_sem_fundo_4000px.png`, `avante_mono_branco_4000px.png`, `avante_mono_preto_4000px.png`, `avante_mono_laranja_4000px.png`, `avante_mono_branco_prova_fundo_escuro.png` | Kit oficial de variantes do Avante (colorida e monocromáticas, alta resolução, com canal alfa exceto a "prova") | Ver `docs/marca.md`, seção Logo > Avante, para o mapeamento de qual variante usar em qual fundo. |
| `manual-marca-cor-tipografia.pdf` | Manual de cor e tipografia já entregue pela UAIdea | Fonte primária de `docs/marca.md` — este PDF é a lei; `marca.md` é a versão extraída para código. |
| `vale-jequitinhonha.jpg` | Mapa oficial da mesorregião do Jequitinhonha (área verde = território do Vale, município por município), enviado pelo cliente como referência geográfica real | Fonte do contorno usado no mapa da seção Propostas (`features/vale-map/ValeMapSvg.tsx`) — ver `docs/ui-web.md`, Seção 4. |

### `artes-campanha/`
| Arquivo | O que é | Uso |
|---|---|---|
| `stories-faltam-51-dias.jpg` a `-54-dias.jpg` | Stories de contagem regressiva já publicados (semana de 11–14/08) | Referência de tom visual e de voz — não copiar layout, extrair princípio (ver `ui-web.md` e `tom-de-voz.md`). |
| `planejamento-sequencia-stories-semana2.jpg` | Print do planejamento interno da UAIdea para essa sequência | Contexto de calendário, não é peça final. |

### `fotos-institucionais/` (`institucional-01.jpg` a `-09.jpg`)
Dois registros distintos, real: (a) retratos em estúdio, fundo neutro,
camiseta preta, corpo cortado (bom material para a etiqueta flutuante da
Capa); (b) fotos documentais na Assembleia Legislativa — discursando em
tribuna, caminhando pelo plenário, crachá de visitante visível. Este
segundo grupo é a referência real do crachá que a Capa deve ecoar.

### `fotos-arquivo-pessoal/` (`arquivo-pessoal-01.jpg` a `-07.jpg`)
Banco de fotos pessoais mencionado como pendente no dossiê original e que
**já está disponível**: trabalho como técnico de automação (painel
elétrico, capacete), viagens a outros estados, trabalho na roça
(chapéu de palha, foice), paisagem do Vale. É a fonte visual real para a
seção Sobre — não precisa de banco de imagem genérico.

### `estrategia/`
| Arquivo | O que é |
|---|---|
| `analise-estrategica-conteudo.pdf` | Análise estratégica de conteúdo da UAIdea (versão enxuta, 19 páginas, agosto/2026) — biografia extraída de entrevistas, pilares de conteúdo, banco de ideias, perguntas pendentes. **Fonte de tudo na seção 4 abaixo.** |

---

## 4. Dossiê do candidato (extraído do material aprovado)

Fonte: `estrategia/analise-estrategica-conteudo.pdf`, síntese da UAIdea
a partir de duas entrevistas de alinhamento com o pré-candidato.

### Confirmado

- **Nome de campanha**: Thenperson do Vale.
- **Status**: pré-candidato a Deputado Estadual por Minas Gerais.
- **Partido**: Avante — 70 (conforme brief de direção de arte do
  projeto; o dossiê estratégico registra isso como pendente na época em
  que foi escrito, mas já foi confirmado depois).
- **Região**: Vale do Jequitinhonha, base em Almenara.
- **Origem**: nasceu em Santo Antônio do Jacinto (perto de Almenara).
  Mudou-se para Belo Horizonte aos 8 anos; viveu em situação de pobreza
  (duas famílias dividindo casa de dois cômodos); trabalhou como camelô
  desde criança.
- **Trajetória profissional**: 12 anos como técnico de automação, morou
  em cerca de 9 estados brasileiros.
- **Retorno ao Vale**: ao saber que seria pai, recusou apartamento pronto
  da sogra e se mudou com a esposa grávida para Almenara com 18 caixas
  de mercadoria, para recomeçar do zero.
- **Origem do desejo político**: filha diagnosticada com câncer aos 2
  anos. Foi por essa mesma época — não por causa disso, mas porque
  passou a acreditar em Deus — que deixou de ser ateu. Durante a
  pandemia, ignorado
  pelo prefeito ao pedir apoio ao comércio local, protestou sozinho
  carregando um caixão nas costas com a frase "futuro do comércio" — o
  vídeo viralizou localmente.
- **Preparação pessoal**: parou de beber e de usar drogas, passou a ler e
  aprendeu inglês antes de formalizar a candidatura.
- **Viabilização da candidatura**: aliança com uma liderança política de
  Almenara, que assumiu os custos de campanha. ⚠ **Não publicizar
  detalhes desta negociação** — recomendação explícita do dossiê
  original.
- **Personalidade de comunicação**: direto, autocrítico, valoriza
  resultado sobre aparência ("festa não muda a vida de ninguém"), aberto
  a formatos ousados.
- **Formato prioritário de conteúdo**: vídeo — o próprio candidato já
  identificou vídeo como o mais importante de todos os formatos.
- **Número eleitoral**: 70333 (partido Avante, número 70).
- **CNPJ do Avante**: 68.491.694/0001-40. Exibido no rodapé do site
  (`components/layout/Footer.tsx`), no bloco de créditos legais junto
  do nome do partido.
- **Canais de mobilização confirmados**: grupo do WhatsApp
  (`https://chat.whatsapp.com/E37S9PNOadYCo0CmB9MrKz?s=cl&p=i&mlu=4&amv=0`) e Instagram
  (`https://www.instagram.com/thenperson/`). O candidato **não tem**
  canal de Telegram — o segundo CTA do site é o Instagram, não um canal
  de Telegram inexistente (ver item correspondente removido da lista de
  pendências abaixo).

### Pendente — não usar até confirmação

Copiado literalmente da seção "Perguntas Pendentes" do dossiê original:

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

---

## 5. Pilares de conteúdo (já aprovados, usar como propostas do site)

Estes seis pilares vêm do documento estratégico e sustentam a seção
Propostas. São pautas/direções, não promessas de obra fechada — o dossiê
é explícito sobre isso ("proposta do hospital regional... sem prometer
prazo ou obra fechada").

| Pilar | Proposta / pauta | Dado de apoio | Cuidado |
|---|---|---|---|
| Saúde | Hospital regional | Saúde foi a resposta mais citada em enquete no Instagram do próprio candidato; exemplo usado: até 700 km para uma consulta | Nenhum — prioridade máxima, dado validado pelo público |
| Trabalho e economia | Cooperativas, feiras, CEASA, incentivo à produção local | Maior empregador do Vale são as prefeituras — gera dependência política | Nenhum |
| Infraestrutura | BR-367 como aposta de conexão logística | Apenas 520 km de estrada asfaltada na região | Explicar o limite de atuação de um deputado estadual sobre rodovia federal |
| Juventude | Retenção de jovens na região | Êxodo aos 15–16 anos por falta de oportunidade; motivação pessoal (filhas do candidato) | Falar da motivação sem expor as filhas |
| Uso correto de recursos públicos | Fiscalização de emendas parlamentares | Relato de que nenhum deputado historicamente destinou parte relevante dos R$ 120 milhões em emenda ao Vale | ⚠ **Requer revisão jurídica antes de publicar** — dado sensível |
| Mineração | Posição de equilíbrio — não contra a mineração, contra o modelo atual de contrapartidas | — | ⚠ Tema sensível, tratar com cautela, evitar tom de ataque |

## 6. Reposicionamento regional (usar como argumento central, não como estética)

O material não sustenta "mineiridade" genérica (sotaque, comida típica,
folclore). Sustenta algo mais específico: a distância real entre o Vale
e o Minas Gerais desenvolvido (BH, Triângulo, Zona da Mata). O candidato
rejeita explicitamente o rótulo de "vale da pobreza" / "vale da miséria"
— pode citar a expressão para desconstruí-la ("chega de nos chamarem de
vale da miséria"), nunca como descrição própria da região. Ver
`tom-de-voz.md`, seção Vocabulário.

## 7. Geografia do Vale (para a mecânica de preenchimento do mapa)

Dado público (IBGE/mesorregiões), não é conteúdo de campanha — usar como
base factual da seção Propostas:

O Vale do Jequitinhonha é uma mesorregião de Minas Gerais dividida em
três sub-regiões, dispostas ao longo do rio, de nascente a foz:

1. **Alto Jequitinhonha** — extremo oeste, região de Diamantina.
2. **Médio Jequitinhonha** — região central, em torno de Araçuaí.
3. **Baixo Jequitinhonha** — extremo leste, região de Almenara, na
   divisa com a Bahia — **onde fica a base do candidato** (Almenara e
   Santo Antônio do Jacinto).

Para a mecânica de preenchimento "de uma ponta a outra": faz sentido
narrativo começar o preenchimento pelo Baixo Jequitinhonha (base real do
candidato) e avançar até o Alto Jequitinhonha, e não o contrário —
reforça que ele fala de dentro da região, não de fora olhando para
dentro. ⚠ Lista exata de municípios a exibir no mapa (a região tem entre
51 e 80 municípios dependendo da classificação usada) ainda não foi
definida — usar as três sub-regiões como âncora e confirmar com o
cliente quais municípios específicos nomear.

## 8. Reels e ganchos já roteirizados (não usar no site sem adaptação)

O dossiê inclui 8 roteiros de Reels prontos ("Eu vendia cartão telefônico
com 8 anos de idade", "Eu saí sozinho com um caixão nas costas", etc.).
São roteiros de vídeo para redes sociais, não copy de site — mas as
frases-gancho são fonte real de tom de voz (ver `tom-de-voz.md`). Se
algum vídeo desses for produzido, o site pode embedar o resultado na
seção Sobre.
