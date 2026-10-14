import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site } from "@/content/site";
import { buildWhatsAppMessage } from "./inquiry";

/**
 * The "How to Order" chat preview: a sample list run through the real
 * message builder, so the preview always matches what the WhatsApp button
 * actually sends.
 */
export function orderPreview(dict: Dictionary, locale: Locale) {
  return {
    label: dict.home.orderPreviewLabel,
    brand: site.name,
    message: buildWhatsAppMessage(
      [
        { code: "VCOM", qty: 2 },
        { code: "VSO", qty: 1 },
      ],
      { name: dict.home.orderSampleName, phone: "", city: dict.home.orderSampleCity, notes: "" },
      locale,
      dict.inquiry,
    ),
    reply: dict.home.orderReply,
  };
}
