import type { Dictionary } from "@/i18n/get-dictionary";

type ContactLabels = Dictionary["contact"];

export type ContactMessage = {
  name: string;
  business: string;
  topic: string;
  message: string;
};

export function buildContactDraft(number: string, details: ContactMessage, labels: ContactLabels) {
  const t = labels.form;
  const topic = Object.prototype.hasOwnProperty.call(t.topics, details.topic)
    ? t.topics[details.topic as keyof typeof t.topics]
    : t.topics.general;
  const business = details.business.trim();
  const text = [
    labels.messageGreeting,
    "",
    `${t.name}: ${details.name.trim()}`,
    ...(business ? [`${t.business}: ${business}`] : []),
    `${t.topic}: ${topic}`,
    "",
    details.message.trim(),
    "",
    labels.messageClosing,
  ].join("\n");

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
