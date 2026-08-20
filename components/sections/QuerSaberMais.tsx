"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PeekingEye } from "@/components/ui/PeekingEye";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { ctaLinks } from "@/content/cta-links";
import { site } from "@/content/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DURATION, EASE_BRAND } from "@/lib/motion";

export function QuerSaberMais() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="quer-saber-mais" className="bg-primary py-24">
      <Container className="flex justify-center">
        <motion.div
          className="flex max-w-2xl flex-col items-center rounded-card border border-text-inverse/15 bg-text-inverse/10 px-6 py-12 text-center backdrop-blur-lg tablet:px-14"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          transition={{ duration: reducedMotion ? 0 : DURATION.block, ease: EASE_BRAND }}
        >
          <p className="font-body text-eyebrow uppercase text-accent-light">Quer saber mais?</p>
          <h2 className="mt-3 max-w-xl font-heading text-h2 font-extrabold text-text-inverse">
            Entra no grupo — vai que você gosta das minhas ideias.
          </h2>
          <p className="mt-4 max-w-md font-body text-body text-text-inverse/70">
            Os canais oficiais de mobilização da campanha de {site.candidateName} são estes dois.
          </p>

          <div className="mt-10 flex flex-col gap-4 tablet:flex-row">
            {ctaLinks.whatsapp.href ? (
              <MagneticButton href={ctaLinks.whatsapp.href} icon={<WhatsAppIcon size={18} />}>
                {ctaLinks.whatsapp.label}
                <PeekingEye />
                <PeekingEye />
              </MagneticButton>
            ) : (
              <CtaButton link={ctaLinks.whatsapp} icon={<WhatsAppIcon size={18} />} variant="primary" />
            )}
            <CtaButton
              link={ctaLinks.instagram}
              icon={<InstagramIcon size={18} />}
              variant="outline-inverse"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
