"use client";

import { useId, useState } from "react";

type Item = { question: string; answer: string };

/**
 * Smooth accordion: panels open and close by animating grid rows 0fr → 1fr
 * (a height transition that needs no measuring) plus a fade. One panel open
 * at a time; buttons carry aria-expanded / aria-controls.
 */
export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="border-b border-border">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q${i}`;
        const panelId = `${baseId}-a${i}`;
        return (
          <div key={item.question} className="border-t border-border">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-serif text-xl font-medium text-primary transition-colors hover:text-accent sm:text-2xl"
              >
                {item.question}
                {/* Plus that becomes a minus: the vertical bar collapses. */}
                <span aria-hidden className="relative h-4 w-4 shrink-0">
                  <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
                  <span
                    className={`absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-500 ease-out ${
                      isOpen ? "rotate-90 scale-y-0" : ""
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="max-w-xl pb-6 leading-relaxed text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
