import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "secondary" | "outline-inverse";
export type ButtonSize = "md" | "sm";

export const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-cta text-text-on-primary hover:bg-cta-hover",
  secondary: "bg-secondary text-text-inverse hover:bg-secondary-dark",
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
  ...linkProps
}: Readonly<ButtonProps>) {
  const isExternal = /^https?:\/\//.test(href);
  return (
    <Link
      href={href}
      className={`${BUTTON_BASE_CLASSES} ${BUTTON_VARIANT_CLASSES[variant]} ${BUTTON_SIZE_CLASSES[size]} ${className}`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...linkProps}
    >
      {children}
      {icon}
    </Link>
  );
}
