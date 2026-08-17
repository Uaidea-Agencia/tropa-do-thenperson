import type { PilarIcon } from "@/content/pilares";

export type SubRegiao = "alto" | "medio" | "baixo";

export type Parada = {
  slug: string;
  cidade: string;
  microrregiao: string;
  subRegiao: SubRegiao;
  lat: number;
  lng: number;
  icon: PilarIcon;
  eixo: string;
  titulo: string;
  texto: string;
  dado?: string;
  revisaoJuridicaPendente?: boolean;
  base?: boolean;
};

export const SUB_REGIAO_LABEL: Record<SubRegiao, string> = {
  alto: "Alto Jequitinhonha",
  medio: "Médio Jequitinhonha",
  baixo: "Baixo Jequitinhonha",
};

export const paradas: Parada[] = [
  {
    slug: "diamantina",
    cidade: "Diamantina",
    microrregiao: "Diamantina",
    subRegiao: "alto",
    lat: -18.2440862,
    lng: -43.6006487,
    icon: "mountain",
    eixo: "Identidade regional",
    titulo: "O Vale não é pobre, é mal representado",
    texto:
      "Chega de nos chamarem de vale da miséria — aqui tem gente trabalhando todo dia. Isso vale também para a mineração: não somos contra, somos contra o modelo atual de contrapartidas para a região.",
  },
  {
    slug: "capelinha",
    cidade: "Capelinha",
    microrregiao: "Capelinha",
    subRegiao: "alto",
    lat: -17.6938890,
    lng: -42.5186110,
    icon: "briefcase",
    eixo: "Trabalho e economia",
    titulo: "Trabalho e economia",
    texto: "Cooperativas, feiras, CEASA e incentivo à produção local — para o emprego não depender da prefeitura.",
    dado: "O maior empregador do Vale hoje são as prefeituras — o que cria dependência política em vez de economia própria.",
  },
  {
    slug: "aracuai",
    cidade: "Araçuaí",
    microrregiao: "Araçuaí",
    subRegiao: "medio",
    lat: -16.8484451,
    lng: -42.0661868,
    icon: "hospital",
    eixo: "Saúde",
    titulo: "Hospital regional para o Vale do Jequitinhonha",
    texto: "Saúde foi a pauta mais citada numa enquete no Instagram do próprio candidato.",
    dado: "Hoje é comum precisar viajar até 700 km para uma consulta.",
  },
  {
    slug: "itaobim",
    cidade: "Itaobim",
    microrregiao: "Pedra Azul",
    subRegiao: "medio",
    lat: -16.5614934,
    lng: -41.5022750,
    icon: "route",
    eixo: "Infraestrutura",
    titulo: "BR-367 como aposta de conexão logística",
    texto:
      "Rodovia federal tem limite de atuação para um deputado estadual — a pauta é levar a demanda adiante.",
    dado: "Apenas 520 km de estrada asfaltada em toda a região.",
  },
  {
    slug: "pedra-azul",
    cidade: "Pedra Azul",
    microrregiao: "Pedra Azul",
    subRegiao: "baixo",
    lat: -16.0058567,
    lng: -41.2793731,
    icon: "users",
    eixo: "Juventude",
    titulo: "Retenção de jovens no Vale do Jequitinhonha",
    texto: "É comum jovens deixarem a região aos 15–16 anos por falta de oportunidade.",
  },
  {
    slug: "almenara",
    cidade: "Almenara",
    microrregiao: "Almenara",
    subRegiao: "baixo",
    lat: -16.1753775,
    lng: -40.6916675,
    icon: "landmark",
    eixo: "Dinheiro público",
    titulo: "Uso correto de recursos públicos",
    texto: "Fiscalização de emendas parlamentares destinadas à região.",
    dado:
      "Relatos apontam que, historicamente, nenhum deputado destinou parte relevante dos R$ 120 milhões em emendas ao Vale.",
    revisaoJuridicaPendente: true,
    base: true,
  },
];
