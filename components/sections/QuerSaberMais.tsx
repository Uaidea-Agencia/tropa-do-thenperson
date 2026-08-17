import { MessageCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { ctaLinks } from "@/content/cta-links";
import { site } from "@/content/site";

export function QuerSaberMais() {
  return (
    <section id="quer-saber-mais" className="bg-bg-dark-alt py-24">
      <Container className="flex flex-col items-center text-center">
        <p className="font-body text-eyebrow uppercase text-accent">Quer saber mais?</p>
        <h2 className="mt-3 max-w-xl font-heading text-h2 font-extrabold text-text-inverse">
          Entra no grupo — vai que você gosta das minhas ideias.
        </h2>
        <p className="mt-4 max-w-md font-body text-body text-text-inverse/70">
          Os canais oficiais de mobilização da campanha de {site.candidateName} são estes dois.
        </p>

        <div className="mt-10 flex flex-col gap-4 tablet:flex-row">
          {ctaLinks.whatsapp.href ? (
            <MagneticButton
              href={ctaLinks.whatsapp.href}
              icon={<MessageCircle size={18} aria-hidden="true" />}
            >
              {ctaLinks.whatsapp.label}
            </MagneticButton>
          ) : (
            <CtaButton
              link={ctaLinks.whatsapp}
              icon={<MessageCircle size={18} aria-hidden="true" />}
              variant="primary"
            />
          )}
          <CtaButton
            link={ctaLinks.instagram}
            icon={<InstagramIcon size={18} />}
            variant="outline-inverse"
          />
        </div>
      </Container>
    </section>
  );
}
