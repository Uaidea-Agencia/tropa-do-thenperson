import { Intro } from "@/components/sections/Intro";
import { Header } from "@/components/layout/Header";
import { Capa } from "@/components/sections/Capa";
import { Sobre } from "@/components/sections/Sobre";
import { Propostas } from "@/components/sections/Propostas";
import { QuerSaberMais } from "@/components/sections/QuerSaberMais";
import { Footer } from "@/components/layout/Footer";
import { BackToTopButton } from "@/features/back-to-top/BackToTopButton";

export default function Home() {
  return (
    <Intro>
      <Header />
      <Capa />
      <Sobre />
      <Propostas />
      <QuerSaberMais />
      <Footer />
      <BackToTopButton />
    </Intro>
  );
}
