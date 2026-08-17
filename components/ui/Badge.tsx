import type { ReactNode } from "react";

export type BadgeTone = "accent" | "primary" | "secondary" | "inverse" | "muted";

const TONE_CLASSES: Record<BadgeTone, string> = {
  accent: "bg-accent text-text",
  primary: "bg-primary text-text-on-primary",
  secondary: "bg-secondary text-text-inverse",
  inverse: "border border-text-inverse/40 text-text-inverse",
  muted: "bg-bg-muted text-text-muted border border-border",
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
