import Link from "next/link";

type Pillar = { title: string; text: string };

// Concept D values: big rows; on hover a terracotta fill sweeps up from the
// bottom of the row and the text inverts (pure CSS).
export function ValueRows({
  eyebrow,
  mission,
  pillars,
  link,
}: {
  eyebrow: string;
  mission: string;
  pillars: Pillar[];
  link: { href: string; label: string };
}) {
  return (
    <section className="py-28 sm:py-40">
      <div className="px-5 sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-accent">{eyebrow}</p>
        <p className="mt-8 max-w-4xl font-serif text-3xl font-semibold leading-[1.15] sm:text-5xl">{mission}</p>
      </div>

      <ul className="mt-16 border-t border-border">
        {pillars.map((p, i) => (
          <li key={p.title} className="group relative overflow-hidden border-b border-border">
            <span
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:scale-y-100"
            />
            <div className="relative grid gap-4 px-5 py-10 transition-colors duration-500 group-hover:text-primary-foreground sm:px-10 md:grid-cols-12 md:items-center md:py-14">
              <span className="font-serif text-sm font-bold text-accent transition-colors duration-500 group-hover:text-primary-foreground md:col-span-1">
                0{i + 1}
              </span>
              <h3 className="font-serif text-4xl font-bold uppercase leading-none sm:text-6xl md:col-span-6">{p.title}</h3>
              <p className="max-w-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-primary-foreground/80 md:col-span-5">
                {p.text}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="px-5 pt-12 sm:px-10">
        <Link href={link.href} className="inline-block border-b border-accent pb-1 text-sm font-semibold uppercase tracking-widest text-accent">
          {link.label} →
        </Link>
      </div>
    </section>
  );
}
