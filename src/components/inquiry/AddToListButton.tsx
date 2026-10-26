"use client";

import { useState } from "react";
import type { Variant } from "@/content/products";
import { inquiry, useInquiryList } from "@/lib/inquiry-store";
import { buttonClass } from "@/components/ui/Button";

type Labels = { addToList: string; inList: string; size: string };

/**
 * Adds a product size to the inquiry list. Products with several sizes get a
 * row of size chips first; single-size products just show the action.
 */
export function AddToListButton({
  variants,
  labels,
  variant = "button",
  tone = "light",
}: {
  variants: Variant[];
  labels: Labels;
  /** "button": filled pill. "text": quiet underlined text (cards, lists). */
  variant?: "button" | "text";
  /** "dark" for the text variant on the green brand background. */
  tone?: "light" | "dark";
}) {
  const [code, setCode] = useState(variants[0].code);
  const item = useInquiryList().find((i) => i.code === code);
  const label = item ? `${labels.inList} (${item.qty})` : labels.addToList;

  const action =
    variant === "text" ? (
      <button
        type="button"
        onClick={() => inquiry.add(code)}
        className={`group inline-flex min-h-11 items-center gap-2 text-left text-sm font-medium transition-colors ${
          tone === "dark"
            ? item
              ? "text-primary-foreground/60"
              : "text-primary-foreground"
            : item
              ? "text-accent"
              : "text-primary"
        }`}
      >
        <span aria-hidden className="transition-transform group-hover:rotate-90">
          {item ? "✓" : "+"}
        </span>
        <span className="border-b border-current/30 pb-0.5 transition-colors group-hover:border-current">
          {label}
        </span>
      </button>
    ) : (
      <button
        type="button"
        onClick={() => inquiry.add(code)}
        className={`${buttonClass(item ? "outline" : "primary")} px-7 py-3`}
      >
        {item ? `✓ ${label}` : `+ ${label}`}
      </button>
    );

  if (variants.length === 1) return action;

  return (
    <div className="space-y-6">
      <div role="group" aria-label={labels.size}>
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.25em] text-muted">
          {labels.size}
        </p>
        <div className="flex flex-wrap gap-2">
          {variants.map((v) => (
            <button
              key={v.code}
              type="button"
              aria-pressed={v.code === code}
              onClick={() => setCode(v.code)}
              className={`min-h-11 min-w-16 rounded-full border px-4 py-2 text-sm transition-colors ${
                v.code === code
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground/80 hover:border-primary hover:text-primary"
              }`}
            >
              {v.size}
            </button>
          ))}
        </div>
      </div>
      {action}
    </div>
  );
}
