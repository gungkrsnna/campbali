"use client";

import { useId, useState, type FormEvent } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { buildContactDraft } from "@/lib/contact";
import { buttonClass } from "@/components/ui/Button";

const inputClass = "mt-2 min-h-12 w-full min-w-0 rounded-sm border border-border bg-background/70 px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-accent focus-visible:ring-1 focus-visible:ring-accent";

export function ContactForm({
  labels,
  whatsappNumber,
}: {
  labels: Dictionary["contact"];
  whatsappNumber: string | null;
}) {
  const id = useId();
  const t = labels.form;
  const [draftUrl, setDraftUrl] = useState<string | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const business = String(data.get("business") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    for (const [field, value, error] of [["name", name, t.requiredName], ["message", message, t.requiredMessage]]) {
      const input = form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement;
      input.setCustomValidity(value ? "" : error);
      if (!value) {
        input.reportValidity();
        return;
      }
    }

    if (!whatsappNumber) {
      setUnavailable(true);
      return;
    }

    const url = buildContactDraft(whatsappNumber, {
      name, business, message, topic: String(data.get("topic")),
    }, labels);
    setDraftUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="border border-border bg-surface/40 px-5 py-7 sm:p-8 lg:p-10">
      <h2 id={`${id}-title`} className="font-serif text-3xl font-normal leading-tight sm:text-4xl">{t.title}</h2>
      <p className="mt-3 text-sm font-light leading-relaxed text-muted">{t.intro}</p>
      <form
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-handoff`}
        method="post"
        onSubmit={submit}
        onChange={() => { setDraftUrl(null); setUnavailable(false); }}
        className="mt-7 space-y-5 sm:mt-8 sm:space-y-6"
      >
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1 xl:grid-cols-2">
          <label className="block min-w-0 text-sm" htmlFor={`${id}-name`}>
            {t.name} <span aria-hidden className="text-accent">*</span>
            <input id={`${id}-name`} name="name" autoComplete="name" required className={inputClass} onInvalid={(event) => { if (!event.currentTarget.value.trim()) event.currentTarget.setCustomValidity(t.requiredName); }} onInput={(event) => event.currentTarget.setCustomValidity("")} />
          </label>
          <label className="block min-w-0 text-sm" htmlFor={`${id}-business`}>
            {t.business} <span className="text-muted">({t.optional})</span>
            <input id={`${id}-business`} name="business" autoComplete="organization" className={inputClass} />
          </label>
        </div>
        <label className="block text-sm" htmlFor={`${id}-topic`}>
          {t.topic}
          <select id={`${id}-topic`} name="topic" defaultValue="general" className={inputClass}>
            {Object.entries(t.topics).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label className="block text-sm" htmlFor={`${id}-message`}>
          {t.message} <span aria-hidden className="text-accent">*</span>
          <textarea id={`${id}-message`} name="message" required rows={5} placeholder={t.messagePlaceholder} className={`${inputClass} resize-y leading-relaxed`} onInvalid={(event) => { if (!event.currentTarget.value.trim()) event.currentTarget.setCustomValidity(t.requiredMessage); }} onInput={(event) => event.currentTarget.setCustomValidity("")} />
        </label>
        <p className="text-xs text-muted">{t.requiredNote}</p>
        <div>
          <button type="submit" className={`${buttonClass()} w-full px-6 py-3.5`}>{t.submit}<span aria-hidden>↗</span></button>
          <p id={`${id}-handoff`} className="mt-4 text-xs font-light leading-relaxed text-muted">{t.handoffNote}</p>
        </div>
        {unavailable && <p role="alert" className="text-sm leading-relaxed text-accent">{t.unavailable}</p>}
        {draftUrl && (
          <div role="status" className="border-t border-border pt-5 text-sm leading-relaxed">
            <p className="text-muted">{t.draftReady}</p>
            <a href={draftUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-11 items-center gap-2 text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">{t.reopen}<span aria-hidden>↗</span></a>
          </div>
        )}
      </form>
    </div>
  );
}
