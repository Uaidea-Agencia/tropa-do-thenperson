import { Intro } from "@/components/sections/Intro";
import { Header } from "@/components/layout/Header";
import { Capa } from "@/components/sections/Capa";
import { Sobre } from "@/components/sections/Sobre";
import { Propostas } from "@/components/sections/Propostas";
import { DeputadoEstadual } from "@/components/sections/DeputadoEstadual";
import { QuerSaberMais } from "@/components/sections/QuerSaberMais";
import { Footer } from "@/components/layout/Footer";
import { BackToTopButton } from "@/features/back-to-top/BackToTopButton";
import { WhatsAppFloatButton } from "@/features/back-to-top/WhatsAppFloatButton";
import { ExitIntentWhatsApp } from "@/features/exit-intent/ExitIntentWhatsApp";

export default function Home() {
  return (
    <Intro>
      <Header />
      <Capa />
      <Sobre />
      <Propostas />
      <DeputadoEstadual />
      <QuerSaberMais />
      <Footer />
      <BackToTopButton />
      <WhatsAppFloatButton />
      <ExitIntentWhatsApp />
    </Intro>
  );
}
