import type { ReactElement } from "react";
import { Container } from "@/components/layout/Container";
import { MilestoneRow } from "@/features/scroll-reveal/MilestoneRow";
import { milestones } from "@/content/milestones";

export function Sobre() {
  const rows: ReactElement[] = [];
  let photoCount = 0;
  for (const milestone of milestones) {
    rows.push(
      <MilestoneRow key={milestone.id} milestone={milestone} photoIndexOffset={photoCount} />,
    );
    photoCount += milestone.photos.length;
  }

  return (
    <section id="sobre" className="bg-bg py-20 desktop:py-28">
      <Container>
        <header className="max-w-2xl">
          <p className="font-body text-eyebrow uppercase text-accent-dark">Trajetória</p>
          <h2 className="mt-3 font-heading text-h2 font-extrabold text-text">
            Chega de nos chamarem de vale da miséria.
          </h2>
          <p className="mt-4 font-body text-body text-text-muted">
            Aqui tem gente trabalhando todo dia — e merece ser ouvida.
          </p>
        </header>

        <div className="mt-12 desktop:mt-16">{rows}</div>
      </Container>
    </section>
  );
}
