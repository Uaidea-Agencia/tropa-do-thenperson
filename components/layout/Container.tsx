import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: Readonly<{
  children: ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={`mx-auto w-full max-w-[1240px] px-5 tablet:px-8 desktop:px-[6%] wide:px-[8%] ${className}`}
    >
      {children}
    </div>
  );
}
