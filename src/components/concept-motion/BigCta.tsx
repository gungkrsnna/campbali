import Link from "next/link";
import { Magnetic } from "./Magnetic";

// Concept D closer: an oversized statement and a big magnetic circle that
// opens WhatsApp. Flows into the footer.
export function BigCta({
  label,
  title,
  text,
  whatsapp,
  contact,
  circleLabel,
}: {
  label: string;
  title: string;
  text: string;
  whatsapp: { href: string };
  contact: { href: string; label: string };
  circleLabel: string;
}) {
  return (
    <section className="border-t border-border px-5 py-28 sm:px-10 sm:py-40">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent">{label}</p>
      <div className="mt-8 grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h2 className="font-serif text-[2.4rem] font-bold uppercase leading-[0.95] sm:text-7xl lg:text-8xl">{title}</h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">{text}</p>
          <Link href={contact.href} className="mt-8 inline-block border-b border-foreground/40 pb-1 text-sm font-semibold uppercase tracking-widest">
            {contact.label} →
          </Link>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end">
          <Magnetic strength={0.45}>
            <a
              href={whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-44 w-44 place-items-center rounded-full bg-accent p-6 text-center font-serif text-lg font-bold uppercase leading-tight text-primary-foreground transition-transform duration-500 hover:scale-105 sm:h-56 sm:w-56 sm:text-xl"
            >
              {circleLabel}
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
