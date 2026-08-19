"use client";

import { useId, useState } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";
import type { NivelGoverno } from "@/content/deputado-estadual";

interface AccordionItemProps {
  data: NivelGoverno;
  icon: LucideIcon;
  open: boolean;
  onToggle: () => void;
}

function AccordionItem({ data, icon: Icon, open, onToggle }: Readonly<AccordionItemProps>) {
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="rounded-card border border-border bg-bg">
      <h3 className="contents">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center gap-4 rounded-card px-5 py-5 text-left outline-none focus-visible:outline-2 focus-visible:outline-focus tablet:px-6"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-primary text-text-inverse">
            <Icon size={22} aria-hidden="true" />
          </span>
          <span className="flex-1">
            <span className="block font-body text-eyebrow uppercase text-marker-dark">
              {data.esfera}
            </span>
            <span className="mt-1 block font-heading text-h3 font-bold text-text">
              {data.titulo}
            </span>
          </span>
          <ChevronDown
            size={20}
            aria-hidden="true"
            className={`shrink-0 text-text-muted transition-transform duration-300 ease-brand ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </h3>

      {/* grid-rows 0fr→1fr is what makes this collapse/expand smoothly
          without measuring pixel heights in JS — and it rides the global
          prefers-reduced-motion rule in globals.css for free, since it's
          a plain CSS transition, not a Framer Motion animation. */}
      <div
        id={panelId}
        aria-hidden={!open}
        className="grid transition-[grid-template-rows] duration-300 ease-brand"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 tablet:px-6 desktop:pl-21">
            <p className="font-body text-body text-text-muted">{data.resumo}</p>
            <ul className="mt-3 grid gap-2 tablet:grid-cols-2">
              {data.itens.map((item) => (
                <li key={item} className="flex items-start gap-2 font-body text-body text-text">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-pill bg-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: NivelGoverno[];
  icons: Record<string, LucideIcon>;
}

export function Accordion({ items, icons }: Readonly<AccordionProps>) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          data={item}
          icon={icons[item.id]}
          open={openId === item.id}
          onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
        />
      ))}
    </div>
  );
}
