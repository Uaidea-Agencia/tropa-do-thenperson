"use client";

import { Building2, Flag, Landmark, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Accordion } from "@/components/ui/Accordion";
import { niveisGoverno } from "@/content/deputado-estadual";

const NIVEL_ICONS: Record<string, LucideIcon> = {
  estado: Landmark,
  municipio: Building2,
  uniao: Flag,
};

export function DeputadoEstadual() {
  return (
    <section id="o-que-faz" className="bg-bg py-24 desktop:py-32">
      <Container>
        <header className="max-w-2xl">
          <p className="font-body text-eyebrow uppercase text-marker-dark">Antes de prometer</p>
          <h2 className="mt-3 font-heading text-h2 font-extrabold text-text">
            O que um Deputado Estadual decide de verdade
          </h2>
          <p className="mt-4 max-w-prose font-body text-body text-text-muted">
            Saúde, educação e segurança passam por três esferas diferentes de governo. Antes de
            cobrar um mandato, vale entender qual pedaço é dele.
          </p>
        </header>

        <div className="mt-10 desktop:mt-12">
          <Accordion items={niveisGoverno} icons={NIVEL_ICONS} />
        </div>
      </Container>
    </section>
  );
}
