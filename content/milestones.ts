export type MilestonePhoto = {
  src: string;
  alt: string;
  source: "arquivo-pessoal" | "institucional";
};

export type Milestone = {
  id: string;
  eyebrow: string;
  quote?: string;
  text: string;
  photos: MilestonePhoto[];
};

export const milestones: Milestone[] = [
  {
    id: "origem",
    eyebrow: "Origem",
    quote: "Eu vendia cartão telefônico com 8 anos de idade.",
    text: "Nasceu em Santo Antônio do Jacinto, perto de Almenara. Aos 8 anos, a família se mudou para Belo Horizonte — duas famílias dividindo uma casa de dois cômodos. Foi camelô desde criança.",
    photos: [],
  },
  {
    id: "automacao",
    eyebrow: "Trajetória profissional",
    text: "Doze anos como técnico de automação. Passou por cerca de nove estados brasileiros atrás de trabalho.",
    photos: [
      {
        src: "/images/arquivo-pessoal/arquivo-pessoal-04.jpg",
        alt: "Thenperson, de capacete, mexendo em um painel elétrico durante trabalho como técnico de automação.",
        source: "arquivo-pessoal",
      },
      {
        src: "/images/arquivo-pessoal/arquivo-pessoal-02.jpg",
        alt: "Foto de arquivo pessoal em viagem de trabalho, junto ao letreiro da cidade de Macapá (AP).",
        source: "arquivo-pessoal",
      },
      {
        src: "/images/arquivo-pessoal/arquivo-pessoal-03.jpg",
        alt: "Thenperson em complexo industrial de mineração, durante período de trabalho fora do Vale, com cordão de identificação no pescoço.",
        source: "arquivo-pessoal",
      },
            {
        src: "/images/arquivo-pessoal/arquivo-pessoal-01.jpg",
        alt: "Thenperson em complexo industrial de mineração, durante período de trabalho fora do Vale, com cordão de identificação no pescoço, junto com 2 amigos.",
        source: "arquivo-pessoal",
      },
    ],
  },
  {
    id: "retorno",
    eyebrow: "Retorno ao Vale",
    text: "Ao saber que seria pai, recusou o apartamento pronto que a sogra oferecia. Voltou para Almenara com a esposa grávida e 18 caixas de mercadoria, para recomeçar do zero.",
    photos: [
      {
        src: "/images/arquivo-pessoal/arquivo-pessoal-06.jpg",
        alt: "Vista aérea do Vale do Jequitinhonha, com o rio cortando a cidade ao entardecer.",
        source: "arquivo-pessoal",
      },
    ],
  },
  {
    id: "origem-politica",
    eyebrow: "Origem do desejo político",
    text: 'Uma das filhas foi diagnosticada com câncer aos 2 anos. Foi por essa mesma época — não por causa disso, mas porque passou a acreditar em Deus — que deixou de ser ateu. Durante a pandemia, pediu apoio ao comércio local e foi ignorado pelo prefeito. Protestou sozinho, carregando um caixão nas costas com a frase "futuro do comércio". O vídeo viralizou na região.',
    photos: [],
  },
  {
    id: "preparacao",
    eyebrow: "Preparação pessoal",
    quote: "Eu não estava pronto — e eu sabia disso.",
    text: "Parou de beber. Passou a ler e aprendeu inglês antes de formalizar a candidatura.",
    photos: [
      {
        src: "/images/arquivo-pessoal/arquivo-pessoal-05.jpg",
        alt: "Thenperson sorrindo, de chapéu de palha, durante trabalho na roça.",
        source: "arquivo-pessoal",
      },
      {
        src: "/images/arquivo-pessoal/arquivo-pessoal-07.jpg",
        alt: "Thenperson em momento de lazer, com raquete de tênis, em quadra ao ar livre.",
        source: "arquivo-pessoal",
      },
    ],
  },
  {
    id: "hoje",
    eyebrow: "Hoje",
    text: "Candidato a Deputado Estadual por Minas Gerais pelo Avante — 70. Leva a voz do Vale do Jequitinhonha para dentro da Assembleia Legislativa.",
    photos: [
      {
        src: "/images/institucionais/institucional-06.jpg",
        alt: "Thenperson discursando ao microfone em tribuna, crachá do Avante 70 a tiracolo.",
        source: "institucional",
      },
      {
        src: "/images/institucionais/institucional-09.jpg",
        alt: "Thenperson discursando ao microfone em tribuna, visto de perfil, crachá do Avante 70 a tiracolo.",
        source: "institucional",
      },
    ],
  },
];
