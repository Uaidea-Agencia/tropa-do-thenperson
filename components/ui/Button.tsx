import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { scrollToHash } from "@/lib/scroll-to-hash";

export type ButtonVariant = "primary" | "secondary" | "outline-inverse";
export type ButtonSize = "md" | "sm";

export const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-cta text-text-on-accent hover:bg-cta-hover",
  secondary: "bg-primary text-text-inverse hover:bg-primary-dark",
  "outline-inverse":
    "border-2 border-text-inverse/50 text-text-inverse hover:bg-text-inverse hover:text-text",
};

export const BUTTON_SIZE_CLASSES: Record<ButtonSize, string> = {
  md: "px-6 py-3.5",
  sm: "px-4 py-2",
};

export const BUTTON_BASE_CLASSES =
  "font-body text-button uppercase inline-flex items-center justify-center gap-2 rounded-pill transition-colors duration-150 ease-brand";

interface ButtonProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "children" | "href"
> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Button({
  href,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  children,
  onClick,
  ...linkProps
}: Readonly<ButtonProps>) {
  const isExternal = /^https?:\/\//.test(href);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    // Garante que o CTA sempre role, mesmo clicando de novo na mesma
    // âncora — ver lib/scroll-to-hash.ts.
    if (scrollToHash(href)) event.preventDefault();
    onClick?.(event);
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${BUTTON_BASE_CLASSES} ${BUTTON_VARIANT_CLASSES[variant]} ${BUTTON_SIZE_CLASSES[size]} ${className}`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...linkProps}
    >
      {children}
      {icon}
    </Link>
  );
}
