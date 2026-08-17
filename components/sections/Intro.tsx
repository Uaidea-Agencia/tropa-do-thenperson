"use client";

import type { ReactNode } from "react";
import { IntroGate } from "@/features/intro/IntroGate";

export function Intro({ children }: Readonly<{ children: ReactNode }>) {
  return <IntroGate>{children}</IntroGate>;
}
