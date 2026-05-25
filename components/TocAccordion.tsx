"use client";

import { useState } from "react";
import { ChevronDown, Calendar, Users, CreditCard, BookOpen, Layers } from "lucide-react";

const iconMap = {
  Calendar,
  Users,
  CreditCard,
  BookOpen,
  Layers,
} as const;

export type TocIconName = keyof typeof iconMap;

export interface TocItem {
  id: string;
  label: string;
  icon: TocIconName;
}

export default function TocAccordion({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="lg:hidden mb-8">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 rounded-xl bg-[#232830] border border-white/12 text-sm font-semibold text-white"
      >
        <span>På den här sidan</span>
        <ChevronDown
          className={`h-4 w-4 text-[#9ca3af] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`mt-1 grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="rounded-xl bg-[#232830] border border-white/12">
            {items.map(({ id, label, icon }) => {
              const Icon = iconMap[icon];
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-5 py-3.5 text-sm text-[#c4cad4] hover:text-[#F3811F] hover:bg-white/5 transition-colors border-b border-white/8 last:border-0"
                >
                  <Icon className="h-4 w-4 text-[#F3811F]/60 shrink-0" />
                  {label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
