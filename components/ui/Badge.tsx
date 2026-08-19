import type { ReactNode } from "react";

export type BadgeTone = "accent" | "primary" | "secondary" | "inverse" | "muted" | "glass";

const TONE_CLASSES: Record<BadgeTone, string> = {
  accent: "bg-accent text-text",
  primary: "bg-primary text-text-inverse",
  secondary: "bg-primary text-text-inverse",
  inverse: "border border-text-inverse/40 text-text-inverse",
  muted: "bg-bg-muted text-text-muted border border-border",
  // Translúcido — para conviver dentro de um card que já é de vidro
  // (ver docs/marca.md, Superfícies em vidro), em vez de um preenchimento
  // sólido competindo com o próprio card.
  glass: "border border-primary/25 bg-primary/10 text-primary backdrop-blur-md",
};

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}

export function Badge({ tone = "muted", children, className = "" }: Readonly<BadgeProps>) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1 font-body text-caption font-medium ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
