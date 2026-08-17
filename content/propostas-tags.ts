import type { PilarIcon } from "@/content/pilares";

export type PropostaTagId = "saude" | "trabalho" | "estradas" | "juventude" | "dinheiro" | "mineracao";

export interface PropostaTagData {
  id: PropostaTagId;
  label: string;
  sublabel: string;
  icon: PilarIcon;
}

// Copy oficial de PROMPT_LINHA_PROPOSTAS_MOTION.md — mesmas 6 pautas de
// content/pilares.ts (mesmos fatos, mesmo dado de apoio), só com rótulo
// curto de tag em vez do título/pauta completos. Ordem = ordem de leitura
// da linha (Saúde primeiro, Mineração por último, antes do nome).
export const PROPOSTA_TAGS: PropostaTagData[] = [
  { id: "saude", label: "Saúde", sublabel: "hospital regional", icon: "hospital" },
  {
    id: "trabalho",
    label: "Trabalho e renda",
    sublabel: "cooperativas, feiras e CEASA",
    icon: "briefcase",
  },
  { id: "estradas", label: "Estradas", sublabel: "BR-367", icon: "route" },
  {
    id: "juventude",
    label: "Juventude",
    sublabel: "futuro sem precisar ir embora",
    icon: "users",
  },
  { id: "dinheiro", label: "Dinheiro público", sublabel: "com destino certo", icon: "landmark" },
  { id: "mineracao", label: "Mineração", sublabel: "com equilíbrio", icon: "mountain" },
];
