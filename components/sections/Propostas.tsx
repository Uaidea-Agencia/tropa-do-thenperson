import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { PropostasScroll } from "@/components/propostas/PropostasScroll";
import { PropostasWatermark } from "@/features/vale-map/PropostasWatermark";
import { site } from "@/content/site";

export function Propostas() {
  return (
    <section id="propostas" className="relative bg-bg-muted">
      <div className="relative overflow-hidden">
        <PropostasWatermark />

        <Container className="relative z-10 py-24 desktop:py-32">
          <header className="max-w-2xl">
            <p className="font-body text-eyebrow uppercase text-primary">Propostas</p>
            <h2 className="mt-3 font-heading text-h2 font-extrabold text-text">
              Festa não muda a vida de ninguém.
            </h2>
            <p className="mt-4 font-body text-body text-text-muted">
              Seis pautas, construídas de dentro do Vale — do Alto ao Baixo Jequitinhonha, até
              Almenara.
            </p>
            <Badge tone="accent" className="mt-4">
              Nº {site.electoralNumber}
            </Badge>
          </header>
        </Container>
      </div>

      <Container className="relative z-10">
        <PropostasScroll />
      </Container>
    </section>
  );
}
