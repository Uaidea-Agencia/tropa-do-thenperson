"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DURATION, EASE_BRAND } from "@/lib/motion";

const NAV_LINKS = [
  { id: "sobre", href: "#sobre", label: "Sobre mim" },
  { id: "propostas", href: "#propostas", label: "Propostas" },
  { id: "quer-saber-mais", href: "#quer-saber-mais", label: "Quer saber mais" },
] as const;

const NAV_IDS = NAV_LINKS.map((link) => link.id);

interface NavItemProps {
  href: string;
  label: string;
  active: boolean;
  reducedMotion: boolean;
  onClick?: () => void;
  className?: string;
}

function NavItem({
  href,
  label,
  active,
  reducedMotion,
  onClick,
  className = "",
}: Readonly<NavItemProps>) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={`relative rounded-xs pb-1 transition-colors duration-150 ease-brand focus-visible:outline-2 focus-visible:outline-focus ${
        active ? "text-accent-light" : "text-text-inverse/75 hover:text-text-inverse"
      } ${className}`}
    >
      {label}
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-pill bg-accent-light"
        style={{ originX: 0 }}
        initial={false}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={
          reducedMotion ? { duration: 0 } : { duration: DURATION.block, ease: EASE_BRAND }
        }
      />
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(NAV_IDS);
  const reducedMotion = usePrefersReducedMotion();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-text-inverse/10 bg-primary-dark">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="#capa"
            className="shrink-0 rounded-xs focus-visible:outline-2 focus-visible:outline-focus"
          >
            <Image
              src="/images/identidade/thenperson-colorido-sem-fundo.png"
              alt={site.candidateName}
              width={800}
              height={272}
              priority
              className="h-12 w-auto nav:h-14"
            />
          </Link>

          <span className="hidden h-6 w-px bg-text-inverse/20 nav:block" aria-hidden="true" />

          <div className="relative hidden h-5 w-13 nav:block">
            <Image
              src="/images/identidade/avante-mono-branco.png"
              alt={`Filiado ao Avante — ${site.partyNumber}`}
              fill
              sizes="52px"
              className="object-contain object-left"
            />
          </div>
        </div>

        <nav className="hidden items-center gap-6 nav:flex" aria-label="Seções do site">
          {NAV_LINKS.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              label={link.label}
              active={activeId === link.id}
              reducedMotion={reducedMotion}
              className="font-body text-body font-medium"
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden xs:block">
            <Button href="#quer-saber-mais" variant="primary" size="sm">
              Quero fazer parte
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="flex h-10 w-10 items-center justify-center rounded-pill text-text-inverse nav:hidden"
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 bottom-0 z-30 flex flex-col justify-center overflow-y-auto bg-primary-dark nav:hidden"
        >
          <Container className="flex flex-col gap-2 py-10">
            {NAV_LINKS.map((link) => (
              <NavItem
                key={link.href}
                href={link.href}
                label={link.label}
                active={activeId === link.id}
                reducedMotion={reducedMotion}
                onClick={closeMenu}
                className="px-2 py-4 font-heading text-h3 font-bold"
              />
            ))}
            <Button
              href="#quer-saber-mais"
              variant="primary"
              className="mt-6 w-full"
              onClick={closeMenu}
            >
              Quero fazer parte
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
