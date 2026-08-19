import { Container } from "@/components/layout/Container";
import { TrajetoriaTimeline } from "@/features/scroll-reveal/TrajetoriaTimeline";
import { milestones } from "@/content/milestones";

export function Sobre() {
  return (
    <section id="sobre" className="bg-bg py-24 desktop:py-32">
      <Container>
        <header className="max-w-2xl">
          <p className="font-body text-eyebrow uppercase text-marker-dark">Trajetória</p>
          <h2 className="mt-3 font-heading text-h2 font-extrabold text-text">
            Chega de nos chamarem de vale da miséria.
          </h2>
          <p className="mt-4 font-body text-body text-text-muted">
            Aqui tem gente trabalhando todo dia — e merece ser ouvida.
          </p>
        </header>

        <div className="mt-12 desktop:mt-16">
          <TrajetoriaTimeline milestones={milestones} />
        </div>
      </Container>
    </section>
  );
}
