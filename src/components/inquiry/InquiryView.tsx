"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { inquiry, useInquiryList } from "@/lib/inquiry-store";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  downloadInquiryPdf,
  resolveItems,
  type CustomerDetails,
} from "@/lib/inquiry";
import { localePath } from "@/lib/paths";
import { buttonClass } from "@/components/ui/Button";

const inputClass =
  "min-h-11 min-w-0 rounded-lg border border-border bg-surface px-3 py-2 text-base outline-none focus:border-primary";

export function InquiryView({
  locale,
  t,
  browseHref,
}: {
  locale: Locale;
  t: Dictionary["inquiry"];
  browseHref: string;
}) {
  const items = useInquiryList();
  const rows = resolveItems(items, locale);
  const [details, setDetails] = useState<CustomerDetails>({
    name: "",
    phone: "",
    city: "",
    notes: "",
  });
  const [error, setError] = useState(false);

  const update =
    (field: keyof CustomerDetails) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setDetails((d) => ({ ...d, [field]: e.target.value }));

  const validate = () => {
    const ok = details.name.trim() !== "";
    setError(!ok);
    return ok;
  };

  const sendWhatsApp = () => {
    if (!validate()) return;
    const message = buildWhatsAppMessage(items, details, locale, t);
    window.open(buildWhatsAppUrl(message), "_blank", "noopener");
  };

  const downloadPdf = () => {
    if (!validate()) return;
    downloadInquiryPdf(items, details, locale, t);
  };

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-6 text-center sm:p-10">
        <p className="text-muted">{t.empty}</p>
        <Link href={browseHref} className={`${buttonClass()} mt-6`}>
          {t.browse}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_24rem]">
      <section className="min-w-0">
        <ul className="divide-y divide-border rounded-2xl border border-border bg-surface">
          {rows.map((row) => (
            <li key={row.code} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 p-4 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
              <Link
                href={localePath(locale, `/products/${row.slug}`)}
                className="col-span-2 min-w-0 py-1 font-medium hover:text-primary sm:col-span-1"
              >
                <span className="block">{row.name}</span>
                <span className="mt-1 block text-sm font-normal text-muted">{row.size}</span>
              </Link>
              <label className="inline-flex min-h-11 items-center gap-2 justify-self-start text-sm text-muted">
                {t.qty}
                <input
                  type="number"
                  min={1}
                  aria-label={`${t.qty}: ${row.name} (${row.size})`}
                  value={row.qty}
                  onChange={(e) => inquiry.setQty(row.code, Number(e.target.value))}
                  className={`${inputClass} w-20`}
                />
              </label>
              <button
                type="button"
                onClick={() => inquiry.remove(row.code)}
                aria-label={`${t.remove} ${row.name} (${row.size})`}
                className="inline-flex min-h-11 items-center justify-center justify-self-end whitespace-nowrap px-3 py-2 text-sm text-accent hover:underline"
              >
                {t.remove}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => inquiry.clear()}
          className="mt-3 inline-flex min-h-11 items-center py-2 text-sm text-muted hover:text-accent"
        >
          {t.clear}
        </button>
      </section>

      <section className="h-fit min-w-0 rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <h2 className="font-serif text-2xl font-semibold text-primary">
          {t.detailsTitle}
        </h2>
        <div className="mt-4 space-y-4">
          <Field label={`${t.name} *`}>
            <input className={`${inputClass} w-full`} value={details.name} onChange={update("name")} autoComplete="name" />
          </Field>
          <Field label={t.phone}>
            <input className={`${inputClass} w-full`} value={details.phone} onChange={update("phone")} type="tel" autoComplete="tel" />
          </Field>
          <Field label={t.city}>
            <input className={`${inputClass} w-full`} value={details.city} onChange={update("city")} autoComplete="address-level2" />
          </Field>
          <Field label={t.notes}>
            <textarea
              className={`${inputClass} w-full resize-y`}
              rows={3}
              value={details.notes}
              onChange={update("notes")}
              placeholder={t.notesPlaceholder}
            />
          </Field>
          {error && <p className="text-sm text-accent">{t.required}</p>}
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <button type="button" onClick={sendWhatsApp} className={buttonClass()}>
            {t.sendWhatsApp}
          </button>
          <button type="button" onClick={downloadPdf} className={buttonClass("outline")}>
            {t.downloadPdf}
          </button>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1 text-sm">
      <span className="text-muted">{label}</span>
      {children}
    </label>
  );
}
