import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { findByCode } from "@/content/products";
import { site } from "@/content/site";

/** One line in the list: a product size (SKU code) and how many. */
export type InquiryItem = { code: string; qty: number };

export type CustomerDetails = {
  name: string;
  phone: string;
  city: string;
  notes: string;
};

type Labels = Dictionary["inquiry"];

/** Resolves list items to display rows, dropping SKUs that no longer exist. */
export function resolveItems(items: InquiryItem[], locale: Locale) {
  return items.flatMap((item) => {
    const found = findByCode(item.code);
    if (!found) return [];
    return [
      {
        code: item.code,
        qty: item.qty,
        slug: found.product.slug,
        name: found.product.name[locale],
        size: found.variant.size,
      },
    ];
  });
}

export function buildWhatsAppMessage(
  items: InquiryItem[],
  details: CustomerDetails,
  locale: Locale,
  t: Labels,
) {
  const rows = resolveItems(items, locale).map(
    (row, i) => `${i + 1}. ${row.name} ${row.size} (${row.code}) × ${row.qty}`,
  );

  const info = [
    `${t.name}: ${details.name}`,
    details.phone && `${t.phone}: ${details.phone}`,
    details.city && `${t.city}: ${details.city}`,
    details.notes && `${t.notes}: ${details.notes}`,
  ].filter(Boolean);

  return [
    t.messageGreeting,
    "",
    ...rows,
    "",
    ...info,
    "",
    t.messageClosing,
  ].join("\n");
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Generates the inquiry as a PDF and triggers a download (client-side only). */
export async function downloadInquiryPdf(
  items: InquiryItem[],
  details: CustomerDetails,
  locale: Locale,
  t: Labels,
) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  const left = 20;
  let y = 24;

  doc.setFont("helvetica", "bold").setFontSize(18);
  doc.text(`${site.name} — ${t.docTitle}`, left, y);
  y += 8;
  doc.setFont("helvetica", "normal").setFontSize(10);
  doc.text(`${t.date}: ${new Date().toLocaleDateString(locale)}`, left, y);
  y += 12;

  doc.setFontSize(11);
  const info: [string, string][] = [
    [t.name, details.name],
    [t.phone, details.phone],
    [t.city, details.city],
  ];
  for (const [label, value] of info) {
    if (!value) continue;
    doc.text(`${label}: ${value}`, left, y);
    y += 6;
  }
  y += 6;

  // Columns: # | product | size | code | qty
  const col = { no: left, name: left + 10, size: 112, code: 140, qty: 180 };
  doc.setFont("helvetica", "bold");
  doc.text("#", col.no, y);
  doc.text(t.product, col.name, y);
  doc.text(t.size, col.size, y);
  doc.text(t.code, col.code, y);
  doc.text(t.qty, col.qty, y);
  doc.line(left, y + 2, 190, y + 2);
  y += 9;
  doc.setFont("helvetica", "normal");

  resolveItems(items, locale).forEach((row, i) => {
    const nameLines: string[] = doc.splitTextToSize(row.name, col.size - col.name - 4);
    if (y + nameLines.length * 5 > 275) {
      doc.addPage();
      y = 24;
    }
    doc.text(String(i + 1), col.no, y);
    doc.text(nameLines, col.name, y);
    doc.text(row.size, col.size, y);
    doc.text(row.code, col.code, y);
    doc.text(String(row.qty), col.qty, y);
    y += Math.max(7, nameLines.length * 5 + 2);
  });

  if (details.notes) {
    y += 6;
    doc.setFont("helvetica", "bold").text(t.notes, left, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.text(doc.splitTextToSize(details.notes, 170), left, y);
  }

  doc.save(`camp-bali-inquiry-${new Date().toISOString().slice(0, 10)}.pdf`);
}
