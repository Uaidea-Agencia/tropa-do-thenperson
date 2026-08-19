// Conteúdo cívico genérico sobre a divisão de competências entre os três
// níveis de governo no Brasil — não é fato biográfico nem proposta de
// campanha, então não depende de docs/referencia.md como fonte. Serve
// para gerir expectativa: o que um Deputado Estadual decide de fato, e o
// que não é da alçada dele (rule: didatismo aqui é autoridade, ver
// PROMPT_CLAUDE_CODE_SITE_V3_INSTITUCIONAL.md, seção 3.6).

export type NivelGoverno = {
  id: string;
  esfera: string;
  titulo: string;
  resumo: string;
  itens: string[];
};

export const niveisGoverno: NivelGoverno[] = [
  {
    id: "estado",
    esfera: "Estado — o que o Deputado Estadual decide",
    titulo: "Assembleia Legislativa de Minas Gerais",
    resumo:
      "É onde ele vai atuar se eleito: aprova o orçamento do estado e fiscaliza para onde vai cada real.",
    itens: [
      "Orçamento do estado e emendas parlamentares estaduais",
      "Hospitais e rede de saúde estadual",
      "Polícia Militar, Polícia Civil e Corpo de Bombeiros",
      "Escolas estaduais e universidades estaduais",
      "Estradas estaduais e tributos como ICMS e IPVA",
      "Fiscalização do Governador e do Executivo estadual",
    ],
  },
  {
    id: "municipio",
    esfera: "Município — o que é da Prefeitura e da Câmara Municipal",
    titulo: "Prefeitura e Câmara de cada cidade do Vale",
    resumo: "Decisões do dia a dia da cidade — fora do alcance direto de um mandato estadual.",
    itens: [
      "Postos de saúde e atenção básica",
      "Creches e ensino fundamental municipal",
      "Transporte público urbano e zoneamento",
      "Coleta de lixo e iluminação pública",
      "IPTU e taxas municipais",
    ],
  },
  {
    id: "uniao",
    esfera: "União — o que é do Congresso Nacional e do Governo Federal",
    titulo: "Congresso Nacional e Governo Federal",
    resumo: "Pauta nacional — um Deputado Estadual pode cobrar e articular, mas não decide sozinho.",
    itens: [
      "Rodovias federais, como a BR-367",
      "Imposto de Renda, INSS e tributos federais",
      "Polícia Federal e Forças Armadas",
      "Relações exteriores e moeda nacional",
    ],
  },
];
