import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-primary-dark text-text-inverse">
      <Container className="flex flex-col gap-8 py-12 tablet:flex-row tablet:items-center tablet:justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/images/identidade/thenperson-mono-branco.png"
            alt={`${site.candidateName} — logo oficial`}
            width={800}
            height={272}
            className="h-9 w-auto"
          />
          <div>
            <p className="font-heading text-h3 font-bold">{site.candidateName}</p>
            <p className="text-caption text-text-inverse/70">
              {site.role} · {site.state}
            </p>
          </div>
        </div>

        <Link
          href="https://avante70.org.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xs focus-visible:outline-2 focus-visible:outline-focus"
        >
          <span className="text-caption text-text-inverse/60">Filiação</span>
          <div className="relative h-7 w-15">
            <Image
              src="/images/identidade/avante-mono-branco.png"
              alt="Avante — 70 (avante70.org.br)"
              fill
              sizes="60px"
              className="object-contain object-left"
            />
          </div>
        </Link>
      </Container>

      <Container className="flex flex-col gap-1 border-t border-text-inverse/10 py-6">
        <div className="flex flex-col gap-1 tablet:flex-row tablet:items-center tablet:justify-between">
          <p className="text-caption text-text-inverse/50">
            {site.candidateName} — {site.region}, base em {site.base}. Conteúdo de campanha.
          </p>
          <p className="text-caption text-text-inverse/50">
            © {new Date().getFullYear()} {site.candidateName}. Todos os direitos reservados.
          </p>
        </div>
        <p className="text-caption text-text-inverse/40">
          Partido {site.party} — {site.partyNumber} · CNPJ {site.partyCnpj}
        </p>
      </Container>

      <Container className="flex justify-center border-t border-text-inverse/10 py-4">
        <p className="text-caption text-text-inverse/40">
          Site desenvolvido por{" "}
          <Link
            href="https://uaidea-agencia.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xs underline decoration-text-inverse/30 underline-offset-2 hover:text-text-inverse hover:decoration-text-inverse focus-visible:outline-2 focus-visible:outline-focus"
          >
            UAIdea Agência
          </Link>{" "}
          ·{" "}
          <Link
            href="https://www.instagram.com/uaidea.agencia/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xs underline decoration-text-inverse/30 underline-offset-2 hover:text-text-inverse hover:decoration-text-inverse focus-visible:outline-2 focus-visible:outline-focus"
          >
            Instagram
          </Link>
        </p>
      </Container>
    </footer>
  );
}
