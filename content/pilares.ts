export type ValeRegiao = "baixo" | "medio" | "alto";

export type PilarIcon = "hospital" | "briefcase" | "route" | "users" | "landmark" | "mountain";

export type Pilar = {
  id: string;
  regiao: ValeRegiao;
  cidade: string;
  icon: PilarIcon;
  titulo: string;
  pauta: string;
  dado?: string;
  revisaoJuridicaPendente?: boolean;
};

export const pilares: Pilar[] = [
  {
    id: "mineracao",
    regiao: "alto",
    cidade: "Diamantina",
    icon: "mountain",
    titulo: "Mineração",
    pauta:
      "Posição de equilíbrio: não contra a mineração, contra o modelo atual de contrapartidas para a região.",
    revisaoJuridicaPendente: true,
  },
  {
    id: "recursos-publicos",
    regiao: "alto",
    cidade: "Serro",
    icon: "landmark",
    titulo: "Uso correto de recursos públicos",
    pauta: "Fiscalização de emendas parlamentares destinadas à região.",
    dado: "Relatos apontam que, historicamente, nenhum deputado destinou parte relevante dos R$ 120 milhões em emendas ao Vale.",
    revisaoJuridicaPendente: true,
  },
  {
    id: "juventude",
    regiao: "medio",
    cidade: "Itaobim",
    icon: "users",
    titulo: "Juventude",
    pauta: "Retenção de jovens no Vale do Jequitinhonha.",
    dado: "É comum jovens deixarem a região aos 15–16 anos por falta de oportunidade.",
  },
  {
    id: "infraestrutura",
    regiao: "medio",
    cidade: "Araçuaí",
    icon: "route",
    titulo: "Infraestrutura",
    pauta: "BR-367 como aposta de conexão logística para a região.",
    dado: "Apenas 520 km de estrada asfaltada em toda a região. Rodovia federal tem limite de atuação para um deputado estadual — a pauta é levar a demanda adiante.",
  },
  {
    id: "trabalho",
    regiao: "baixo",
    cidade: "Santo Antônio do Jacinto",
    icon: "briefcase",
    titulo: "Trabalho e economia",
    pauta: "Cooperativas, feiras e CEASA para fortalecer a produção local.",
    dado: "O maior empregador do Vale hoje são as prefeituras — o que cria dependência política em vez de economia própria.",
  },
  {
    id: "saude",
    regiao: "baixo",
    cidade: "Almenara",
    icon: "hospital",
    titulo: "Saúde",
    pauta: "Hospital regional para o Vale do Jequitinhonha.",
    dado: "Saúde foi a pauta mais citada numa enquete no Instagram do próprio candidato — hoje, é comum precisar viajar até 700 km para uma consulta.",
  },
];
