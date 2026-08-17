"use client";

import type { ReactNode } from "react";
import { Clock } from "lucide-react";
import Link from "next/link";
import type { CtaLink } from "@/content/cta-links";
import {
  BUTTON_BASE_CLASSES,
  BUTTON_SIZE_CLASSES,
  BUTTON_VARIANT_CLASSES,
  type ButtonVariant,
} from "./Button";

const PENDING_CLASSES =
  "border-2 border-dashed border-text-inverse/40 text-text-inverse/70 cursor-not-allowed hover:bg-transparent";

interface CtaButtonProps {
  link: CtaLink;
  icon: ReactNode;
  variant?: ButtonVariant;
}

export function CtaButton({ link, icon, variant = "primary" }: Readonly<CtaButtonProps>) {
  if (!link.href) {
    return (
      <button
        type="button"
        aria-disabled="true"
        onClick={(event) => event.preventDefault()}
        className={`${BUTTON_BASE_CLASSES} ${BUTTON_SIZE_CLASSES.md} ${PENDING_CLASSES}`}
      >
        {icon}
        {link.label}
        <span className="inline-flex items-center gap-1 text-caption normal-case tracking-normal opacity-80">
          <Clock size={14} aria-hidden="true" />
          em breve
        </span>
      </button>
    );
  }

  return (
    <Link
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${BUTTON_BASE_CLASSES} ${BUTTON_SIZE_CLASSES.md} ${BUTTON_VARIANT_CLASSES[variant]}`}
    >
      {icon}
      {link.label}
    </Link>
  );
}
