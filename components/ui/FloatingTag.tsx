import type { ReactNode } from "react";

interface FloatingTagProps {
  children: ReactNode;
  className?: string;
}

export function FloatingTag({ children, className = "" }: Readonly<FloatingTagProps>) {
  return (
    <div
      className={`rounded-card bg-primary-dark/85 px-5 py-4 backdrop-blur-sm tablet:px-8 tablet:py-5 ${className}`}
    >
      {children}
    </div>
  );
}
